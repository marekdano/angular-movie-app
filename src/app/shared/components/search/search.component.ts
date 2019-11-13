import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  @Output() searchTerm = new EventEmitter<string>()

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      term: ['', Validators.required]
    })
  }

  onSubmit() {
    this.searchTerm.emit(this.searchForm.value.term);
  }
}
