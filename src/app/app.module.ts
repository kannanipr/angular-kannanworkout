import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { DataService } from "./Services/data.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, FontAwesomeModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule {}
