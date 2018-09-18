import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../shared/services/messages.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  public msg: string;

  public isShow = true;

  constructor(
    private messagesService: MessagesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.messagesService.getMessages()
      .subscribe((msg: any) => {
        let checkStyle: string;

        if (msg.type === 'success') {
          checkStyle = 'blue-snackbar';
        } else {
          checkStyle = 'red-snackbar';
        }

        this.snackBar.open(msg.body, '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: [checkStyle]
        });
      });
  }


}
