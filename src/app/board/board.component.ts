import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {IList, DataService} from '../services/data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  lists: IList[] = [];

  constructor(private listData: DataService, public dialog?: MatDialog) {
  }

  ngOnInit(): void {
    this.lists = this.listData.getLists();
  }

  addNewListDialogue(): void {
    const dialogRef = this.dialog.open(AddNewListDialogue, {
      width: '250px',
      height: '150px',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(listName => {
      if (listName) {
        this.lists = this.listData.addList(listName.name);
      }
    });
  }


  updateList(): void {
    this.lists = this.listData.updateLists(this.lists);
  }

  deleteList(id: string): void {
    const index = this.lists.findIndex(i => i.id === id);
    this.lists.splice(index, 1);
    this.listData.updateLists(this.lists);
  }
}

@Component({
  selector: 'app-card-fields-dialogue',
  template: `
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>List Name</mat-label>
        <input matInput placeholder="Enter name of the list" [(ngModel)]="data.name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button type="submit" [mat-dialog-close]="data" cdkFocusInitial>Add</button>
      <button mat-button (click)="closeDialogue()">Cancel</button>
    </div>`,
})

// tslint:disable-next-line:component-class-suffix
export class AddNewListDialogue {

  constructor(
    public dialogRef: MatDialogRef<AddNewListDialogue>,
    @Inject(MAT_DIALOG_DATA) public data: IList) {
  }

  closeDialogue(): void {
    this.dialogRef.close();
  }

}

