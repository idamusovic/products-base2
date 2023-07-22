import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductAddComponent } from './components/product-add/product-add.component'; 
// import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductViewComponent } from './components/product-view/product-view.component';



const routes: Routes = [

  {
    path: '',
    component: ProductListComponent,
    resolve: {
      routeResolver: ProductResolver
    },
  },
  { 
    path: 'new', component: ProductAddComponent,
    resolve: {
      routeResolver: ProductResolver
    },

  }, 
  { 
    path: ':id', component: ProductViewComponent,
    resolve: {
      routeResolver: ProductResolver
    },
  },
  { 
    path: 'edit/:id', component: ProductEditComponent,
    resolve: {
      routeResolver: ProductResolver
    },
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
