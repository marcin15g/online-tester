import { AnswerCreate } from "./answer-create.model";

export interface QuestionCreate {
    id: string,
    question: string,
    required: boolean,
    answers: AnswerCreate[]
}