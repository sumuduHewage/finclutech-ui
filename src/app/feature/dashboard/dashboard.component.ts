import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Application} from "../interfaces/Application";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApplicationService} from "../services/application.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id','business_application_id', 'sales_agent_first_name', 'sales_agent_last_name', 'sales_agent_email',
    'account_type', 'created_at', 'application_status', 'business_category', 'updated_at', 'delete'];
  dataSource = new MatTableDataSource<Application>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort?: MatSort;
  searchForm: FormGroup;

  constructor(private applicationService: ApplicationService,
              private fb: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.intiForm();

    this.applicationService.getAllApplications().subscribe(applications => {
      this.dataSource.data = applications;
      this.dataSource.paginator = this.paginator;
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  private intiForm(): void {
    this.searchForm = this.fb.group({
      searchText: [''],
      createdDate: [''],
      updatedDate: ['']
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDateFilter(): void {

  }

  search(): void {
    const {searchText, createdAfter, updatedBefore} = this.searchForm.value;
    this.applicationService.searchByTextFieldNadCreatedUpdatedDates(searchText, createdAfter, updatedBefore).subscribe(applications => {
      this.dataSource.data = applications;
      this.dataSource.paginator = this.paginator;
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  deleteRecord(id: number): void {
    if (confirm("Are you sure to delete the record?")) {
      this.applicationService.deleteApplication(id).subscribe(response => {
          this.dataSource.data = this.dataSource.data.filter(app => app.business_application_id !== id);
          this.showSuccess('Item deleted Successfully')
        },
        error => {
          this.showError('There was an error!')
        })
    }
  }

  showError(message: string) {
    this.toastr.error(message, 'Alert!');
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Alert!');
  }
}
