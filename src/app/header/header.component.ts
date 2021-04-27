import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  IP:string = "";

  alert:string = "Search for any IP address or domain";

  //regexp for IPv4 address
  reIp = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
  //regexp for domain
  reDomain = /\w+\.[a-z]+/i; 

 
  constructor(private service: SharedService) { }


  ngOnInit(): void {
    this.search();
  }

  search():void{

    if(this.reIp.test(this.IP) || this.IP === ''){//search for ip

      this.service.reinitData();
      this.service.getIPData(this.IP).subscribe((data: any) =>{
        
        this.service.IP = this.IP;
        this.service.APIData = data;
        this.service.changeData();
      }, (err: any) => {
        console.error(err);
      });
    }else if (this.reDomain.test(this.IP.toLowerCase())){//search for domain

      this.service.reinitData();
      this.service.getDomainData(this.IP.toLowerCase()).subscribe((data:any)=>{

        
        this.service.IP = this.IP;
        this.service.APIData = data;
        this.service.changeData();
        

      },(err:any)=>{
        
        this.IP = "";
        this.service.changeData();
        this.alert = "Error 404 -Maybe this domain doesn't exist. Try another one";
        console.error(err);
      })

    }else{

      this.IP = "";
      this.alert = "ej:('8.8.8.8' or 'google.com')"
    }
    

  }

}
