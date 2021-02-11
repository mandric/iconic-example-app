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
    this.userForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      sex: [this.user.sex, Validators.required],
      birthday: [this.user.birthday, Validators.required]
    });
  }

  routeToUserView() {
    this.router.navigate(['/user', this.user.id]);
  }

  onSubmit() {
    const data = Object.assign(this.userForm.value, {id: this.user.id});
    this.usersService.updateUser(data)
      .then(() => this.routeToUserView())
      .catch(e => {
        console.error('update failed', e);
        alert('update failed');
      })
  }

  onCancel() {
    this.routeToUserView();
  }
}