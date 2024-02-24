import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { QuizApiResponse, QuizQuestion } from '../models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  constructor(private dataService: DataService, private router: Router) { }

  selectCategory(category: string): void {
    this.router.navigate([`quiz-settings`, category])
  }
  
  generateQuiz(category: string): void {
    this.dataService.getQuizQuestions(category).subscribe((quizData) => {
      console.log(quizData);
    })
  }
  

}
