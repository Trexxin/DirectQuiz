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

  ngOnInit(): void {
    this.randomizeAnswers();
  }
  randomizeAnswers(): void {
    if (this.type === 'boolean') {
      this.shuffledAnswers = ['True', 'False'];
    } else {
      // Combine correct and incorrect answers into one array
      const allAnswers = [this.correct_answer, ...this.incorrect_answers];
      this.shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
    }
  }

  onSelectAnswer(answer: string): void {
    if (!this.selectedAnswer) {
      this.selectedAnswer = answer;
      const isCorrect = this.selectedAnswer === this.correct_answer;
      this.answerSelected.emit(isCorrect);
    }
  }
}


