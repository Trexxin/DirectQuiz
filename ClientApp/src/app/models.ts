/**
 * Interface that represents a single quiz question.
 */
export interface QuizQuestion {
   type: string;
   difficulty: string;
   category: string;
   question: string;
   correct_answer: string;
   incorrect_answers: string[];
 }

/**
 * Interface that represents the response from the quiz API.
 */
 export interface QuizApiResponse {
   response_code: number;
   results: QuizQuestion[]
 }
