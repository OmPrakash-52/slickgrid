import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Column, GridOption, Pagination } from 'angular-slickgrid';
const defaultPageSize=5;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];
  title = 'slickgrid-t';
  totalAngularPackages: any;

constructor(private http:HttpClient){this.prepareGrid();}

paginationOptions: Pagination = {
  pageSizes: [5, 10],
  pageSize: defaultPageSize,
  totalItems: 0
};


ngOnInit(){
  this.apicall();
  
}

  apicall() {
    this.http.get<any>('https://jsonplaceholder.typicode.com/posts').subscribe(res => {
        this.totalAngularPackages = res;
        console.log("123",res); 
        this.prepareGrid();
    })  
      
  }

  prepareGrid() {
    this.columnDefinitions = [
      { id: 'userId', name: 'userId', field: 'userId', sortable: true },
      { id: 'id', name: 'id', field: 'id', sortable: true },
      { id: 'title', name: 'Title', field: 'title', sortable: true },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true,
      enablePagination: true,
      enableCellNavigation: true,
      enableCheckboxSelector: true,
      enableRowSelection: true,
      multiSelect: false,
      enableGridMenu: true,
      gridMenu: {
        iconClearAllFiltersCommand: 'fa fa-filter text-danger',
        iconClearAllSortingCommand: 'fa fa-unsorted text-danger',
        iconExportCsvCommand: 'fa fa-download',
        iconExportTextDelimitedCommand: 'fa fa-download',
        iconRefreshDatasetCommand: 'fa fa-refresh',
        iconToggleFilterCommand: 'fa fa-random',
      },
      pagination: {
        pageSizes: [5, 10],
        pageSize: defaultPageSize,
        totalItems: 0
      },
      presets: {
        sorters: [
          { columnId: 'id', direction: 'ASC' }
        ],
        pagination: { pageNumber: 0, pageSize: defaultPageSize }
      },

    };

    this.dataset=this.totalAngularPackages
    console.log("125",this.dataset)
  }
}
