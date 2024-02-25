import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizSettingsComponent } from './quiz-settings/quiz-settings.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { QuizQuestionComponent } from './play-quiz/quiz-question/quiz-question.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    QuizComponent,
    QuizSettingsComponent,
    PlayQuizComponent,
    QuizQuestionComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'quiz', component: QuizComponent },
      { path: 'quiz-settings/:category', component: QuizSettingsComponent },
      { path: 'quiz/play', component: PlayQuizComponent },
      { path: 'quiz/results', component: ResultsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
