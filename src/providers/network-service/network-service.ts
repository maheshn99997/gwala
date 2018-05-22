import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';

export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable()
export class NetworkServiceProvider {

  private previousStatus;
  internetStatus: boolean = false;

  constructor(
    private network: Network
  ) {
    this.previousStatus = ConnectionStatusEnum.Online;
      if (this.network.type === 'none') {
        this.internetStatus = false;
      }
      this.network.onDisconnect().subscribe(() => {
        this.internetStatus = false;
        console.log('you are offline');      
      });
  
      this.network.onConnect().subscribe(() => {
        this.internetStatus = true;
        console.log('you are online');      
      });
  }

  isOnline(): boolean {
    if(this.internetStatus){
      console.log('you are online...');      
    }else{
      console.log('you are ofline...');      
    }
		return this.internetStatus;
	}
}
