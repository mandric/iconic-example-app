import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, Gender } from '../services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {
  private user: User;
  private readonly Gender = Gender;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.user = this.route.snapshot.data['user'];
  }
}