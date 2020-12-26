import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs  } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor() { }

  public downloadFile(res: HttpResponse<Blob>, fileName: string): void {

    saveAs(res.body, fileName);

  }
}
