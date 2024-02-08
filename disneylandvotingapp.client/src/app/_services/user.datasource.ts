import { MatTableDataSource } from "@angular/material/table";
import { Observable, Subscription } from "rxjs";
import { User } from "../_models/user";

export class UserDataSource extends MatTableDataSource<User> {
  private transactions: User[] = [];

  private transactions$: Subscription;

  constructor(transactions: Observable<User>) {
    super();
    this.transactions$ = transactions.subscribe(transactionList => {
      this.transactions.push(transactionList);
      this.data = this.transactions;
    });
  }

  override disconnect() {
    this.transactions$.unsubscribe();
    super.disconnect();
  }
}