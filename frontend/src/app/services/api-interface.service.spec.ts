import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiInterface {
  id?: number;
  name: string;
  type: string;
  baseUrl: string;
  description: string;
  authType: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiInterfaceService {

  private baseUrl = 'http://localhost:8080/api/interfaces';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiInterface[]> {
    return this.http.get<ApiInterface[]>(this.baseUrl);
  }

  getOne(id: number): Observable<ApiInterface> {
    return this.http.get<ApiInterface>(`${this.baseUrl}/${id}`);
  }

  create(api: ApiInterface): Observable<ApiInterface> {
    return this.http.post<ApiInterface>(this.baseUrl, api);
  }

  update(id: number, api: ApiInterface): Observable<ApiInterface> {
    return this.http.put<ApiInterface>(`${this.baseUrl}/${id}`, api);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
