import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Application} from "../interfaces/Application";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) {
  }

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl).pipe(
      map(applications => applications.map(app => ({
        ...app,
        createdAt: new Date(app.created_at),
        updatedAt: new Date(app.updated_at)
      })))
    );
  }

  searchByTextFieldNadCreatedUpdatedDates(searchText?: string, createdDate?: string, updatedDate?: string): Observable<Application[]> {
    let params = new HttpParams();
    if (searchText) {
      params = params.append('searchText', searchText);
    }
    if (createdDate) {
      params = params.append('createdDate', createdDate);
    }
    if (updatedDate) {
      params = params.append('updatedDate', updatedDate);
    }

    return this.http.get<Application[]>(this.apiUrl+'/search', { params });
  }

  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`).pipe(
      map(app => ({
        ...app,
        createdAt: new Date(app.created_at),
        updatedAt: new Date(app.updated_at)
      }))
    );
  }

  createApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  updateApplication(application: Application): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${application.business_application_id}`, application);
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
