
import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-ip-data',
  templateUrl: './ip-data.component.html',
  styleUrls: ['./ip-data.component.css']
})
export class IpDataComponent implements OnInit {


  
  ip:string = "";
  country:string = "";
  region:string = "";
  timeZone:string = "";
  postalCode: string = "";
  isp:string = "";

  constructor(public services: SharedService) {

    //get all necessary data

    services.void$.subscribe(()=>{
      
      this.ip = "-1";
      this.country = "-1";
      this.region = "-1";
      this.timeZone = "-1";
      this.postalCode = "-1";
      this.isp = "-1";
    })
    
    services.data$.subscribe((data:any)=>{
      
      this.ip = data.ip;
      this.region = data.location.region ? data.location.region+", " : "";
      this.country = data.location.country === "ZZ" ? "n/a" : data.location.country;
      this.postalCode = data.location.postalCode ? ", "+data.location.postalCode :"";
      this.timeZone = data.location.timezone ? data.location.timezone : "n/a";
      this.isp = data.isp ? data.isp : "n/a";
        
      
    },(err:any)=>{
      console.error(err);
    });

   
  }

  ngOnInit(): void {}

}
