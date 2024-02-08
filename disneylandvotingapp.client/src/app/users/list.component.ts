import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../_services';
import { UserDataSource } from '../_services/user.datasource';

@Component({
    styleUrls: ['./list.component.css'],
    templateUrl: './list.component.html' 
  })
export class ListComponent implements OnInit {
    columnsToDisplay = ["Title","FirstName","LastName", "Email", "Role", 'Action'];

    users: UserDataSource;

    constructor(private userService: UserService) {
        const users$ = this.userService.getAll();
        this.users = new UserDataSource(users$);
    }
    ngOnInit(): void {
    }
}