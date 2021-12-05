import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: number;
  productFormGroup?: FormGroup;
  submitted: boolean=false;

  constructor(private productsService: ProductsService,
              private activateRout: ActivatedRoute,
              private fb: FormBuilder) {
    this.productId= activateRout.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productsService.getProductById(this.productId)
      .subscribe(product=>{
          this.productFormGroup = this.fb.group({
            id:[product.id,Validators.required],
            name:[product.name,Validators.required],
            price:[product.price,Validators.required],
            quantity:[product.quantity,Validators.required],
            selected:[product.selected,Validators.required],
            available:[product.available,Validators.required]
          })
      });
  }

  OnUpdateProduct() {
    this.productsService.UpdateProduct(this.productFormGroup?.value)
      .subscribe( data=>{
          alert("Success Product Updated !");
      });
  }

  //convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl; }
  {
    // @ts-ignore
    return this.productFormGroup.controls;
  }


}
