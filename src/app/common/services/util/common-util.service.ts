import { Injectable } from '@angular/core';
import { UserAccessData } from 'src/app/auth/models/auth.models';
import { COMMON_CONST } from '../../constants/common.contant';
import { statusAction } from '../../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {

  constructor() { }

  public getStatusActions(
    userAccessData: UserAccessData,
    currentstatus: number,
    type: 'RFQ' | 'ESTIMATION' | 'QUOTATION' | 'CUSTOMERORDER'
  ): statusAction[] {

    switch (type) {
      case 'RFQ': return this._getRfqStatusActions(userAccessData, currentstatus);
      case 'ESTIMATION': return this._getEstimationStatusActions(userAccessData, currentstatus);
      case 'QUOTATION': return this._getQuotationStatusActions(userAccessData, currentstatus);
      case 'CUSTOMERORDER': return this._getCustomerOrderStatusActions(userAccessData, currentstatus);
      default: return [];
    }

  }

  private _getEstimationStatusActions(userAccessData: UserAccessData, currentstatus: number): statusAction[] {

    let actions: statusAction[] = [];

    if (userAccessData.accesslevel_id > COMMON_CONST.ACCESS_LEVELS.MODIFY) {

      if (currentstatus === COMMON_CONST.COMMON_STATUSES.PREPARED) {

        actions = [
          {
            label: 'Cancel',
            statusId: COMMON_CONST.COMMON_STATUSES.CANCELLED,
            buttonClass: 'btn-warning'
          },
          {
            label: 'Endorse',
            statusId: COMMON_CONST.COMMON_STATUSES.ENDORSED,
            buttonClass: 'btn-info'
          }
        ];

      } else if (currentstatus === COMMON_CONST.COMMON_STATUSES.ENDORSED
        && userAccessData.accesslevel_id >= COMMON_CONST.ACCESS_LEVELS.APPROVAL_OR_CANCEL) {

        actions = [
          {
            label: 'Cancel',
            statusId: COMMON_CONST.COMMON_STATUSES.CANCELLED,
            buttonClass: 'btn-warning'
          },
          {
            label: 'Approve',
            statusId: COMMON_CONST.COMMON_STATUSES.APPROVED,
            buttonClass: 'btn-success'
          }
        ];

      } else if (userAccessData.accesslevel_id === COMMON_CONST.ACCESS_LEVELS.FULL_ACCESS) {

        if (currentstatus === COMMON_CONST.COMMON_STATUSES.APPROVED) {

          actions = [
            {
              label: 'Cancel',
              statusId: COMMON_CONST.COMMON_STATUSES.CANCELLED,
              buttonClass: 'btn-warning'
            },
            {
              label: 'Admin Approve',
              statusId: COMMON_CONST.COMMON_STATUSES.ADMIN_APPROVED,
              buttonClass: 'btn-success'
            }
          ];

        }

        if (currentstatus === COMMON_CONST.COMMON_STATUSES.ADMIN_APPROVED) {

          actions = [
            {
              label: 'Revise',
              statusId: COMMON_CONST.COMMON_STATUSES.REVISED,
              buttonClass: 'btn-info'
            }
          ];

        }

      }

    }

    return actions;

  }

  private _getCustomerOrderStatusActions(userAccessData: UserAccessData, currentstatus: number): statusAction[] {

    let actions: statusAction[] = [];

    if (userAccessData.accesslevel_id > COMMON_CONST.ACCESS_LEVELS.MODIFY) {

      if (currentstatus === COMMON_CONST.COMMON_STATUSES.PREPARED) {

        actions = [
          {
            label: 'Cancel',
            statusId: COMMON_CONST.COMMON_STATUSES.CANCELLED,
            buttonClass: 'btn-warning'
          },
          {
            label: 'Endorse',
            statusId: COMMON_CONST.COMMON_STATUSES.ENDORSED,
            buttonClass: 'btn-info'
          }
        ];

      } else if (currentstatus === COMMON_CONST.COMMON_STATUSES.ENDORSED
        && userAccessData.accesslevel_id >= COMMON_CONST.ACCESS_LEVELS.APPROVAL_OR_CANCEL) {

        actions = [
          {
            label: 'Cancel',
            statusId: COMMON_CONST.COMMON_STATUSES.CANCELLED,
            buttonClass: 'btn-warning'
          },
          {
            label: 'Approve',
            statusId: COMMON_CONST.COMMON_STATUSES.APPROVED,
            buttonClass: 'btn-success'
          }
        ];

      } else if (userAccessData.accesslevel_id === COMMON_CONST.ACCESS_LEVELS.FULL_ACCESS) {

        if (currentstatus === COMMON_CONST.COMMON_STATUSES.APPROVED) {

          actions = [
            {
              label: 'Revise',
              statusId: COMMON_CONST.COMMON_STATUSES.REVISED,
              buttonClass: 'btn-info'
            }
          ];

        }

      }

    }

    return actions;

  }

  private _getRfqStatusActions(userAccessData: UserAccessData, currentstatus: number): statusAction[] {

    let actions: statusAction[] = [];

    if (userAccessData.accesslevel_id > COMMON_CONST.ACCESS_LEVELS.MODIFY) {

      if (currentstatus === COMMON_CONST.COMMON_STATUSES.PREPARED) {

        actions = [
          {
            label: 'Cancel',
            statusId: COMMON_CONST.COMMON_STATUSES.CANCELLED,
            buttonClass: 'btn-warning'
          },
          {
            label: 'Endorse',
            statusId: COMMON_CONST.COMMON_STATUSES.ENDORSED,
            buttonClass: 'btn-info'
          }
        ];

      } else if (currentstatus === COMMON_CONST.COMMON_STATUSES.ENDORSED
        && userAccessData.accesslevel_id >= COMMON_CONST.ACCESS_LEVELS.APPROVAL_OR_CANCEL) {

        actions = [
          {
            label: 'Cancel',
            statusId: COMMON_CONST.COMMON_STATUSES.CANCELLED,
            buttonClass: 'btn-warning'
          },
          {
            label: 'Approve',
            statusId: COMMON_CONST.COMMON_STATUSES.APPROVED,
            buttonClass: 'btn-success'
          }
        ];

      }

    }

    return actions;

  }

  private _getQuotationStatusActions(userAccessData: UserAccessData, currentstatus: number): statusAction[] {

    let actions: statusAction[] = [];

    if (userAccessData.accesslevel_id > COMMON_CONST.ACCESS_LEVELS.MODIFY) {

      if (currentstatus === COMMON_CONST.COMMON_STATUSES.PREPARED) {

        actions = [
          {
            label: 'Cancel',
            statusId: COMMON_CONST.COMMON_STATUSES.CANCELLED,
            buttonClass: 'btn-warning'
          },
          {
            label: 'Endorse',
            statusId: COMMON_CONST.COMMON_STATUSES.ENDORSED,
            buttonClass: 'btn-info'
          }
        ];

      } else if (currentstatus === COMMON_CONST.COMMON_STATUSES.ENDORSED
        && userAccessData.accesslevel_id >= COMMON_CONST.ACCESS_LEVELS.APPROVAL_OR_CANCEL) {

        actions = [
          {
            label: 'Cancel',
            statusId: COMMON_CONST.COMMON_STATUSES.CANCELLED,
            buttonClass: 'btn-warning'
          },
          {
            label: 'Approve',
            statusId: COMMON_CONST.COMMON_STATUSES.APPROVED,
            buttonClass: 'btn-success'
          }
        ];

      }

    }

    return actions;

  }

}
