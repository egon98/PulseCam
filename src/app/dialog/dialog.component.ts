import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  name: any;
  country: any;
  dateofbirth: Date;
  maiden: any;
  ssn: any;

  constructor(
    public dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.name = this.data.name;
    this.country = this.data.country;
    this.dateofbirth = this.data.dateofbirth;
    this.maiden = this.data.maiden;
    this.ssn = this.data.ssn;
  }

  ngOnInit(): void {
    console.log('Dialog got', this.data);
  }

  closeDialog() {
    this.dialog.close();
  }


}
