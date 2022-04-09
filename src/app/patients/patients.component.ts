import {AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {data} from "jquery";
import firebase from "firebase/compat";
import firestore = firebase.firestore;
import {Patient} from "../patient";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {FormControl, FormGroup} from "@angular/forms";
import {DialogOnDeleteRowComponent} from "../dialog-on-delete-row/dialog-on-delete-row.component";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})

export class PatientsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;
  patient: Patient[] = [];
  public displayedColumns: string[] = ['name', 'country', 'dateofbirth', 'maiden', 'ssn', 'editBtn'];
  public obj: Object;
  public patients;
  public dataSource = new MatTableDataSource<Patient>();
  constructor(private firestore: AngularFirestore, private dialog: MatDialog, private announcer: LiveAnnouncer) {
    this.patients = firestore.collection('Patients').valueChanges()
  }
  //asd = (event.target as HTMLInputElement).value;




  ngOnInit(): void {
    this.getPatientName();
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  getPatientName() {
    this.firestore.collection('Patients').valueChanges().subscribe((res: Patient[]) => {
      console.log(res);
      this.dataSource.data = res;

    })
   // return this.firestore.collection('Patients').snapshotChanges();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogOpen(row: Patient, event) {
    const dialog = this.dialog.open(DialogComponent, {
      width: '250px',
      disableClose: true,
      data: row
    });
    dialog.afterClosed().subscribe(res => {
      console.log('The dialog was closed');

      /*if(row.dateofbirth !== res.dateofbirth.toISOString().split('T')[0]) {
        res.dateofbirth.setMinutes(res.dateofbirth.getMinutes() - res.dateofbirth.getTimezoneOffset());
        res.dateofbirth = res.dateofbirth.toISOString().split('T')[0]
      }*/

        if(res) {

          //this.dataSource.data[res.position - 1] = res;
          //this.dataSource._updateChangeSubscription();
          console.log(res.dateofbirth)
          console.log(row.dateofbirth)
            this.firestore.collection('Patients').doc(row.id).update({
              name: res.name,
              country: res.country,
              maiden: res.maiden,
              ssn: res.ssn
            })

            res.dateofbirth.setMinutes(res.dateofbirth.getMinutes() - res.dateofbirth.getTimezoneOffset());
            this.firestore.collection('Patients').doc(row.id).update({
              dateofbirth: res.dateofbirth.toISOString().split('T')[0]
            })
        }
    });
  }

  deleteRowData(row: Patient, event) {
    const dialog = this.dialog.open(DialogOnDeleteRowComponent, {
      width: '400px',
      height: '190px',
      disableClose: true
    });

    dialog.afterClosed().subscribe(res => {
        this.firestore.collection('Patients').doc(row.id).delete()
    });
  }


announceSortChange(sortState: Sort) {
  if(sortState.direction) {
    this.announcer.announce('Sorted ${sortState.direction}ending');
  } else {
    this.announcer.announce('Sorting cleared');
  }
}

}
