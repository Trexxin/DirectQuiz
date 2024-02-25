/**
 * Component for choosing quiz settings.
 * Allows users to select the category, number of questions, difficulty, and type of quiz.
 */
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

  /**
   * Gets the selected category from the route parameters.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedCategory = params[`category`];
    })
  }

  /**
   * Validates the input for the number of questions.
   * Invalid if the input is out of range.
   */
  validateInput() {
    this.invalidInput = (this.numberOfQuestions < 1 || this.numberOfQuestions > 50);
  }

  /**
   * Passes the speciified quiz settings to the quiz/play page.
   * Clears sessionStorage to make sure a new quiz is generated.
   */
  generateQuiz(): void {
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
