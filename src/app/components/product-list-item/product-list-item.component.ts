import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import { Product } from 'src/app/product.model';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  product: Product = { id: 0, title: '', price: 0, description: '', images: '' };

  constructor(){

  }

  ngOnInit(){
    
  }
}