import {Component, inject} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControlAbstractComponent} from "../shared/form-control-abstract.component";
import {ControlContainer, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'ui-field-number',
  templateUrl: 'ui-field-number.component.html',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UiFieldNumberComponent
    }
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ]
})
export class UiFieldNumberComponent<T> extends FormControlAbstractComponent<T> {

}
