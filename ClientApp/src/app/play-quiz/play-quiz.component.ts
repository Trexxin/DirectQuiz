/**
 * Component for playing the quiz.
 * Displays quiz questions and lets users select pick answers.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {
  quizData: any;
  totalAnswers: number = 0;
  numberCorrect: number =  0;
  numberIncorrect: number = 0;
  isValid: boolean = true;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  /**
   * Retrieves quiz data from sessionStorage if it exists, otherwise generates a new quiz.
   */
  ngOnInit(): void {
    const storedQuizData = sessionStorage.getItem('quizData');
    const storedTotalAnswers = sessionStorage.getItem('totalAnswers');
    if (storedQuizData && storedTotalAnswers!== null) {
      this.quizData = JSON.parse(storedQuizData);
      this.totalAnswers = parseInt(storedTotalAnswers);
      this.validateQuiz();
    } else {
      this.route.queryParams.subscribe(params => {
        const selectedCategory = params['category'];
        const numberOfQuestions = params['numberOfQuestions'];
        const quizDifficulty = params['quizDifficulty'];
        const quizType = params['quizType'];
        this.totalAnswers = parseInt(numberOfQuestions);
        sessionStorage.setItem('totalAnswers', JSON.stringify(this.totalAnswers));
        this.generateQuizApi(numberOfQuestions, selectedCategory, quizDifficulty, quizType);
      });
    }
  }

  /**
   * Calls the dataservice to generate a quiz with the specified parameters.
   * Stores the quiz in sessionStorage.
   * @param numberOfQuestions Number of questions in the quiz
   * @param selectedCategory selected category for the quiz
   * @param quizDifficulty difficulty level of the quiz
   * @param quizType type of quiz
   */
  generateQuizApi(numberOfQuestions: number, selectedCategory: string, quizDifficulty: string, quizType: string): void {
    this.dataService.getQuizQuestions(numberOfQuestions, selectedCategory, quizDifficulty, quizType)
      .subscribe((quizData: any) => {
        sessionStorage.setItem('quizData', JSON.stringify(quizData));
        this.quizData = quizData;
        this.validateQuiz();
      });
  }

  /**
   * Handles the user's answers and makes sure the quiz is completed
   * @param answer indicates whether the selected answer is correct
   */
  handleAnswerSelected(answer: boolean): void {
    if (answer) {
      this.numberCorrect++;
    } else {
      this.numberIncorrect++;
    };
    this.validateQuiz();
  }

  /**
   * Validates the quiz by checking if the total number of answers matches the expected total.
   */
  validateQuiz(): boolean {
    this.isValid = (this.numberCorrect + this.numberIncorrect) === this.totalAnswers;
    return this.isValid;
  
  }

  /**
   * Navigates to the results page and passes in the number of correct and incorrect answers.
   */
  showResults(): void {
    this.router.navigate([`quiz/results`], { queryParams: { numberCorrect: this.numberCorrect, numberIncorrect: this.numberIncorrect }});
  }
}
