import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, EMPTY, map, Observable, of, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Auth} from "../entities/auth";
import {User} from "../entities/user";
import {Group} from "../entities/group";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "http://localhost:8080/"
  private users = [
    new User("ฅʕ•̫͡•ʔฅ","MarekG@moj.otc"),
    new User("Adolf","TopG1940@bigman.com",69,new Date(),"heselne"),
    new User("Hedviga","Hedviga@kokot.ppc"),
    new User("Asisi","Asisi@kokot.ppc")
  ]
  private loggedUserSubject = new BehaviorSubject(this.username);
  constructor(private http: HttpClient,
              private message: MessageService) { }

  errorHandling(httpError: any): Observable<never>{
    if(httpError instanceof  HttpErrorResponse){
      if(httpError.status==0){
        this.message.error("Server is not aviable")
      }

      if(httpError.status<500){
        this.message.error(httpError.message)
        return EMPTY
      }

      if(httpError.status>=500){
        this.message.error("Server has a serious problem")
      }
    }
    console.log(httpError)
    return EMPTY
  }
  private get token(): string {
    return localStorage.getItem('umToken') || '';
  }
  private set token(value: string) {
    if (value) {
      localStorage.setItem('umToken', value);
    } else {
      localStorage.removeItem('umToken');
    }
  }

  private get username():string{
    return localStorage.getItem("umUsername")||""
  }

  private set username(value:string){
    if(value){
      localStorage.setItem("umUsername",value)
    }else{
      localStorage.removeItem("umUsername")
    }
    this.loggedUserSubject.next(value)
  }

  public loggedUser(): Observable<string> {
    return this.loggedUserSubject.asObservable();
  }

  getUsersSynchronous(): User[]{
    return this.users;
  }
  getLocalUsers():Observable<User[]>{
    return of(this.users);
  }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url+"users")
      .pipe(map(response=>this.cloneUsers(response)),
        catchError(error=>this.errorHandling(error))
      )

  }

  getExtendedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users/' + this.token).pipe(
      map(jsonUsers => this.cloneUsers(jsonUsers)),
      catchError(error=>this.errorHandling(error))
    )
  }
  public getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(this.url + 'group/' + id).pipe(
      map((jsonGroup) => Group.clone(jsonGroup)),
      catchError((error) => this.errorHandling(error)),
    )
  }
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + 'groups' ).pipe(
      map(jsonUsers => jsonUsers.map(jsonUsers=>Group.clone(jsonUsers))),
      catchError(error=>this.errorHandling(error))
    )
  }

  saveUser(user:User): Observable<User>{
    return this.http.post<User>(this.url+"users/"+this.token,user).pipe(
      map(jsonUser=>User.clone(jsonUser)),
      catchError(error=>this.errorHandling(error))
    )
  }

  saveGroup(group:Group):Observable<Group>{
    return this.http.post<Group>(this.url+"groups/"+this.token, group).pipe(
      map(jsonGroup=>Group.clone(jsonGroup)),
      catchError(error=>this.errorHandling(error))
    )
  }
  private cloneUsers(users:User[]):User[]{
    return users.map(user=>User.clone(user))
  }

  deleteUser(userId:number):Observable<boolean>{
    return this.http.delete(this.url + "user/"+userId+ "/" +this.token)
      .pipe(map(()=>true),
        catchError(error=>this.errorHandling(error))
      )
  }
  login(auth:Auth):Observable<boolean> {
    return this.http.post(this.url + "login", auth,{responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        this.loggedUserSubject.next(auth.name);
        return true;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return of(false);
          }
        }
        return throwError(() => error)
      }),
      catchError(error=>this.errorHandling(error))
    )
  }


  logout() {
    this.token = '';
    this.loggedUserSubject.next('');
  }
}
