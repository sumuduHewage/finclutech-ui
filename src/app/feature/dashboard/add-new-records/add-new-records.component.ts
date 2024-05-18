import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import moment from 'moment';
import {ApplicationService} from "../../services/application.service";

@Component({
  selector: 'app-add-new-records',
  templateUrl: './add-new-records.component.html',
  styleUrls: ['./add-new-records.component.css']
})
export class AddNewRecordsComponent implements OnInit {
  addNewRecords: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private applicationService:ApplicationService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.intiForm();
  }

  private intiForm(): void {
    this.addNewRecords = this.fb.group({
      businessApplicationId: ['', Validators.required],
      salesAgentFirstName: ['', Validators.required],
      salesAgentLastName: ['', Validators.required],
      salesAgentEmail: ['', [Validators.required, Validators.email]],
      accountType: ['', Validators.required],
      createdDate: [null, Validators.required],
      applicationStatus: ['', Validators.required],
      businessCategory: ['', Validators.required],
      updatedDate: [null, Validators.required],
    });
  }


  saveRecord() :void{
    const formValues = this.addNewRecords.value;
    const formattedCreatedDate = formValues.createdDate
      ? moment(formValues.createdDate).format('YYYY-MM-DDTHH:mm:ss')
      : null;
    const formattedUpdatedDate = formValues.updatedDate
      ? moment(formValues.updatedDate).format('YYYY-MM-DDTHH:mm:ss')
      : null;
    const application = {
      business_application_id: formValues.businessApplicationId,
      sales_agent_first_name: formValues.salesAgentFirstName,
      sales_agent_last_name: formValues.salesAgentLastName,
      sales_agent_email: formValues.salesAgentEmail,
      account_type: formValues.accountType,
      created_at: formattedCreatedDate,
      application_status: formValues.applicationStatus,
      business_category: formValues.businessCategory,
      updated_at: formattedUpdatedDate,
    };

    this.applicationService.createApplication(application).subscribe(response =>{
      if(response){
        this.showSuccess('Item added Successfully')
        this.router.navigate(['/dashboard']);
      }
    },error=>{
      this.showError('There was an error!')
    })
  }

  showError(message: string) {
    this.toastr.error(message, 'Alert!');
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Alert!');
  }
}
