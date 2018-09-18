import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() currentPage: number;
  @Input() lastPage: number;
  @Output() page = new EventEmitter<number>();

  preload = false;

  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.preload = false;
  }

  isMaxPage(): boolean {
    return this.currentPage === this.lastPage;
  }

  showMoreItems(): void {
    this.page.emit(this.currentPage + 1);
    this.preload = !this.preload;
  }

  getPreviousItems(): void {
    this.page.emit(this.currentPage - 1);
    this.preload = !this.preload;
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

}


