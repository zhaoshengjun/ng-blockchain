import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CryptoService } from "./services/crypto.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyMaterialModule } from './modules/my-material/my-material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MyMaterialModule],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
