import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizApiResponse } from './models'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://opentdb.com/api.php?amount=10'

  getQuizQuestions(): Observable<QuizApiResponse> {
    return this.http.get<QuizApiResponse>(`${this.apiUrl}`);
  } 
}
