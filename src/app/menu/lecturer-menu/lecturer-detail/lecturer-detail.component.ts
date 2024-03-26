import { Component } from '@angular/core';
import { Lecturer, UpdateLecturer } from '../../../interface/lecturer';
import { NavigateService } from '../../../utilities/navigate.service';
import { LecturerService } from '../../../service/lecturer.service';
import { LoadingService } from '../../../service/loading.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lecturer-detail',
  templateUrl: './lecturer-detail.component.html',
  styleUrl: './lecturer-detail.component.css'
})
export class LecturerDetailComponent {
  lecturers!: Lecturer
  updateLecturers: UpdateLecturer[] = []
  role!: string | null;

  constructor(
    public navigateService: NavigateService,
    private lecturerService: LecturerService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.role = localStorage.getItem('role');
    this.route.params.subscribe(params => {
      this.lecturerService.findLecturer(params['id']).subscribe((res) => {
        this.lecturers = res.data;
        this.loadingService.hide();
      })
    });
  }

  onSubmitSave() {
    Swal.fire({
      icon: 'info',
      title: 'Confirm?',
      confirmButtonText: "confirm",
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.onConfirmSave()
      }
    });
  }

  onConfirmSave() {
    this.loadingService.show();
    this.lecturerService.updateLecturer(this.updateLecturers).subscribe((res) => {
      this.loadingService.hide();
      if (res && res.status === 200) {
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

  onInputChange<T extends keyof UpdateLecturer>(fieldName: T, value: UpdateLecturer[T], lecturerId: string) {
    let existingLecturerIndex = this.updateLecturers.findIndex(lecturer => lecturer.lecturerId === lecturerId);

    if (existingLecturerIndex !== -1) {
      let existingCustomer = this.updateLecturers[existingLecturerIndex];
        existingCustomer[fieldName] = value;
    } else {
      let newLecturer: UpdateLecturer = {
            lecturerId: lecturerId,
            [fieldName]: value
        };
        this.updateLecturers.push(newLecturer);
    }
  }
}
