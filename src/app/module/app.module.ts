import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../components/account/login/login.component';
import { RegisterComponent } from '../components/account/register/register.component';
import { AdminComponent } from '../components/admin/admin.component';
import { CardFocusComponent } from '../components/focus/card-focus/card-focus.component';
import { CardSuggestionComponent } from '../components/focus/card-suggestion/card-suggestion.component';
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CardComponent } from '../components/slider/card/card.component';
import { CardsliderComponent } from '../components/slider/cardslider/cardslider.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CardsliderComponent,
    CardComponent,
    CardFocusComponent,
    CardSuggestionComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
