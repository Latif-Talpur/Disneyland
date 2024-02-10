import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../_services';
import { User } from '../../_models/user';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
    styleUrls: ['./list.component.css'],
    templateUrl: './list.component.html'
  })
export class ListComponent implements OnInit {
    columnsToDisplay = ["Title","FirstName","LastName", "Email", "Role", 'Action'];
    UserList: User[];
    dataSource = new MatTableDataSource<User>();
    resultsLength: number;
    users$!: Observable<User[]>;
    private searchTerms = new Subject<string>();

    constructor(private userService: UserService) {
    }
    ngOnInit(): void {
        this.userService.getAll().subscribe(
          (data: User[]) => {
            this.UserList = data
            this.resultsLength= this.UserList.length;
            this.dataSource = new MatTableDataSource<any>(this.UserList);
          }
        );
        this.users$ = this.searchTerms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term: string) => this.userService.searchUsers(term)),
        );
    }
  search(term: string): void {
    this.searchTerms.next(term);
  }
}

