/**
 * Component for displaying quiz results and lets user play the quiz again.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  totalAnswers: number = 0;
  numberIncorrect: number = 0;
  numberCorrect: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }

  /**
   * Gets the route query parameters to get the results of the quiz.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.totalAnswers = params['totalAnswers'];
      this.numberIncorrect = params['numberIncorrect'];
      this.numberCorrect = params['numberCorrect'];
    })
  }

  /**
    * Navigates to the quiz component to play the quiz again.
   */
  playAgain(): void {
    this.router.navigate([`quiz`]);
  }
}
