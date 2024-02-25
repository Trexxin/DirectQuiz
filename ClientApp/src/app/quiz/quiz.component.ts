/**
 * Component for picking a quiz category.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  constructor(private router: Router) { }

  /**
   * Method to select the quiz category and pass the category id into the quiz-settings component
   * @param category The category id for which quiz questions should be fetched.
   */
  selectCategory(category: string): void {
    this.router.navigate([`quiz-settings`, category])
  }
}
