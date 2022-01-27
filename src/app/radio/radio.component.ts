import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhoneNumber } from '../sms-tel-numbers/sms-tel-numbers.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;
  @Input() item: PhoneNumber;
  @Output() radioChange = new EventEmitter<string>();

  constructor() {}

  // Output param example usage.
  handleSelection(value: string) {
    console.log('1 radio handleSelection form.value:', this.form.value);

    // Workaround - form.value not being updated within sms-tel-numer-component
    // test. form.vale updated fine in non test use case.
    this.form.setValue({ number: value });

    console.log('2 radio handleSelection form.value:', this.form.value);
    this.radioChange.emit(value);
  }

  ngOnInit() {
    console.log('radio name:', this.name, ', item', this.item);
  }
}
