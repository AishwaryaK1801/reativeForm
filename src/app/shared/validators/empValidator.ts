import { AbstractControl, ValidationErrors } from "@angular/forms";
// you can tell this ex in interview if interviewer asks-> did you created any custom validator in your work?
export class EmpValidator{
    static isEmpValid(control : AbstractControl) : ValidationErrors | null{
        let val = control.value as string;

        if(val){
            let regex = /^[A-Z]\d{3}$/;

            let isValid = regex.test(val);

            if(isValid){
                return null
            }
            else{
                return {
                    invalidEmpId : `Employee Id Should start with 1 Albhabate and should end with 3 numbers !`
                }
            }
        }
        else{
            return null
        }
    }
}