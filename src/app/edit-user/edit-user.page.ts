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
  public user: User;
  private userForm: FormGroup;
  public readonly Gender = Gender;


  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = this.usersService.getUserById(id);
    this.userForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      sex: [this.user.sex, Validators.required],
      birthday: [this.user.birthday?.toISOString(), Validators.required]
    });
  }

  routeToUserView() {
    this.router.navigate(['/user', this.user.id]);
  }

  onSubmit() {
    const data = Object.assign(this.userForm.value, {id: this.user.id});
    if (this.usersService.updateUser(data)) {
      this.routeToUserView();
    } else {
      alert('update failed');
    };
  }

  onCancel() {
    this.routeToUserView();
  }
}