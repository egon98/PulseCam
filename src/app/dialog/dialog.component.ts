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
//form: FormGroup;
  name: string;
  country: any;
  dateofbirth: Date;
  maiden: any;
  ssn: any;

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

    /*this.form = new FormGroup({
      name: new FormControl(this.name),
      country: new FormControl(this.country),
      dateofbirth: new FormControl(this.dateofbirth),
      maiden: new FormControl(this.maiden),
      ssn: new FormControl(this.ssn)
    })*/
  }

  ngOnInit(): void {
    console.log('Dialog got', this.data);
  }

  closeDialog() {
    if(this.name.match('^[a-zA-Z]+$')) {
      this.dialog.close();
    }

  }

  closeAndSetData() {
      this.dialog.close(MAT_DIALOG_DATA);
  }

  onCountrySelected($event: Country) {
    this.country = $event.name;
    //console.log(this.country)
  }


}
