import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Line} from '../line';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  selectedLine: Line;

  @Input() lines: Line[];

  @Output() lineDataRequest: EventEmitter<Line> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(event) {
    event.preventDefault();
    this.lineDataRequest.emit(this.selectedLine); // Send selected line through event.
    // TODO trigger event so that parent component gets line bla.
  }

  myValueFormatter(data: any): string {
    return `${data.line} - ${data.destination}`;
  }

}
