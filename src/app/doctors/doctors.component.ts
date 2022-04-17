import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Patient} from "../patient";
import {MatTableDataSource} from "@angular/material/table";
import {Doctor} from "../doctor";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatDialog} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {DialogComponent} from "../dialog/dialog.component";
import {DoctoreditdialogComponent} from "../doctoreditdialog/doctoreditdialog.component";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;
  doctor: Doctor[] = [];
  public displayedColumns: string[] = ['name', 'age', 'specialization', 'email', 'phonenumber', 'editBtn'];
  public obj: Object;
  public doctors;
  public dataSource = new MatTableDataSource<Doctor>();

  constructor(private firestore: AngularFirestore, private dialog: MatDialog, private announcer: LiveAnnouncer) {
    this.doctors = firestore.collection('Doctors').valueChanges();
  }

  ngOnInit(): void {
    this.getDoctorName();
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  getDoctorName() {
    this.firestore.collection('Doctors').valueChanges().subscribe((res: Doctor[]) => {
      console.log(res);
      this.dataSource.data = res;

    })
    // return this.firestore.collection('Patients').snapshotChanges();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if(sortState.direction) {
      this.announcer.announce('Sorted ${sortState.direction}ending');
    } else {
      this.announcer.announce('Sorting cleared');
    }
  }

  dialogOpen(row: Doctor, event) {
    const dialog = this.dialog.open(DoctoreditdialogComponent, {
      width: '280px',
      disableClose: true,
      data: row
    });
    dialog.afterClosed().subscribe(res => {
      console.log('The dialog was closed');

      if(res) {

        if(res.name !== '') {
          this.firestore.collection('Doctors').doc(row.id).update({
            name: res.name,
            age: res.age,
            specialization: res.specialization,
            email: res.email,
            phonenumber: res.phonenumber
          })
        }

      }
    });
  }

  deleteRowData(row: Patient, event) {
    if(confirm('Are you sure you want to delete this doctor?' + ' ' + row.name)) {
      this.firestore.collection('Doctors').doc(row.id).delete()
    }
  }

}
