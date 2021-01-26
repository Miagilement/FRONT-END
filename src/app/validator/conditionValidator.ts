import {FormGroup} from '@angular/forms';

export function conditionSelected() {
  return (group: FormGroup): {
    [Key: string]: any
  } => {
    let conditionSelected = group.controls['conditionUser'];

    if (conditionSelected.value == false) {
      conditionSelected.setErrors({conditionNoSelected: true});
      return null;
    }
  };
}
