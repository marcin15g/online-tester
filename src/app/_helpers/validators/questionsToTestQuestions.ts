import { AbstractControl, ValidationErrors } from "@angular/forms";

export function questionsToTestQuestions(
    control: AbstractControl
  ): ValidationErrors | null {
    if(control && control.get("numOfQuestions") && control.get("numOfTestQuestions")) {
      const num = control.get("numOfQuestions").value;
      const testNum = control.get("numOfTestQuestions").value;

      if(testNum > num) {
        const testControl = control.get('numOfTestQuestions');
        if(testControl) testControl.setErrors({'moreThanNum': true});
        return {numOfQuestionsError: true};
      } else {
        return null;
      }
    }
    return null;
  }