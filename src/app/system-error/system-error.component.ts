import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-error',
  templateUrl: './system-error.component.html',
  styleUrls: ['./system-error.component.scss']
})
export class SystemErrorComponent implements OnInit {
  message: string;

  constructor(private window: Window) {}

  ngOnInit() {
    const { data } = this.window.history.state;
    this.message = data.message;
  }
}
