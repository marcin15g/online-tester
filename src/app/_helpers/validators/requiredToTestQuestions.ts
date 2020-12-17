import { AbstractControl, ValidationErrors } from "@angular/forms";
import { TestCreate } from "../../_models/create/test-create.model";
import { Question } from "../../_models/solve/question.model";

export function requiredToTestQuestions (
    control: AbstractControl
  ): ValidationErrors | null {
    if(control && control.get("numOfTestQuestions") && control.get("questions")) {

        const testNum: number = control.get("numOfTestQuestions").value;
        const questions: Array<Question> = control.get("questions").value;

        let numOfRequired: number = 0;
        questions.forEach(q => {
            if(q.required) numOfRequired++;
        })

        console.log(numOfRequired);
    
        if(testNum < numOfRequired) {
            const testControl = control.get('numOfTestQuestions');
            if(testControl) testControl.setErrors({"lessThanRequired" : true});
        } 
        else {
            return null;
        }
    }
    return null;
  }