import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {
  @Input() quizData: any;
  constructor() { }

  ngOnInit(): void {

  }

  
}
