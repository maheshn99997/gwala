import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConstantProvider {

  baseAppUrl: string = 'https://gwalaserver.herokuapp.com/';

  registerUser: string = 'api/user';

}
