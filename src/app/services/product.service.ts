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
    fetch(this.url).then(res => res.json())
    .then(console.log);

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


// update(id: number, product: Product): Observable<Product> {
//   return this.httpClient.put<Product>(`${this.url}/${id}`, product);
// }

update(id: number, product: Product) {
  this.products[id] = product;
  return this.httpClient
    .patch<Product>('https://dummyjson.com/products/' + (id+1), product)
    .pipe(
      map((response: Product) => {
        fetch('https://dummyjson.com/products/' + (id + 1), {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: response.title,
            price: response.price,
            description: response.description
            
          }),
        })
          .then((res) => res.json())
          .then(console.log);
      })
    );
}




delete(id: number) {
  console.log("deleted");
  const deleteUrl = 'https://dummyjson.com/products/' + id;
  const del = this.products.indexOf(this.products[id - 1]) ;
  this.products.splice(del, 1);

  return this.httpClient.delete(deleteUrl).subscribe(() => {
    fetch(deleteUrl, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(console.log);
  });
}

 
}
