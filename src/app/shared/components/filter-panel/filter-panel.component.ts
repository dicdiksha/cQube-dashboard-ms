import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit, OnChanges {

  @Input() filters: any[] = [];
  @Input() colSize: string = "md:col-span-3 xs:col-span-12 xmd:col-span-4 4k:col-span-2";
  @Input() resetOthers: boolean = false;
  @Input() isMulti: boolean = false;
  @Input() hideClearButton: boolean = true; // Default value set to true

  @Output() filtersUpdated = new EventEmitter<any>();
  @Output() filterIndexUpdated = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isMulti) {
      this.filters.forEach(filter => {
        console.log('this',this.filters);
        filter.value = [filter.options[0]?.value]; // Set the first option as an array
      });
      this.hideClearButton=false;
    }
  }

  onSelectOption(event: any, ind: number, selectRef: any): void {
    if (this.resetOthers) {
      for (let i = ind + 1; i < this.filters.length; i++) {
        this.filters[i].value = null;
      }
    }

    this.filtersUpdated.emit(this.filters);
    this.filterIndexUpdated.emit(ind);

    // Close the dropdown after selecting an option
    if (selectRef.isOpen) {
      selectRef.close();
    }
  }

  clearFilters(): void {
    this.filters.forEach(filter => {
      filter.value = [filter.options[0]?.value]; // Set the first option as an array
    });

    this.filtersUpdated.emit(this.filters);
  }

  isFilterMulti(): boolean {
    return this.isMulti;
  }

  convertNativeMetricLabelToReadable(label: string): string {
    if (typeof label !== 'string') {
      return label;
    }
    
    return label.split('_').map(word => word[0]?.toUpperCase() + word?.substring(1).toLowerCase()).join(' ')
  }
}
