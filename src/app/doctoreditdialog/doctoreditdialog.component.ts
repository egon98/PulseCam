import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-doctoreditdialog',
  templateUrl: './doctoreditdialog.component.html',
  styleUrls: ['./doctoreditdialog.component.css']
})
export class DoctoreditdialogComponent implements OnInit {
  name: string;
  age: any;
  specialization: any;
  email: any;
  phonenumber: any;

  constructor(public dialog: MatDialogRef<DoctoreditdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = this.data.name;
    this.age = this.data.age;
    this.specialization = this.data.specialization;
    this.email = this.data.email;
    this.phonenumber = this.data.phonenumber;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialog.close();
  }

}
