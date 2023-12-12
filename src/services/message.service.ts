import { Injectable } from '@angular/core';
import {Observable,Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  msg = new Subject<Message>()
  constructor() { }

  getMessage(): Observable<Message>{
    return this.msg.asObservable()
  }

  error(message:string){
    this.msg.next({message,type:"error"})
  }

  success(message:string){
    this.msg.next({message,type:"success"})
  }
}
export interface Message{
  message:string
  type:"error"|"success"
}
