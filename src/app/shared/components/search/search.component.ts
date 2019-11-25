import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchTermService } from '~app/store/search-term.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  @Output() searchTerm = new EventEmitter<string>()

  constructor(
    private fb: FormBuilder,
    private searchTermService: SearchTermService,
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      term: ['', Validators.required]
    })

    if (this.searchTermService.searchTerm !== null) {
      this.searchForm.patchValue({term: this.searchTermService.searchTerm})
      this.searchTerm.emit(this.searchForm.value.term)
    }
  }

  onSubmit() {
    const termValue = this.searchForm.value.term as string
    if (termValue) {
      this.searchTermService.searchTerm = termValue
      this.searchTerm.emit(this.searchForm.value.term)
    }
  }
}
