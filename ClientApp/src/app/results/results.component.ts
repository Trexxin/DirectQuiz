import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.totalAnswers = params['totalAnswers'];
      this.numberIncorrect = params['numberIncorrect'];
      this.numberCorrect = params['numberCorrect'];
    })
  }

  playAgain(): void {
    this.router.navigate([`quiz`]);
  }
}
