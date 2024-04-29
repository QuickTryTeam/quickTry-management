import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { HomeComponent } from './home/home.component';
import { PendingPaymentComponent } from './menu/pending-payment/pending-payment.component';
import { CustomerService } from './service/customer.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { CustomerDetailComponent } from './menu/customer-detail/customer-detail.component';
import { LecturersListComponent } from './menu/lecturer-menu/lecturers-list/lecturers-list.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { LecturerDetailComponent } from './menu/lecturer-menu/lecturer-detail/lecturer-detail.component';
import { WorkshopListComponent } from './menu/workshop-menu/workshop-list/workshop-list.component';
import { WorkshopDetailComponent } from './menu/workshop-menu/workshop-detail/workshop-detail.component';
import { CertificateComponent } from './report/certificate/certificate.component';
import { IncomingWorkshopsComponent } from './report/incoming-workshops-report/incoming-workshops/incoming-workshops.component';
import { IncomingWorkshopDetailComponent } from './report/incoming-workshops-report/incoming-workshop-detail/incoming-workshop-detail.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { WorkshopManagementComponent } from './menu/workshop-management/workshop-management.component';
import { ModalComponent } from './modal/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    HomeComponent,
    PendingPaymentComponent,
    LoadingComponent,
    LoginComponent,
    CustomerDetailComponent,
    LecturersListComponent,
    LecturerDetailComponent,
    WorkshopListComponent,
    WorkshopDetailComponent,
    CertificateComponent,
    IncomingWorkshopsComponent,
    IncomingWorkshopDetailComponent,
    WorkshopManagementComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MdbModalModule
  ],
  providers: [
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
