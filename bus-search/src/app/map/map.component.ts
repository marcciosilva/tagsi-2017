import {Component, OnInit} from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  ngOnInit(): void {

    var mapProp = {
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById("map"), mapProp);

    // Create test markers.
    var maxMarkerSeparation = 0.05;
    var baseLat = -34.9011;
    var baseLong = -56.1645;
    var markerAmount = 15;
    for (let i = 0; i < markerAmount; i++) {
      var marker = new google.maps.Marker({
        position: {lat: Math.random() * maxMarkerSeparation + baseLat, lng: Math.random() * maxMarkerSeparation + baseLong},
        title: 'Test'
      });
      marker.setMap(this.map);
      this.markers.push(marker);
    }

    // Create bounds for map zoom.
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < this.markers.length; i++) {
      bounds.extend(this.markers[i].getPosition());
    }

    // Fit zoom to show all markers.
    this.map.fitBounds(bounds);
  }

  title: string = 'Mapa';
  map;
  markers = [];

}
