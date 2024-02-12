import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(control: AbstractControl) : ValidationErrors | null {
    const password = control.get("password").value;
    const confirm = control.get("confirmPassword").value;
    if (password != confirm) { return { 'noMatch': true } }
 
    return null
}
