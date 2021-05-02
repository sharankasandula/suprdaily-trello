import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataService, IItem, IList} from '../services/data.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list: IList;
  @Output() updateListEvent = new EventEmitter<void>();
  @Output() deleteListEvent = new EventEmitter<string>();

  constructor(public dialog?: MatDialog) {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.updateListEvent.emit();
  }

  openDialogue(): void {
    const dialogRef = this.dialog.open(CardFieldsDialogue, {
      width: '250px',
      height: '250px',
      data: {id: '', title: '', description: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.list.items.push(result);
        this.updateListEvent.emit();
      }
    });
  }

  deleteItem(id: string): void {
    const index = this.list.items.findIndex(i => i.id === id);
    this.list.items.splice(index, 1);
    this.updateListEvent.emit();
  }

  deleteList(id: string): void {
    this.deleteListEvent.emit(id);
  }
}


@Component({
  selector: 'app-card-fields-dialogue',
  template: `
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="data.title">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput [(ngModel)]="data.description" placeholder="Enter Task Description"></textarea>
        <input matInput>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button type="submit" [mat-dialog-close]="data" cdkFocusInitial>Add</button>
      <button mat-button (click)="closeDialogue()">Cancel</button>
    </div>`,
})

// tslint:disable-next-line:component-class-suffix
export class CardFieldsDialogue {

  constructor(
    public dialogRef: MatDialogRef<CardFieldsDialogue>,
    @Inject(MAT_DIALOG_DATA) public data: IItem) {
  }

  closeDialogue(): void {
    this.dialogRef.close();
  }

}
