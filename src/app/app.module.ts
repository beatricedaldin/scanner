import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SafePipe } from './safe.pipe';
import { FormsModule } from '@angular/forms';
import { NgxBarcodeScannerModule } from '@eisberg-labs/ngx-barcode-scanner';


@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxBarcodeScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
