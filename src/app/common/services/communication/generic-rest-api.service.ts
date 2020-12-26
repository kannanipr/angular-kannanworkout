import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { FileInfo, FileResponseModel, PagedList } from './communication.model';
import { SnackbarStateService } from '@shared/snackbar/snackbar-state.service';
import { APP_CONFIG as CONFIG } from '@config/app.config';
import { Attachment } from '@common/models/common.model';

export class GenericRestApiService<T> {

  protected options = {
    responseType: 'json' as const,
  };


  constructor(protected http: HttpClient,
              protected APIBaseUrl: string,
              protected snackbarStateService: SnackbarStateService) {

  }

  /**
   * REST GET
   * URL : base_url/
   */
  public get(page: number = 1, filter?: any, successMessage?: string): Observable<PagedList<T>> {

    const listUrl = `${this.APIBaseUrl}/list/${page}?${this.generateQueryParamsFromFilter(filter)}`;

    return this.http.get<T[]>(listUrl, { observe: 'response'} ).pipe(
      map(res => {

        console.log(res);
        const pageData = res.headers.get('pageData');

        if (successMessage) {

          this.snackbarStateService.showSnackbar({
            message : successMessage,
            type : 'success'
          });

        }

        return {
          ...(pageData && JSON.parse(pageData)),
          list: res.body
        } as PagedList<T>;

      }),
      catchError(error => {

        this.showErrorToast(error);

        console.error(error);
        throw error;

      })
    );

  }

  /**
   * REST GET
   * URL : base_url/{{id}}
   */
  public getById(id: string | number, successMessage?: string): Observable<T> {

    const url = this.APIBaseUrl + '/' + id;

    return this.http.get<T[]>(url, this.options ).pipe(
      map(res => {

        if (successMessage) {

          this.snackbarStateService.showSnackbar({
            message : successMessage,
            type : 'success'
          });

        }

        return (res && res.length) ? res[0] : null;
      }),
      catchError(error => {

        this.showErrorToast(error);
        console.error(error);
        throw error;

      })
    );

  }

  /**
   * REST POST
   * URL : base_url/
   */
  public post(entity: T | any, successMessage?: string): Observable<T> {

    return this.http.post<T[]>(this.APIBaseUrl, entity, this.options ).pipe(
      map((res) => {

        if (successMessage) {

          this.snackbarStateService.showSnackbar({
            message : successMessage,
            type : 'success'
          });

        }
        return (res && res.length) ? res[0] : null;

      }),
      catchError(error => {

        this.showErrorToast(error);
        console.error(error);
        throw error;

      })
    );

  }

  /**
   * REST DELETE
   * URL : base_url/{{id}}
   */
  public delete(id: string | number, successMessage?: string): Observable<any> {

    const url = this.APIBaseUrl + '/' + id;

    return this.http.delete(url, this.options ).pipe(
      map((res) => {

        if (successMessage) {

          this.snackbarStateService.showSnackbar({
            message : successMessage,
            type : 'success'
          });

        }
        return res;

      }),
      catchError(error => {

        this.showErrorToast(error);
        console.error(error);
        throw error;

      })
    );

  }

  /**
   * REST PUT
   * URL : base_url/
   */
  public put(id: string | number, entity: T | any, successMessage?: string, filter?: any): Observable<T> {

    const url = `${this.APIBaseUrl}/${id}?${this.generateQueryParamsFromFilter(filter)}`;

    return this.http.put<T[]>(url, entity, this.options ).pipe(
      map((res) => {

        if (successMessage) {

          this.snackbarStateService.showSnackbar({
            message : successMessage,
            type : 'success'
          });

        }
        return (res && res.length) ? res[0] : null;

      }),
      catchError(error => {

        this.showErrorToast(error);
        console.error(error);
        throw error;

      })
    );

  }

  /**
   * REST PATCH
   * URL : base_url/{{id}}
   */
  public patch(entity: Partial<T> | any, id: string | number, successMessage?: string): Observable<T> {

    const url = this.APIBaseUrl + '/' + id;

    return this.http.patch<T[]>(url, entity, this.options ).pipe(
      map((res) => {

        if (successMessage) {

          this.snackbarStateService.showSnackbar({
            message : successMessage,
            type : 'success'
          });

        }
        return (res && res.length) ? res[0] : null;

      }),
      catchError(error => {

        this.showErrorToast(error);
        console.error(error);
        throw error;

      })
    );

  }

  /**
   * To upload file
   */
  public uploadFile(file: File, data: FileInfo, successMessage?: string): Observable<FileResponseModel> {

    const formData = new FormData();
    const url = CONFIG.BASE_URL + 'api/est/customer/uploadFile';

    formData.append('FilePath', file, file.name);

    Object.keys(data).map(key => {

      if (data[key]) {

        formData.append(key, data[key]);

      }

    });

    return this.http.post<FileResponseModel>(url, formData, this.options ).pipe(
      map((res) => {

        if (successMessage) {

          this.snackbarStateService.showSnackbar({
            message : successMessage,
            type : 'success'
          });

        }
        return res;

      }),
      catchError(error => {

        this.showErrorToast(error);
        console.error(error);
        throw error;

      })
    );

  }

  /**
   * To delete file
   */
  public deleteFile(attachment: Attachment, successMessage?: string): Observable<any> {

    const url = CONFIG.BASE_URL + 'api/est/customer/deleteFile' + attachment.uniqueId;

    const body = {
      FileUniqueId: attachment.uniqueId
    };

    return this.http.delete(url).pipe(
      map((res) => {

        if (successMessage) {

          this.snackbarStateService.showSnackbar({
            message : successMessage,
            type : 'success'
          });

        }
        return res;

      }),
      catchError(error => {

        this.showErrorToast(error);
        console.error(error);
        throw error;

      })
    );

  }

  /**
   * To download file
   */
  public downloadFile(attachment: Attachment, successMessage?: string): Observable<HttpResponse<Blob>> {

    const url = CONFIG.BASE_URL + 'api/est/customer/downloadFile/' + attachment.uniqueId;

    return this.http.get(url, { observe: 'response', responseType: 'blob' } ).pipe(
      map((res) => {

        if (successMessage) {

          this.snackbarStateService.showSnackbar({
            message : successMessage,
            type : 'success'
          });

        }
        return res;

      }),
      catchError(error => {

        this.showErrorToast(error);
        console.error(error);
        throw error;

      })
    );

  }

  /**
   * To generate query params string from filter
   */
  protected generateQueryParamsFromFilter = (filter: any) => filter ?  Object.keys(filter).filter(key => filter[key] !== undefined).map(key => `${key}=${filter[key]}`).join('&') : '';


  public showErrorToast(errorRes: any): void {

    let message = 'Something went wrong';

    try {

      let errorObj;

      if (typeof errorRes.error === 'string') {

        errorObj = JSON.parse(errorRes.error);

      } else {

        errorObj = errorRes.error;

      }

      message = errorObj.message ? errorObj.message : message;

    } catch (e) {

      console.warn(e);

    }
    
    this.snackbarStateService.showSnackbar({
      message,
      type : 'error'
    });

  }


}
