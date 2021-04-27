import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //You can get another API url from https://geo.ipify.org/ and exchange this one
  readonly APIUrl ='https://geo.ipify.org/api/v1?apiKey=at_9cPLMP1vhhECtwihjmIgxI7tEakVz&';

  APIData: any = [];
  IP: string = '';
  

  data$ = new Subject<any>();
  ip$ = new Subject<string>();
  void$ = new Subject<void>();


  constructor(private http: HttpClient) {}

  // Connect to API
  getIPData(val:string):Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}ipAddress=${val}`);
  }

  getDomainData(val:string):Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}domain=${val}`);
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
