import {Component, Input, OnChanges, OnInit} from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  title = 'Mapa';
  map;
  markers = [];
  @Input() busStopsForSelectedLine = [];
  startPinColor = '#8cbf65';
  midPinColor = '#ffe66c';
  endPinColor = '#bf5241';
  pinShadow;
  pins;
  polyline;
  private debugMode = false;

  ngOnInit(): void {

    const mapProp = {
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapProp);

    // Generate polyline.

    this.polyline = new google.maps.Polyline({
      strokeColor: '#ffb256',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    this.polyline.setMap(this.map);

    const polyPath = this.polyline.getPath();


    this.pins = [];

    // Add initial pin.
    let pinSize;
    const pinTextSize = 7;
    this.pinShadow = new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_shadow',
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
    let pinColor, pinImage;
    for (let i = 0; i < 3; i++) {
      switch (i) {
        case 0:
          pinColor = this.startPinColor;
          pinSize = 0.5;
          break;
        case 1:
          pinColor = this.midPinColor;
          pinSize = 0.2;
          break;
        case 2:
          pinColor = this.endPinColor;
          pinSize = 0.5;
          break;
      }
      pinImage = new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_spin&chld=' + pinSize
        + '|0|' + pinColor.slice(1, pinColor.length) + '|' + pinTextSize + '|b');
      // Slice the # character. # is used to edit color easily in IDE.
      this.pins.push({pinImage: pinImage});
    }


    if (this.debugMode) { // Create test markers.
      const maxMarkerSeparation = 0.002;
      const baseLat = -34.9011;
      const baseLong = -56.1645;
      const markerAmount = 15;
      for (let i = 0; i < markerAmount; i++) {
        let marker;
        if (i === 0) {
          marker = new google.maps.Marker({
            position: {
              lat: baseLat,
              lng: baseLong,
              opacity: 0.5
            },
            icon: this.pins[0].pinImage,
            shadow: this.pinShadow
          });
        } else if (i < markerAmount - 1) {
          marker = new google.maps.Marker({
            position: {
              lat: Math.random() * maxMarkerSeparation + this.markers[i - 1].getPosition().lat(),
              lng: Math.random() * maxMarkerSeparation + this.markers[i - 1].getPosition().lng()
            },
            icon: this.pins[1].pinImage,
            shadow: this.pinShadow
          });
        } else {
          marker = new google.maps.Marker({
            position: {
              lat: Math.random() * maxMarkerSeparation + this.markers[i - 1].getPosition().lat(),
              lng: Math.random() * maxMarkerSeparation + this.markers[i - 1].getPosition().lng()
            },
            icon: this.pins[2].pinImage,
            shadow: this.pinShadow
          });
        }

        polyPath.push(marker.position);
        marker.setTitle('marker-' + i);
        marker.setMap(this.map);
        this.markers.push(marker);
      }
    }
    this.fitMapToMarkers();

  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('busStopsForSelectedLine')) { // Change on bus stops.
      this.updateMap();
    }
  }

  private updateMap() {
    const markerAmount = this.busStopsForSelectedLine.length;
    for (let i = 0; i < markerAmount; i++) {
      let marker;
      if (i === 0) {
        marker = new google.maps.Marker({
          position: this.busStopsForSelectedLine[i],
          icon: this.pins[0].pinImage,
          shadow: this.pinShadow
        });
      } else if (i < markerAmount - 1) {
        marker = new google.maps.Marker({
          position: this.busStopsForSelectedLine[i],
          icon: this.pins[1].pinImage,
          shadow: this.pinShadow
        });
      } else {
        marker = new google.maps.Marker({
          position: this.busStopsForSelectedLine[i],
          icon: this.pins[2].pinImage,
          shadow: this.pinShadow
        });
      }

      let polyPath = this.polyline.getPath();
      polyPath = [];
      polyPath.push(marker.position);
      marker.setTitle('marker-' + i); // TODO change this?
      marker.setMap(this.map);
      this.markers.push(marker);
      this.fitMapToMarkers();
    }

  }

  private fitMapToMarkers() {
    // Create bounds for map zoom.
    const bounds = new google.maps.LatLngBounds();
    if (this.markers.length === 0) {
      // Set initial hardcodedbounds.
      bounds.extend({lat: -34.9011, lng: -56.1645});
      bounds.extend({lat: -33.9981, lng: -55.45});
    } else {
      for (let i = 0; i < this.markers.length; i++) {
        bounds.extend(this.markers[i].getPosition());
      }
    }
    // Fit zoom to show all markers.
    this.map.fitBounds(bounds);
  }
}
