import {FormGroup} from '@angular/forms';

export function matchingPassword() {
  return (group: FormGroup): {
    [Key: string]: any
  } => {
    let password = group.controls['userPassword'];
    let confirmPassword = group.controls['pswConfirm'];

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({pswMatchesConfirm: true});
      return null;
    }
  };
}
