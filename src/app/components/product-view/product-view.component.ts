import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Product } from 'src/app/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit{

  product: Product = { id: 0, title: '', price: 0, description: '', images: '' };

  constructor(private route: ActivatedRoute,
    private productService: ProductService){

  }

  ngOnInit(): void {
    
    this.product = {
      id: this.route.snapshot.params['id'],
      title: '',
      price: 0,
      description: '',
      images: ''
    }
    const productId = this.route.snapshot.params['id'];

    this.productService.get(parseInt(productId, 10)).subscribe((product) => {
      this.product = product;
    });
  }

  onDeleteProduct(id:number){
    this.productService.delete(id).unsubscribe();
  }
}
