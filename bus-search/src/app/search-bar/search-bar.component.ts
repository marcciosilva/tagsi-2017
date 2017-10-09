import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  selectedLine: number;

  availableLines = [100, 103, 104];

  @Output()
  lineDataRequest: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(event) {
    event.preventDefault();
    this.lineDataRequest.emit(this.selectedLine); // Send selected line through event.
    // TODO trigger event so that parent component gets line bla.
  }

}
