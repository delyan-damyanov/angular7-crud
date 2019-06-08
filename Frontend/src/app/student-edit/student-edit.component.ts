import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  studentForm: FormGroup;
  _id = '';
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
  maxDate = new Date(2019, 6, 31);

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getStudent(this.route.snapshot.params.id);
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

  getStudent(id) {
    this.api.getStudent(id).subscribe(data => {
      this._id = data._id;
      this.studentForm.patchValue({
        STUDENT_NAME: data.STUDENT_NAME,
        STUDENT_EMAIL: data.STUDENT_EMAIL,
        STUDENT_AGE: data.STUDENT_AGE,
        STUDENT_PHONE_NUMBER: data.STUDENT_PHONE_NUMBER,
        STUDENT_COMMUNICATION: data.STUDENT_COMMUNICATION,
        STUDENT_ENGLISH_LEVEL: data.STUDENT_ENGLISH_LEVEL,
        STUDENT_START_DATE: data.STUDENT_START_DATE,
        STUDENT_SKILLS_COURSES: data.STUDENT_SKILLS_COURSES,
        STUDENT_PRESENTATION: data.STUDENT_PRESENTATION,
        STUDENT_HOME_STUDY: data.STUDENT_HOME_STUDY,
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateStudent(this._id, form)
      .subscribe(res => {
          let id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/student-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  productDetails() {
    this.router.navigate(['/student-details', this._id]);
  }
}
