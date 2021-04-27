import { Component, AfterViewInit } from '@angular/core';

import * as L from 'leaflet';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
    
  map : any;

  lat: number = 0;
  lng: number = 0;

  data:any = [];
  ip:string = '';

  latString:string = '';
  lngString:string = '';


  constructor(private service:SharedService) { 

    //get all necessary data

    service.ip$.subscribe((ip:string)=>{
      this.ip = ip;
    },(err:any)=>{
      console.error(err);
    })

    service.data$.subscribe((data:any)=>{
      this.data = data.location;
      this.getValues();
    }, (err:any)=>{
      console.error(err);
    });

    
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  
  //Map

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });    

    tiles.addTo(this.map);
   
  }

  // To get coordinates and update the map

  getValues():void{
    this.latString = this.data? this.data.lat : '';
    this.lngString = this.data? this.data.lng : '';

    this.lat = this.latString != ''? parseFloat(this.latString) : 0;
    this.lng = this.lngString != ''? parseFloat(this.lngString) : 0;

    if(this.lat == 0 && this.lng == 0){
      this.map.setView([this.lat, this.lng], 10);
    }else{
      this.map.setView([this.lat, this.lng]);

      const marker = L.marker([this.lat, this.lng]);
      marker.addTo(this.map);
      if(this.ip === ''){
        marker.bindPopup("<b>Hey!!</b><br>This is your public IP.").openPopup();
      }else{
        marker.bindPopup("<b>Hey!!</b><br>This IP is what you're looking for.").openPopup();
      }
      
    }
   
  }


}
