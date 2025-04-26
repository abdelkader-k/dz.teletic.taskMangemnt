import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
      return this.http.get(
          `${BASE_URL}api/admin/users`,
          { headers: this.createAuthorizationHeader() }
      );
  }
  
    getAllTasks(): Observable<any> {
        return this.http.get(BASE_URL + "api/admin/tasks", {
            headers: this.createAuthorizationHeader()
        });
    }

    postTask(taskDTO: any): Observable<any> {
        return this.http.post(BASE_URL + "api/admin/task", taskDTO, {
            headers: this.createAuthorizationHeader()
        });
    }

//   private createAuthorizationHeader(): HttpHeaders {
//       const token = StorageService.getToken();
//       if (!token) {
//           throw new Error('No authentication token available');
//       }
//       return new HttpHeaders({
//           'Authorization': `Bearer ${token}`
//       });
//   }
    private createAuthorizationHeader(): HttpHeaders {
        console.log(StorageService.getToken());
        
        return new HttpHeaders().set(
            'Authorization', 'Bearer ' + StorageService.getToken()          
        )
        // const token = StorageService.getToken();
        // if (!token) {
        //     throw new Error('No authentication token available');
        // }
        // return new HttpHeaders({
        //     'Authorization': `Bearer ${token}`
        // });
    }
}
