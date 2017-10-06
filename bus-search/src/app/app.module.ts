import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MapComponent } from './map/map.component';

// import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    NguiAutoCompleteModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB7yG6dHZmO9juz7LCJ4WAB-nz8o42byZI'
    // })
  ],
  providers: [],//GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
