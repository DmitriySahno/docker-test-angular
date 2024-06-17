import {inject, Injectable} from "@angular/core";
import {FetchBackend, HttpBackend, HttpClient, HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../assets/env/environment";
import {Customer} from "../model/customer";

@Injectable({
  providedIn: "root"
})
export class Service {

  serverUrl = environment.apiBaseURL;
  httpClient = inject(HttpClient);//(new FetchBackend());

  getAll<T>(uri: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.serverUrl}/${uri}`);
  }

  getById<T>(uri: string, id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.serverUrl}/${uri}/${id}`);
  }

  save(uri: string, customer: Customer) {
    return this.httpClient.post<Customer>(`${this.serverUrl}/${uri}`, customer);
  }
}
