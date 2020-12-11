import { Question } from "./question.model";

export interface TestSolve {
    id: string,
    questions: Question[]
}