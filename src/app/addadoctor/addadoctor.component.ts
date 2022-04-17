import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Country} from "@angular-material-extensions/select-country";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-addadoctor',
  templateUrl: './addadoctor.component.html',
  styleUrls: ['./addadoctor.component.css']
})
export class AddadoctorComponent implements OnInit {
  id: any;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required ,Validators.pattern('^[a-zA-ZÀ-ÿ ]+(-[a-zA-ZÀ-ÿ ]+)*$')]),
    age: new FormControl('', [Validators.required, Validators.pattern('^[1-9]{2}$')]),
    specialization: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+(-[a-zA-ZÀ-ÿ ]+)*$')]),
    email: new FormControl('', [Validators.required, Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')]),
    phonenumber: new FormControl('', [Validators.required, Validators.pattern('^[+]+[0-9]*$')])

  })

  onSubmit() {
    if (this.form.value == null) {
      console.log('Form cannot be submitted with empty data')
    } else {
      this.id = uuidv4()
      this.firestore.collection(
        'Doctors').doc(this.id).set({
        id: this.id,
        name: this.form.value.name,
        age: this.form.value.age,
        specialization: this.form.value.specialization,
        email: this.form.value.email,
        phonenumber: this.form.value.phonenumber
      })
        .then(res => {
          console.log(res);
          this.form.reset();
          Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].setErrors(null);
          })
        })
        .catch(e => {
          console.log(e);
        })
    }
  }






}
