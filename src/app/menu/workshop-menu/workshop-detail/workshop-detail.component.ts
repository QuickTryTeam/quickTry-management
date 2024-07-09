import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from '../../../service/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigateService } from '../../../utilities/navigate.service';
import Swal from 'sweetalert2';
import { WorkshopService } from '../../../service/workshop.service';
import { UpdateWorkshop, UpdateWorkshopDetail, Workshop, WorkshopDetail } from '../../../interface/workshop';
import { DatetimeService } from '../../../utilities/datetime.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { UuidService } from '../../../service/uuid.service';
import { LecturerService } from '../../../service/lecturer.service';
import { Lecturer, SearchLecturer } from '../../../interface/lecturer';

@Component({
  selector: 'app-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrl: './workshop-detail.component.css'
})
export class WorkshopDetailComponent {
  workshopList!: Workshop[]
  workshop!: Workshop
  role!: string | null;
  updateWorkshop: UpdateWorkshop = {
    workshopId: '',
    workshopName: '',
    workshopType: '',
    workshopCategory: '',
    workshopDetail: []
  }
  bsConfig = {
    dateInputFormat: 'dddd, D MMMM YYYY'
  }
  lecturers!: Lecturer[];
  searchLecturer: SearchLecturer = {
    career: '',
    nickname: ''
  }
  lecturerMap: { [key: string]: string } = {};
  param: string = ''

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private workshopService: WorkshopService,
    public navigateService: NavigateService,
    private uuidService: UuidService,
    private datetimeService: DatetimeService,
    private lecturerService: LecturerService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loadingService.show();
    this.role = localStorage.getItem('role');

    let requestsCompleted = 0;
    const handleRequestCompletion = () => {
        requestsCompleted++;
        if (requestsCompleted === 2) {
            this.loadingService.hide();
        }
    };

    this.route.params.subscribe(params => {
      this.param = params['workshopId']
      if (this.param !== "new") {
        this.workshopService.getWorkshopAndDetail(params['workshopId']).subscribe((res) => {
          this.workshopList = res.data;
          this.workshop = this.workshopList[0]
          this.updateWorkshop.workshopId = this.workshop.workshop_id
          this.updateWorkshop.workshopName = this.workshop.workshop_name
          this.updateWorkshop.workshopType = this.workshop.workshop_type
          this.workshop.workshop_detail_list.forEach(workshop => {
            workshop.workshop_date_format = new Date(workshop.workshop_date);
          });
          handleRequestCompletion();
        })
      } else {
        let workshop: Workshop = {
          workshop_id: '',
          workshop_name: '',
          workshop_type: '',
          sum_customers: 0,
          latest_workshop_date: '',
          latest_workshop_date_format: '',
          workshop_category: 'live_online',
          workshop_detail_list: []
        }
        this.workshop = workshop
        handleRequestCompletion();
      }

      this.lecturerService.findAllLecturers(this.searchLecturer).subscribe((res) => {
        this.lecturers = res.data
        this.lecturers.forEach(item => {
          this.lecturerMap[item.lecturer_id] = `${item.name_thai} (${item.nickname})`;
          item.name_thai = `${item.name_thai} (${item.nickname})`;
        });
        handleRequestCompletion();
      })
    });
  }

  onSubmitSave() {
    this.updateWorkshop.workshopId = this.workshop.workshop_id
    this.updateWorkshop.workshopName = this.workshop.workshop_name
    this.updateWorkshop.workshopType = this.workshop.workshop_type
    this.updateWorkshop.workshopCategory = this.workshop.workshop_category

    if (this.updateWorkshop.workshopName == '' || this.updateWorkshop.workshopType === '' || this.updateWorkshop.workshopDetail.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Missing mandatory fields'
      })
    } else {
      this.loadingService.show();
      if (this.updateWorkshop.workshopDetail) {
        this.updateWorkshop.workshopDetail.forEach( workshopDetail => {
          if (workshopDetail.workshopDate) {
            console.log(workshopDetail.workshopDate)
            workshopDetail.workshopDate = new Date(Date.parse(workshopDetail.workshopDate)).toLocaleDateString('en-CA');
            console.log(workshopDetail.workshopDate)
          } 
        })
      }
      console.log(this.updateWorkshop)
      this.workshopService.updateWorkshop(this.updateWorkshop).subscribe((res) => {
      this.loadingService.hide();
      if (res && res.status === 200) {
        this.updateWorkshop.workshopDetail = []
        if (this.param !== "new") {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Save success'
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              this.ngOnInit();
            }
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Save success'
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              this.router.navigate(['/workshops']);
            }
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Save failed'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.ngOnInit();
          }
        });
      }
    });
    }
  }

  onInputChange<T extends keyof UpdateWorkshopDetail>(fieldName: T, value: UpdateWorkshopDetail[T], workshop_detail_id: string) {
    let existingWorkshopIndex = this.updateWorkshop.workshopDetail.findIndex(workshop => workshop.workshopDetailId === workshop_detail_id);

    if (existingWorkshopIndex !== -1) {
      let existingCustomer = this.updateWorkshop.workshopDetail[existingWorkshopIndex];
      existingCustomer[fieldName] = value;
    } else {
      let newWorkshop: UpdateWorkshopDetail = {
        workshopDetailId: workshop_detail_id,
        workshopId: this.workshop.workshop_id,
        [fieldName]: value,
        action: "update"
      };

      this.updateWorkshop.workshopDetail.push(newWorkshop);
    }
  }

  addNewRow() {
    let uuid = this.uuidService.generateUUID()
    let workshopDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    this.workshop.workshop_detail_list.unshift({
      status: 'Active',
      remark: '',
      workshop_detail_id: uuid,
      workshop_id: this.workshop.workshop_id,
      lecturer_id: '',
      workshop_date: '',
      workshop_date_format: workshopDate,
      earlybird_price: 0,
      max_customers: 20,
      duration: '',
      normal_price: 0,
      earlybird_flag: false,
      certificate_flag: false,
      form_status: '',
      total_customers: 0
    });

    let newWorkshop: UpdateWorkshopDetail = {
      workshopDetailId: uuid,
      workshopId: this.workshop.workshop_id,
      workshopDate: this.datetimeService.formateDateFormat1(workshopDate),
      action: "insert"
    };
    
    this.updateWorkshop.workshopDetail.push(newWorkshop);
  }

  onClickDelete(workshopDetailId: string) {
    console.log(workshopDetailId)
    let updateWorkshopIndex = this.updateWorkshop.workshopDetail.findIndex(detail => detail.workshopDetailId === workshopDetailId);
    let workshopDetailIndex = this.workshop.workshop_detail_list.findIndex(detail => detail.workshop_detail_id === workshopDetailId);
    
    if (updateWorkshopIndex !== -1) {
        let updateDetail = this.updateWorkshop.workshopDetail[updateWorkshopIndex];
        
        if (updateDetail.action === 'insert') {
          this.updateWorkshop.workshopDetail.splice(updateWorkshopIndex, 1);
          this.workshop.workshop_detail_list.splice(workshopDetailIndex, 1);
        } else {
          this.workshop.workshop_detail_list.splice(workshopDetailIndex, 1);
          this.updateWorkshop.workshopDetail[updateWorkshopIndex].action = 'delete';
        }
    } else {
      this.workshop.workshop_detail_list.splice(workshopDetailIndex, 1);
      
      let newWorkshop: UpdateWorkshopDetail = {
        workshopDetailId: workshopDetailId,
        workshopId: this.workshop.workshop_id,
        action: "delete"
      };
      
      this.updateWorkshop.workshopDetail.push(newWorkshop);
    }
  }

  typeaheadOnSelectLecturer(event: any, workshop_detail_id: string) {
    this.onInputChange('lecturerId', event.item.lecturer_id, workshop_detail_id)
  }
}
