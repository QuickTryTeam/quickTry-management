import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PendingPaymentComponent } from './menu/pending-payment/pending-payment.component';
import { CustomerDetailComponent } from './menu/customer-detail/customer-detail.component';
import { LecturersListComponent } from './menu/lecturer-menu/lecturers-list/lecturers-list.component';
import { LecturerDetailComponent } from './menu/lecturer-menu/lecturer-detail/lecturer-detail.component';
import { WorkshopListComponent } from './menu/workshop-menu/workshop-list/workshop-list.component';
import { WorkshopDetailComponent } from './menu/workshop-menu/workshop-detail/workshop-detail.component';
import { CertificateComponent } from './report/certificate/certificate.component';
import { IncomingWorkshopsComponent } from './report/incoming-workshops-report/incoming-workshops/incoming-workshops.component';
import { IncomingWorkshopDetailComponent } from './report/incoming-workshops-report/incoming-workshop-detail/incoming-workshop-detail.component';
import { WorkshopManagementComponent } from './menu/workshop-management/workshop-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {   
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { 
        path: 'customers/all', 
        component: CustomersListComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'customers/pending', 
        component: PendingPaymentComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'customers/:id', 
        component: CustomerDetailComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'lecturers/all', 
        component: LecturersListComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'lecturers/:id', 
        component: LecturerDetailComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'workshops', 
        component: WorkshopListComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'workshop/:workshopId', 
        component: WorkshopDetailComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'workshop-management', 
        component: WorkshopManagementComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'report/incoming-workshops', 
        component: IncomingWorkshopsComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'report/incoming-workshop/:workshopDetailId', 
        component: IncomingWorkshopDetailComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'report/certificate', 
        component: CertificateComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
