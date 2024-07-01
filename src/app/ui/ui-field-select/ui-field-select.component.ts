import {ChangeDetectionStrategy, Component, inject, Input} from "@angular/core";
import {MatSelectModule} from "@angular/material/select";
import {ControlContainer, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";
import {FormControlAbstractComponent} from "../shared/form-control-abstract.component";
import {MatInputModule} from "@angular/material/input";

export type Option<T> = {
  value: T
  label: string
}

@Component({
  standalone: true,
  selector: 'ui-field-select',
  templateUrl: 'ui-field-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatSelectModule, NgForOf, CommonModule, MatInputModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UiFieldSelectComponent
    }
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ]
})
export class UiFieldSelectComponent<T> extends FormControlAbstractComponent<T> {
  @Input({required: true}) options: Option<T>[] = []
}
