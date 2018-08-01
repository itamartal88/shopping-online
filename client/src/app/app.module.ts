
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MetirialModule } from './services/material/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import 'hammerjs';
//components
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SignUp2Component } from './components/sign-up2/sign-up2.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminComponent } from './components/admin/admin.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PagesComponent } from './components/pages/pages.component';
//services
import { HttpService } from './services/http/http.service';
import { LoginService } from './services/login/login.service';
import { SignUpService } from './services/sign-up/sign-up.service';
import { ProductsService } from './services/products/products.service';
import { CartService } from './services/cart/cart.service';
import { OrderHandlerService } from './services/order/order-handler.service';
import { CategoryHandlerService } from './services/categories/category-handler.service';
import { AdminHandlerService } from './services/admin-handler/admin-handler.service';
import { FavoriteService } from './services/favorite/favorite.service';
//guards
import { LoginGuard } from './guards/login.guard';
import { MyHttpInterceptor } from './services/interceptor/interceptor';
import { ShopPipe } from './pipes/shop.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    SignUpComponent,
    ShoppingComponent,
    CartComponent,
    OrderComponent,
    CategoriesComponent,
    SignUp2Component,
    ProductsComponent,
    AdminComponent,
    DialogComponent,
    NotificationComponent,
    ShopPipe,
    PagesComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MetirialModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'top',
        component: TopBarComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign',
        component: SignUpComponent
      },
      {
        path: 'shop',
        component: ShoppingComponent,
        canActivate:[LoginGuard]
      },
      {
        path: 'order',
        component: OrderComponent,
        canActivate:[LoginGuard]
      }
    ])
  ],
  exports: [],
  providers: [AdminHandlerService,CartService,ProductsService,
    CategoryHandlerService,HttpService,LoginService,SignUpService,LoginGuard,
    OrderHandlerService,FavoriteService,
    { provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
