import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { QuizApiResponse, QuizQuestion } from '../models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizQuestions: QuizQuestion[] = [];

  constructor(private dataService: DataService) { }

  generateQuiz(category: string): void {
    this.dataService.getQuizQuestions(category).subscribe((quizData) => {
      console.log(quizData);
    })
  }

}
