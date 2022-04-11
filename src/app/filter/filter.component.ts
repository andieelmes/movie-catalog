import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { Genre } from 'src/models/movie';

import locationParams from 'src/helpers/location-params';

interface Params {
  query?: string,
  genres?: Genre['id'][],
};

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

  params:Params = {};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.setValuesFromParams();
    this.setDefaultColumns();
    this.handleSearchQueryChange();
    this.handleGenreSelect();
    this.handleColumnSelect();
  }

  setValuesFromParams(): void {
    this.route.queryParams.subscribe((params) => {
      const { query, genres } = params;

      if (query) {
        this.params.query = query;
        this.searchQueryInput.setValue(query);
        this.searchQueryChange.emit(query);
      }

      try {
        const parsedGenres = genres?.split(',').map(Number);
        this.params.genres = parsedGenres;
        this.genresSelect.setValue(parsedGenres);
        this.genreSelect.emit(parsedGenres);
      } catch (error) {
        console.log(`params parse error: ${error}`);
      }
    });
  }

  updateParamsFromValues(): void {
    this.location.go('/', locationParams.combine({ ...this.params }));
  }

  setDefaultColumns(): void {
    this.columnsSelect.setValue(this.displayedColumns);
  }

  handleSearchQueryChange() {
    this.searchQueryInput.valueChanges.pipe(
      tap((query) => {
        this.params.query = query;
        this.updateParamsFromValues();
      }),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(data => { this.searchQueryChange.emit(data) });
  }

  handleGenreSelect() {
    this.genresSelect.valueChanges.pipe(
      tap((genres) => {
        this.params.genres = genres;
        this.updateParamsFromValues();
      }),
    ).subscribe(data => this.genreSelect.emit(data));
  }

  handleColumnSelect() {
    this.columnsSelect.valueChanges.subscribe(data => {
      this.columnSelect.emit(data);
    });
  }
}
