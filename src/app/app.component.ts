import { Component } from "@angular/core";
import { DataService } from "./Services/data.service";
import { HttpClient } from "@angular/common/http";
import { publish } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "kannan";
  age = 26;
  _myData = null;
  _data = null;

  // _asyncdata = this.http.get(
  //   "http://localhost/VS1MiddleWare/authandaccesscontrol/screensaccess?userId=356"
  // );

  constructor(private dataService: DataService, public http: HttpClient) {
    this._myData = this.dataService
      .getPRItemList()
      .subscribe(x => (this._myData = x));
  }

  ngOnInit() {
    this.dataService
      .getPRItemList()
      .toPromise()
      .then(x => (this._data = x));
  }

  increaseCount() {
    this.dataService.count++;
  }
}
