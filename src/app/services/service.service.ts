import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl ='https://mock-api.assessment.sfsdm.org'

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(private http : HttpClient) { }

  getConfig(){
    return this.http.get(`${baseUrl}/config`);
  }

  getDevices(){
    return this.http.get(`${baseUrl}/devices`);
  }

  getDeviceData(id:string){
    return this.http.get(`${baseUrl}/events/${id}`);
  }

  getOrderData(id:string){
    return this.http.get(`${baseUrl}/order/${id}`);
  }
}

