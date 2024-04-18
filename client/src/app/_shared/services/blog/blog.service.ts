import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IBlog } from '../../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiBaseUrl: string;

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  getAllBlogs = () => {
    return this.http.get<IBlog[]>(`${this.apiBaseUrl}/blog`);
  };
}
