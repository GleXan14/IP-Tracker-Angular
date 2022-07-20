import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //You can get another API url from https://geo.ipify.org/ and exchange this one
  private readonly APIUrl ='https://geo.ipify.org/api/v1';
  private readonly apiKey = 'at_9cPLMP1vhhECtwihjmIgxI7tEakVz';

  APIData: any = [];
  IP: string = '';

  data$ = new Subject<any>();
  ip$ = new Subject<string>();
  void$ = new Subject<void>();


  constructor(private http: HttpClient) {}

  // Connect to API
  getIPData(val:string):Observable<any[]>{
    const params:any = {apiKey:this.apiKey};
    if(val.trim().length > 0){
      params.ipAddress = val;
    }
    return this.http.get<any>(`${this.APIUrl}`, {params});
  }

  getDomainData(val:string):Observable<any[]>{
    const params = {apiKey:this.apiKey, domain:val};
    return this.http.get<any>(`${this.APIUrl}`, {params});
  }

  // Update data 
  changeData():void{
    this.ip$.next(this.IP);
    this.data$.next(this.APIData);
  }

  // Delete data of some variables
  reinitData():void{
    this.void$.next();
  }
  
}
