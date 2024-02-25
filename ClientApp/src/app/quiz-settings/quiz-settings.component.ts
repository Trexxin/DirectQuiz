import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.css']
})
export class QuizSettingsComponent implements OnInit {
  selectedCategory: string = '';
  numberOfQuestions: number = 10;
  invalidInput: boolean = false;
  quizDifficulty: string = '';
  quizType: string = '';

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedCategory = params[`category`];
    })
  }

  validateInput() {
    this.invalidInput = (this.numberOfQuestions < 1 || this.numberOfQuestions > 50);
  }

  generateQuizApi(numberOfQuestions: number, selectedCategory: string, quizDifficulty: string, quizType: string): void {
    this.dataService.getQuizQuestions(numberOfQuestions, selectedCategory, quizDifficulty, quizType);
  }

  generateQuiz(): void {
    this.generateQuizApi(this.numberOfQuestions, this.selectedCategory, this.quizDifficulty, this.quizType)
    this.router.navigate([`quiz/play`], {
      queryParams: {
        category: this.selectedCategory,
        numberOfQuestions: this.numberOfQuestions,
        quizDifficulty: this.quizDifficulty,
        quizType: this.quizType
      }
    });
    sessionStorage.clear();
  }
}
