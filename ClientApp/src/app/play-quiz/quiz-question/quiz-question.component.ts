/**
 * Child component to display a single quiz question and it's answers.
 * Lets the user to select an answer and emits the selected answer to the parent component.
 */
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {
  @Input() question: string = '';
  @Input() correct_answer: string = '';
  @Input() incorrect_answers: string[] = [];
  @Input() type: string = '';
  @Output() answerSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  shuffledAnswers: string[] = [];
  selectedAnswer: string | null = null;

  constructor() { }

  /**
   * Randomizes the order of the answers when the component is initialized.
   */
  ngOnInit(): void {
    this.randomizeAnswers();
  }

  /**
   * Randomizes the order of the answers based on the type of question.
   */
  randomizeAnswers(): void {
    if (this.type === 'boolean') {
      this.shuffledAnswers = ['True', 'False'];
    } else {
      // Combine the correct and incorrect answers into an array
      const allAnswers = [this.correct_answer, ...this.incorrect_answers];
      this.shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
    }
  }

  /**
   * Handles the user's selected answer.
   * Emits the selected answer to the parent component.
   * @param answer selected answer
   */
  onSelectAnswer(answer: string): void {
    if (!this.selectedAnswer) {
      this.selectedAnswer = answer;
      const isCorrect = this.selectedAnswer === this.correct_answer;
      this.answerSelected.emit(isCorrect);
    }
  }
}


