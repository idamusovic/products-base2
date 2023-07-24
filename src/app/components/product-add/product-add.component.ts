import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit{

  index!: number;
  product: Product = { id: 0, title: '', price: 0, description: '', images: '' };
  inputValue: string ='';

  addForm!: FormGroup;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,){
      
      
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

    this.addForm = new FormGroup({
      id: new FormControl(null,Validators.required),
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null)
    });
  }
   

  onAddProduct(){
    this.productService.add(this.addForm.value).subscribe();
    this.addForm.reset();
    this.router.navigate(['../']);
  };

}

