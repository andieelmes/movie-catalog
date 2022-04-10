import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Genre } from '../movie';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() searchQueryChange = new EventEmitter<string>();
  searchQueryInput = new FormControl();

  @Input() genres: Genre[] = [];
  @Output() genreSelect = new EventEmitter<number []>();
  genresSelect = new FormControl();

  @Input() columns: string[] = [];
  @Input() displayedColumns: string[] = [];
  @Output() columnSelect = new EventEmitter<string []>();
  columnsSelect = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.setDefaultColumns();
    this.handleSearchQueryChange();
    this.handleGenreSelect();
    this.handleColumnSelect();
  }

  setDefaultColumns(): void {
    this.columnsSelect.setValue(this.displayedColumns);
  }

  handleSearchQueryChange() {
    this.searchQueryInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(data => { this.searchQueryChange.emit(data) });
  }

  handleGenreSelect() {
    this.genresSelect.valueChanges.subscribe(data => {
      this.genreSelect.emit(data);
    });
  }

  handleColumnSelect() {
    this.columnsSelect.valueChanges.subscribe(data => {
      this.columnSelect.emit(data);
    });
  }
}
