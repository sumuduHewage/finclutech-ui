import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Application} from "../interfaces/Application";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApplicationService} from "../services/application.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  displayedColumns: string[] = ['business_application_id', 'sales_agent_first_name', 'sales_agent_last_name', 'sales_agent_email', 'account_type', 'created_at', 'application_status', 'business_category', 'updated_at'];
  dataSource = new MatTableDataSource<Application>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.applicationService.getAllApplications().subscribe(applications => {
      this.dataSource.data = applications;
      this.dataSource.paginator = this.paginator;
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDateFilter() {

  }
}
