import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  NgModule,
  APP_INITIALIZER,
  ErrorHandler,
  Injector,
  ModuleWithProviders
} from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FacebookModule } from "ngx-facebook";

//component
import { NotificationComponent } from "./component/notifications/notifications.component";

import { PageNotFoundComponent } from "./component/page-not-found/page-not-found.component";

import { LoaderComponent } from "./component/loader/loader.component";

//primeng
import { MessageService } from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { BlockUIModule } from "primeng/blockui";
import { ToastModule } from "primeng/toast";
import { MultiSelectModule } from "primeng/multiselect";
import { DropdownModule } from "primeng/dropdown";
import { PanelModule } from "primeng/panel";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { RadioButtonModule } from "primeng/radiobutton";
import { ChipsModule } from "primeng/chips";
import { TooltipModule } from "primeng/tooltip";
import { ToolbarModule } from "primeng/toolbar";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TreeTableModule } from "primeng/treetable";
import { ToggleButtonModule } from "primeng/togglebutton";
import { CarouselModule } from "primeng/carousel";
import { SplitButtonModule } from 'primeng/splitbutton';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';




//service
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { GlobalErrorHandler } from "./service/global-error-handler.service";
import { NotificationService } from "./service/notification.service";

import { LoadingInterceptor } from "./service/loading-interceptor.service";
import { LoaderService } from "./service/loader.service";

import { RequestCache } from './service/RequestCache';



import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


//angular
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

//misc
import { AngularSplitModule } from "angular-split";

//ngx
import { NgxSpinnerModule } from "ngx-spinner";
import { LightboxModule } from 'ngx-lightbox';

import { ModHeaderComponent } from "./component/mod-header/mod-header.component";
import { ModFooterComponent } from "./component/mod-footer/mod-footer.component";
import { HomeComponent } from "./component/home/home.component";





//youtube video components
//import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoComponent } from './component/video/video.component';
import { HelpContactComponent } from './component/help-contact/help-contact.component';




import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';


import { ProductsComponent } from './component/products/products.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { OrdersComponent } from './component/orders/orders.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { AddOrderComponent } from './component/add-order/add-order.component';
import { CommonDataService } from "./service/common-data.service";

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    NotificationComponent,
   
    PageNotFoundComponent,
    LoaderComponent,
    
    ModHeaderComponent,
    ModFooterComponent,
    HomeComponent,
    HelpContactComponent, 
      ProductsComponent, 
    AddProductComponent, OrdersComponent, OrderDetailComponent, AddOrderComponent
  ],
  imports: [
    DynamicDialogModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FacebookModule.forRoot(),
    MessagesModule,
    MessageModule,
    HttpClientModule,
    FormsModule,
    BlockUIModule,
    NgxSpinnerModule,
    ToastModule,
    MultiSelectModule,
    // YouTubePlayerModule,
    PanelModule,
    AutoCompleteModule,
    ButtonModule,
    RadioButtonModule,
    ChipsModule,
    LightboxModule,
    TooltipModule,
    ToolbarModule,
    FieldsetModule,
    TableModule,
    TabViewModule,
    TreeTableModule,
    SplitButtonModule,
    DropdownModule,
    ToggleButtonModule,
    InputMaskModule,
    CarouselModule,
    InputTextareaModule,
   
    AngularSplitModule.forRoot()
  ],
  exports: [NotificationComponent,  VideoComponent],
  providers: [
    NotificationService,
    
    ConfirmationService,
    MessageService,
    LoaderService,
    CommonDataService,
    RequestCache,
   
   
    GlobalErrorHandler,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
   
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
