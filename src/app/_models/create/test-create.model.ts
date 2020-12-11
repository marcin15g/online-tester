import { QuestionCreate } from "./question-create.model";

export interface TestCreate {
    id: string,
    numOfQuestions: number,
    numOfTestQuestions: number,
    password: string,
    randomize: boolean,
    testCode: string,
    testTime: number
    questions: QuestionCreate[]
}