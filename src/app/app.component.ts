import { Component } from "@angular/core";
import { DataService } from "./Services/data.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "kannan";
  age = 26;

  constructor(private dataService: DataService) {}

  increaseCount() {
    this.dataService.count++;
  }
}
