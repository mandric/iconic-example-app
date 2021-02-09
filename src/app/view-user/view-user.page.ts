import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService, User, Gender } from '../services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {
  private user: User;
  private readonly Gender = Gender;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.user = this.usersService.getUserById(id);
  }
}