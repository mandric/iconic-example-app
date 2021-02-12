import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Gender, User, UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  private user: User;
  private userForm: FormGroup;
  public readonly Gender = Gender;


  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    if (this.user) {
      this.userForm = this.formBuilder.group({
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        sex: [this.user.sex, Validators.required],
        birthday: [this.user.birthday, Validators.required]
      });
    } else {
      this.userForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        sex: ['', Validators.required],
        birthday: ['', Validators.required]
      });
    }
  }

  routeToUserView(user = this.user) {
    this.router.navigate(['/user', user.id]);
  }

  routeToHome() {
    this.router.navigate(['/home']);
  }

  onError(e) {
    console.error('update failed', e);
    alert('update failed');
  }

  onSubmit() {
    const data = Object.assign(
      this.userForm.value,
      this.user ? {id: this.user.id} : {}
    );
    if (this.user) {
      this.usersService.updateUser(data)
        .then(() => this.routeToUserView())
        .catch(this.onError)
    } else {
      this.usersService.createUser(data)
        .then(ret => this.routeToUserView(ret[0]))
        .catch(this.onError)
    }
  }

  onCancel() {
    if (this.user) {
      this.routeToUserView();
    } else {
      this.routeToHome();
    }
  }
}