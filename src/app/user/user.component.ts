import { Component, OnInit, Input } from '@angular/core';
import { User, Gender, UsersService } from '../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user: User;

  public readonly Gender = Gender;

  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit() {}

  onUserDelete(ev: MouseEvent) {
    ev.preventDefault();
    return this.usersService.deleteUser(this.user.id);
  }
}
