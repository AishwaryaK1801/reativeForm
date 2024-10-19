import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordShowHidePipe } from './shared/pipes/password-show-hide.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PasswordShowHidePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
