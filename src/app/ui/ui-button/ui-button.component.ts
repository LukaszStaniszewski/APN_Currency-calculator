import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";

export type UiButtonDesign = 'primary' | 'accent' | 'warn'

@Component({
  standalone: true,
  selector: 'ui-button',
  templateUrl: 'ui-button.component.html',
  imports: [MatButtonModule, MatIconModule, NgIf],
})
export class UiButtonComponent {
  @Input() design: UiButtonDesign = 'primary'
  @Input() icon: string | null = null
  @Input() ariaLabel = ''
  @Output() callback = new EventEmitter
}
