import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {
  quizData: any;
  numberCorrect: number =  0;
  numberIncorrect: number = 0;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const storedQuizData = sessionStorage.getItem('quizData');
    if (storedQuizData) {
      this.quizData = JSON.parse(storedQuizData);
    } else {
      this.route.queryParams.subscribe(params => {
        const selectedCategory = params['category'];
        const numberOfQuestions = params['numberOfQuestions'];
        const quizDifficulty = params['quizDifficulty'];
        const quizType = params['quizType'];
        this.generateQuizApi(numberOfQuestions, selectedCategory, quizDifficulty, quizType);
      });
    }
  }

  generateQuizApi(numberOfQuestions: number, selectedCategory: string, quizDifficulty: string, quizType: string): void {
    this.dataService.getQuizQuestions(numberOfQuestions, selectedCategory, quizDifficulty, quizType)
      .subscribe((quizData: any) => {
        sessionStorage.setItem('quizData', JSON.stringify(quizData));
        this.quizData = quizData;
        console.log(this.quizData);
      });
  }

  handleAnswerSelected(answer: boolean): void {
    if (answer) {
      this.numberCorrect++;
    } else {
      this.numberIncorrect++;
    };
  }
}
