import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsComponent } from './students/students.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentEditComponent } from './student-edit/student-edit.component';

const routes: Routes = [
  {
    path: 'students',
    component: StudentsComponent,
    data: { title: 'List of Students' }
  },
  {
    path: 'student-details/:id',
    component: StudentDetailComponent,
    data: { title: 'Student Details' }
  },
  {
    path: 'student-add',
    component: StudentAddComponent,
    data: { title: 'Add Student' }
  },
  {
    path: 'student-edit/:id',
    component: StudentEditComponent,
    data: { title: 'Edit Student' }
  },
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
