import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContainer,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatTableModule,
    MatDialogContainer
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  message:String = ""
  title:String = ""
  constructor(public dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message = data.ErrorMessage
      this.title = data.MessageTitle
  }

  onClose(): void {
    this.dialogRef.closeAll();
  }
}
