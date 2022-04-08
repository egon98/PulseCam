import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Country} from "@angular-material-extensions/select-country";
import {v4 as uuidv4} from 'uuid'

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {
  public country;
  id: any;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    name: new FormControl(''),
    dateofbirth: new FormControl(''),
    ssn: new FormControl(''),
    country: new FormControl(''),
    maiden: new FormControl('')

  })

  onCountrySelected($event: Country) {
    this.country = $event.name;
  }

  onSubmit() {
    if (this.form.value == null) {
      console.log('Form cannot be submitted with empty data')
    } else {
      this.id = uuidv4()
      this.firestore.collection(
        'Patients').doc(this.id).set({
        id: this.id,
        name: this.form.value.name,
        dateofbirth: this.form.value.dateofbirth.toISOString().split('T')[0],
        ssn: this.form.value.ssn,
        country: this.country,
        maiden: this.form.value.maiden
      })
        .then(res => {
          console.log(res);
          this.form.reset();
        })
        .catch(e => {
          console.log(e);
        })
    }
  }
}
