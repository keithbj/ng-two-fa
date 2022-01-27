import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message: string;

  constructor(private window: Window) {}

  ngOnInit() {
    const { data } = this.window.history.state;
    this.message = data.message;
  }
}
