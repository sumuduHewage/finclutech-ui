import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-new-records',
  templateUrl: './add-new-records.component.html',
  styleUrls: ['./add-new-records.component.css']
})
export class AddNewRecordsComponent implements OnInit {
  addNewRecords: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.intiForm();
  }

  private intiForm(): void {
    this.addNewRecords = this.fb.group({
      businessApplicationId: [''],
      salesAgentFirstName: [''],
      salesAgentLastName: [''],
      salesAgentEmail: [''],
      accountType: [''],
      applicationStatus: [''],
      businessCategory: [''],
      createdDate: [''],
      updatedDate: ['']
    });
  }


  saveRecord() {

  }
}
