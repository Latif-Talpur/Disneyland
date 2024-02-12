import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-div',
  templateUrl: './dynamic-div.component.html',
  styleUrl: './dynamic-div.component.css'
})
export class DynamicDivComponent {
  @Input() isTable: boolean = true;
}
