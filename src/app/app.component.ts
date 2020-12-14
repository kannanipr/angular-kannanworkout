import { Component } from "@angular/core";
import { DataService } from "./Services/data.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "kannan";
  age = 26;
  _myData = null;

  constructor(
    private dataService: DataService,
    private httpclient: HttpClient
  ) {
    this.httpclient
      .get(
        "http://localhost/VS1MiddleWare/authandaccesscontrol/screensaccess?userId=356"
      )
      .subscribe(x => (this._myData = x));
  }

  increaseCount() {
    this.dataService.count++;
  }
}
