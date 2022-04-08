import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog-on-delete-row',
  templateUrl: './dialog-on-delete-row.component.html',
  styleUrls: ['./dialog-on-delete-row.component.css']
})
export class DialogOnDeleteRowComponent implements OnInit {

  constructor(public dialog: MatDialogRef<DialogOnDeleteRowComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialog.close();
  }

}
