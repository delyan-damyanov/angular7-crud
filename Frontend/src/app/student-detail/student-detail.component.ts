import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../components/shared/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  student: Student = {
    _id: '',
    STUDENT_NAME: '',
    STUDENT_EMAIL: '',
    STUDENT_AGE: null,
    STUDENT_PHONE_NUMBER: null,
    STUDENT_COMMUNICATION: '',
    STUDENT_ENGLISH_LEVEL: '',
    STUDENT_START_DATE: null,
    STUDENT_SKILLS_COURSES: '',
    STUDENT_PRESENTATION: '',
    STUDENT_HOME_STUDY: null,
    UPDATED_AT: null };
    isLoadingResults = true;
    title = 'angular-confirmation-dialog';

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.getStudentDetails(this.route.snapshot.params.id);
  }

  getStudentDetails(id) {
    this.api.getStudent(id)
      .subscribe(data => {
        this.student = data;
        console.log(this.student);
        this.isLoadingResults = false;
      });
  }

  deleteStudent(id) {
    this.isLoadingResults = true;
    this.api.deleteStudent(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/students']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.deleteStudent(id);
      }
    });
  }
}
