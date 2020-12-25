import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DataService {
  count = 5;
  constructor(private httpclient: HttpClient) {
    //  this.httpclient
    //       .get(
    //         "http://localhost/VS1MiddleWare/authandaccesscontrol/screensaccess?userId=356"
    //       )
    //       .subscribe(x => (this._myData = x));
  }

  getPRItemList() {
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //   observe: 'response' as 'response'
    // }
    // return await this.httpClient.get<PRItemList[]>(this.endpointService.getPRItemListURL + '?prno=' + this.PrNo.value, { observe: 'response' }).toPromise()

    return this.httpclient.get(
      "http://localhost/VS1MiddleWare/authandaccesscontrol/screensaccess?userId=356"
    );
  }
}
