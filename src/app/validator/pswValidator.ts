import {FormGroup} from "@angular/forms";

export function matchingPassword() {
  return (group: FormGroup): {
    [Key: string]: any
  } => {
    let password = group.controls["password"];
    let confirmPassword = group.controls["pswConfirm"];

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({pswMatchesConfirm: true});
      return null;
    }
  }
}
