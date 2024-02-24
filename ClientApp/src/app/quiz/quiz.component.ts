import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { QuizApiResponse, QuizQuestion } from '../models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizQuestions: QuizQuestion[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getQuizQuestions().subscribe((response: QuizApiResponse) => {
      this.quizQuestions = response.results;
      console.log(response);
    });
  }
}
