import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.css']
})
export class QuizSettingsComponent implements OnInit {
  selectedCategory: string = '';
  numberOfQuestions: number = 1;
  invalidInput: boolean = false;
  quizDifficulty: string = '';
  quizType: string = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedCategory = params[`category`];
    })
  }

  validateInput() {
    this.invalidInput = (this.numberOfQuestions < 1 || this.numberOfQuestions > 50);
  }

  generateQuizApi(numberOfQuestions: number, selectedCategory: string, quizDifficulty: string, quizType: string): void {
    this.dataService.getQuizQuestions(numberOfQuestions, selectedCategory, quizDifficulty, quizType).subscribe((quizData) => {
      console.log(quizData);
    })
  }

  generateQuiz(): void {
    this.generateQuizApi(this.numberOfQuestions, this.selectedCategory, this.quizDifficulty, this.quizType)
  }
}
