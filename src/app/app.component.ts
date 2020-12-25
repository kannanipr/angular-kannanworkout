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
  _data = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getPRItemList()
      .subscribe(x => (this._myData = x));

    this.dataService
      .getPRItemList()
      .toPromise()
      .then(x => (this._data = x));
  }

  increaseCount() {
    this.dataService.count++;
  }
}
