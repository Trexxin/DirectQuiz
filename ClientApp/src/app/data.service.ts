import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { QuizApiResponse } from './models'
import { DomSanitizer } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private sanitzer: DomSanitizer) { }

  quizData: any;

  /**
 * Retrieves quiz questions from the opentdb API based on the specified category.
 * @param category The category for which quiz questions should be fetched.
 */
  getQuizQuestions(numberOfQuestions: number, selectedCategory: string, quizDifficulty: string, quizType: string): Observable<QuizApiResponse> {
    let apiUrl = 'https://opentdb.com/api.php?' + 'amount=' + numberOfQuestions;

    if (selectedCategory !== "") {
      apiUrl += '&category=' + selectedCategory;
    }

    if (quizDifficulty !== "") {
      apiUrl += '&difficulty=' + quizDifficulty;
    }

    if (quizType !== "") {
      apiUrl += '&type=' + quizType;
    }

    this.quizData = this.http.get<QuizApiResponse>(apiUrl).pipe(
      map(response => {
        // Iterate through each quiz question and decode HTML entities
        response.results.forEach(question => {
          question.question = this.decodeHtmlEntities(question.question);
          question.correct_answer = this.decodeHtmlEntities(question.correct_answer);
          question.incorrect_answers = question.incorrect_answers.map(this.decodeHtmlEntities);
        });
        return response;
      })
    );
    return this.quizData;
  }

  /**
 * Decodes HTML entities from the text returned from the API.
 * @param text The text containing HTML entities to decode.
 * @returns The decoded text.
 */
  private decodeHtmlEntities(text: string): string {
    const element = document.createElement('div');
    element.innerHTML = text;
    if (element.textContent !== null) {
      return element.textContent;
    } else {
      return '';
    }
  }
}
