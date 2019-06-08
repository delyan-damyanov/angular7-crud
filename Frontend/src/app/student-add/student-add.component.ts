import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {

  studentForm: FormGroup;
  STUDENT_NAME = '';
  STUDENT_EMAIL = '';
  STUDENT_AGE: number = null;
  STUDENT_PHONE_NUMBER: string = null;
  STUDENT_COMMUNICATION = '';
  STUDENT_ENGLISH_LEVEL = '';
  STUDENT_START_DATE: Date = null;
  STUDENT_SKILLS_COURSES = '';
  STUDENT_PRESENTATION = '';
  STUDENT_HOME_STUDY: boolean = null;
  UPDATED_AT: Date = null;
  isLoadingResults = false;

  minDate = new Date(2019, 6, 1);
  maxDate = new Date(2019, 7, 31);

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      STUDENT_NAME : [null, [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]],
      STUDENT_EMAIL : [null, [Validators.required, Validators.email]],
      STUDENT_AGE : [null, [Validators.required, Validators.min(18)]],
      STUDENT_PHONE_NUMBER : [null, [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]+')]],
      STUDENT_COMMUNICATION : [null, Validators.required],
      STUDENT_ENGLISH_LEVEL : [null, Validators.required],
      STUDENT_START_DATE : [null, Validators.required],
      STUDENT_SKILLS_COURSES : [null, Validators.required],
      STUDENT_PRESENTATION : [null, Validators.required],
      STUDENT_HOME_STUDY : [null],
      UPDATED_AT : [new Date(), Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addStudent(form)
      .subscribe(res => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/student-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
