import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../_services';
import { User } from '../../_models/user';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    styleUrls: ['./list.characters.component.css'],
    templateUrl: './list.characters.component.html'
  })
export class ListCharactersComponent implements OnInit {
    columnsToDisplay = ["Title","FirstName","LastName", "Email", "Role", 'Action'];
    UserList: User[];
    dataSource = new MatTableDataSource<User>();
      resultsLength: unknown;

    constructor(private userService: UserService) {
        const users$ = this.userService.getAll();
    }
    ngOnInit(): void {
        this.userService.getAll().subscribe(
          (data: User[]) => {
            this.UserList = data
            this.resultsLength= this.UserList.length;
            this.dataSource = new MatTableDataSource<any>(this.UserList);
          }
        );
    }
}

