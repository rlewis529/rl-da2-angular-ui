import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {
  private apiUrl = 'http://localhost:5000/search-podcast'; 

  constructor(private http: HttpClient) {}

  searchPodcasts(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}`);
  }
}
