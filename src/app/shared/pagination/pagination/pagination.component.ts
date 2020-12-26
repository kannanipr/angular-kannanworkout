import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Page, PageData } from '../models/pagination.model';

@Component({
  selector: 'ces-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() pageData: PageData;

  @Output() pageSelect: EventEmitter<number> = new EventEmitter();

  public pageList: Page[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.pageData) {

      if (this.pageData) {

        this._updatePageList();

      }

    }

  }

  private _updatePageList(): void {

    this.pageList = [];

    if (!this.pageData || this.pageData.totalPages <= 1) { return; }

    let count = 0;

    for (let i = this.pageData.pageNumber - 1; i > 0 && count < 2 ; i--) {

      this.pageList.push({
        pageNumber: i,
        label: i.toString()
      });
      count++;

    }

    this.pageList.push({
      pageNumber: this.pageData.pageNumber,
      label: this.pageData.pageNumber.toString(),
      isActive: true
    });

    count++;

    for (let i = this.pageData.pageNumber + 1; count < 5 && i <= this.pageData.totalPages ; i++) {

      this.pageList.push({
        pageNumber: i,
        label: i.toString()
      });
      count++;

    }

    this.pageList.sort((a, b) => a.pageNumber - b.pageNumber);

    this.pageList = [
      ...[
        {
          pageNumber: this.pageData.pageNumber - 1,
          label: 'Previous',
          isDisabled: this.pageData.pageNumber === 1,
        },
      ],
      ...this.pageList,
      ...[
        {
          pageNumber: this.pageData.pageNumber + 1,
          label: 'Next',
          isDisabled: this.pageData.pageNumber === this.pageData.totalPages,
        },
      ],
    ];

  }

}
