import { Injectable } from '@angular/core';
import {EMPTY, Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ErrorComponent} from "../app/error/error.component";
import {coerceStringArray} from "@angular/cdk/coercion";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private dialog: MatDialog) { }


  errorHandling(httpError: any){
    if(httpError instanceof  HttpErrorResponse){
      if(httpError.status==0){

        this.openDialog("Server is not aviable")
        return EMPTY
      }

      else if(httpError.status<500){
        this.openDialog(httpError.message)
        return EMPTY
      }
      else if(httpError.status==401){
        this.openDialog("Please log in again")
        return EMPTY
      }
      else if(httpError.status>=500){

        this.openDialog("Server has a serious problem")
        return EMPTY
      }
    }

    this.openDialog(httpError)
    return EMPTY
  }

  openDialog(error:String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {ErrorMessage:error,MessageTitle:"error"}
    this.dialog.closeAll()
    this.dialog.open(ErrorComponent, dialogConfig); // Open your dialog
  }


}
