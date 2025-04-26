import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private http: HttpClient) { }

  getDeveloperTasksById(): Observable<any> {
      return this.http.get(`${BASE_URL}api/developer/tasks`, {
          headers: this.createAuthorizationHeader()
      });
  }
  
  private createAuthorizationHeader(): HttpHeaders {
      return new HttpHeaders().set(
          'Authorization', 'Bearer ' + StorageService.getToken()
      );
  }
  
  updateStatus(id: number, status: string): Observable<any> {
    return this.http.get(
        `${BASE_URL}api/developer/task/${id}/${status}`,
        {
            headers: this.createAuthorizationHeader()
        }
    );
}

}
