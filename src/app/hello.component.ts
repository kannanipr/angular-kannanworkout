import { Component, Input } from "@angular/core";
import { DataService } from "./Services/data.service";

@Component({
  selector: "hello",
  template: `
    <h1>{{ name }}!</h1>
    {{ dataService.count }}
  `,
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `
  ],
  providers: [DataService]
})
export class HelloComponent {
  @Input() name: string;
  constructor(private dataService: DataService) {}
}
