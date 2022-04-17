import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Country} from "@angular-material-extensions/select-country";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  name: string;
  country: any;
  dateofbirth: Date;
  maiden: any;
  ssn: any;
  phonenumber: any;

  constructor(
    public dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: AngularFirestore
  ) {
    this.name = this.data.name;
    this.country = this.data.country;
    this.dateofbirth = this.data.dateofbirth;
    this.maiden = this.data.maiden;
    this.ssn = this.data.ssn;
    this.phonenumber = this.data.phonenumber;

    this.form = new FormGroup({
      country: new FormControl('')
    })

  }

  ngOnInit(): void {
    console.log('Dialog got', this.data);
  }

  closeDialog() {
      this.dialog.close();
  }

  closeAndSetData() {
      this.dialog.close(MAT_DIALOG_DATA);
  }

  onCountrySelected($event: Country) {
    this.country = $event.name;
    //console.log(this.country)
  }


}
