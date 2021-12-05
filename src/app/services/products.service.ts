import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({providedIn: "root"})
export class ProductsService{

  constructor(private http:HttpClient) {
  }
  //############################################ Les Services  ############################################
    //Connection avec le Back End
  //set "http://localhost:3000" on host declaration in environment.ts
  getAllProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products");
  }

  getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?selected=true");
  }

  getAvailableProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?available=true");
  }

  SearchProductsByKeyword(key: string):Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?name_like="+key);
  }

  select(product:Product):Observable<Product>{
    let host=environment.host;
    //is pro selected or Unselected
    product.selected=!product.selected;
    return this.http.put<Product>(host+"/products/"+product.id,product);
  }

  deleteProduct(product:Product):Observable<void> {
    let host = environment.host;
    return this.http.delete<void>(host + "/products/" + product.id);
  }

  save(product:Product):Observable<Product>{
    let host=environment.host;
    return this.http.post<Product>(host+"/products",product);
  }

  getProductById(id: number):Observable<Product>{
    let host=environment.host;
    return this.http.get<Product>(host+"/products/"+id);
  }

  UpdateProduct(product: Product):Observable<Product>{
    let host=environment.host;
    return this.http.put<Product>(host+"/products/"+product.id, product);
  }

}
