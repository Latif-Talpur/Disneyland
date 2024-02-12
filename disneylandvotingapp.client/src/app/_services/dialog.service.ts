import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from '../_components/notification/message-dialog.component';
import { VoteService } from './vote.service';
import { Observable, take, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private voteService: VoteService) {}

  openMessageDialog(params): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    const dialogRef = this.dialog.open(MessageDialogComponent, dialogConfig);
    
    this.voteService.addVote(params).subscribe();
    this.delay(10000).subscribe();
    
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }
  
  delay(ms: number): Observable<number> {
    return timer(ms).pipe(take(1));
  }
}
