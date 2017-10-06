import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  selectedLine: string;

  availableLines: string[] = ['174 - AVIACIÓN', '300 - INSTRUCCIONES'];

  constructor() { }

  ngOnInit() {
  }

}
