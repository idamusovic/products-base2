import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Product } from '../product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'https://dummyjson.com/products';
  private products: Product[] = [];

  constructor(private httpClient: HttpClient) { }

  load(): Observable<Product[]> {
    if (this.products.length) {
      return of(this.products);
    }

    return this.httpClient.get(this.url)
      .pipe(map((response: any) => {
        this.products = response.products;
        return this.products;
      }));
  }

  // list() {  
  //   fetch(this.url).then(res => res.json())
  //   .then(console.log);

  //   return this.products;
  // }
  list(): Product[] {
    return this.products;
  }

  // get(id: number){    
  //   fetch(this.url + '/id')
  //   .then(res => res.json())
  //   .then(console.log);
                
  // }
  get(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/${id}`);
  }

//   add(product: any){
//     fetch(this.url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       title: 'BMW Pencil',
//     })
// })
// .then(res => res.json())
// .then(console.log);
//   }

add(product: Product): Observable<Product> {
  return this.httpClient.post<Product>(this.url, product);
}

//   update(id: number, product: any){
//     fetch(this.url + '/1', {
//       method: 'PUT', /* or PATCH */
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//       title: 'iPhone Galaxy +1'
//     })
//   })
//     .then(res => res.json())
//     .then(console.log);
// }

update(id: number, product: Product): Observable<Product> {
  return this.httpClient.put<Product>(`${this.url}/${id}`, product);
}

  // delete(id: number){
  //   fetch(this.url, {
  //     method: 'DELETE',
  //   })
  //   .then(res => res.json())
  //   .then(console.log);
  // }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
