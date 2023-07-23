import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {



  product: Product = { id: 0, title: '', price: 0, description: '', images: '' };
  inputValue: string ='';

  constructor(private route: ActivatedRoute,
    private productService: ProductService){

  }

  ngOnInit() {
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

  onUpdateProduct(){
    console.log(this.inputValue);
    alert("Changes saved")
  }
  onDeleteProduct(){
    alert("Product deleted!")
  }
  
  
}
