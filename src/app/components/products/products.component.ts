import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<AppDataState<Product[]>> | null=null;

  readonly DataStateEnum=DataStateEnum;

  constructor(private productService:ProductsService, private router: Router) { }

  ngOnInit(): void {
  }

  OnGetAllProducts() {
    //this.products$=this.productService.getAllProducts();
    this.products$ = this.productService.getAllProducts().pipe(
        map(data=>({dataState: DataStateEnum.LOADED  ,data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }


  OnGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED  ,data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  OnGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED  ,data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productService.SearchProductsByKeyword(dataForm.key).pipe(
      map(data=>({dataState: DataStateEnum.LOADED  ,data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(p: Product) {
    this.productService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDeleteProduct(p: Product) {
    let v =confirm("Etes vous sure ?");
    if(v==true)
      this.productService.deleteProduct(p)
        .subscribe( data => {
          this.OnGetAllProducts();
        })
  }

  OnNewProduct() {
    this.router.navigateByUrl("/addProduct");
  }


  //Edit The Product
  onEditProduct(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
