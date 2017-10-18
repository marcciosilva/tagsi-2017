import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Line} from './line';
import {Stop} from './stop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  lines: Array<Line>;
  busStopsForSelectedLine: Array<Stop>;
  baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.lines = new Array<Line>();
    this.busStopsForSelectedLine = new Array<Stop>();
    var self = this;
    // Make the HTTP request:
    this.http.get(this.baseUrl + 'getLines').subscribe(response => {
      // Read the result field from the JSON response.
      (<Array<Line>>response).forEach(function (dataPoint) {
        this.lines.push(dataPoint);
      }, self);
      // debugger; // Check self.lines.
    });

    // this.lines = [
    //   {
    //     line: 100,
    //     destination: 'LA CONCHA DE TU MADRE'
    //   }
    // ];
  }

  fetchLineData($event) {
    this.busStopsForSelectedLine = new Array<Stop>();
    var self = this;
    var selectedLine = $event;
    if (selectedLine) { // Not falsy.
      var params = new HttpParams();
      params = params.append('line', selectedLine.line);
      params = params.append('destination', selectedLine.destination);
      this.http.get(this.baseUrl + 'getLine', {params: params}).subscribe(response => {
        // Read the result field from the JSON response.
        self.busStopsForSelectedLine = <Array<Stop>>response;
      });
    }
  }


}
