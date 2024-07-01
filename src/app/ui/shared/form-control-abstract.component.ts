import {Component, Input} from "@angular/core";
import {ControlValueAccessor} from "@angular/forms";


@Component({template: ''})
export abstract class FormControlAbstractComponent<T> implements ControlValueAccessor {
  @Input() label = ''
  @Input({required: true}) formControlName!: string

  private value!: T
  private disabled = false

  public onChange = (value: T) => {
  };

  public onTouched = () => {
  };

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: T): void {
    this.value = value;
    this.onChange(value);
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
  }
}
