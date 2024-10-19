// nospacebar validator-- > dont mension it in interview, that we have created it,
// you can mention emp no validator for this

import { AbstractControl, ValidationErrors } from "@angular/forms";


export class NoSpaceValidator{
     static noSpace(control : AbstractControl) : ValidationErrors | null{
        let val = control.value as string

        if(!val){
            return null;
        }

        if(val.includes(" ")){
            return {
                noSpaceBar : 'Space is not allowed !'
            }
        }
        else{
            return null
        }


     }
}