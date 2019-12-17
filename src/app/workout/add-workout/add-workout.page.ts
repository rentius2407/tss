import { WorkoutTypeService } from './../workout-type.service';
import { WorkoutType } from '../workout-type.model';
import { WorkoutService } from './../workout.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.page.html',
  styleUrls: ['./add-workout.page.scss'],
})
export class AddWorkoutPage implements OnInit {

  form: FormGroup;
  workoutTypes: WorkoutType[];

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private workoutService: WorkoutService,
    private workoutTypeService: WorkoutTypeService
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(180)]
      }),
      date: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      time: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      type: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      tss: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      })
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.workoutTypes = this.workoutTypeService.workoutTypes;
  }

  onCreateWorkout() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl
      .create({
        message: 'Creating place...'
      })
      .then(loadingEl => {
        loadingEl.present();

        this.workoutService
          .addWorkout(
            this.form.value.title,
            this.retrieveWorkoutDate(),
            this.form.value.tss,
            this.workoutTypeService.findWorkoutTypeByName(this.form.value.type),
          );
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/home/workouts']);
      });
  }

  retrieveWorkoutDate() {
    const time = new Date(this.form.value.time);
    const workoutDate = new Date(this.form.value.date);
    workoutDate.setHours(time.getHours());
    workoutDate.setMinutes(time.getMinutes());
    workoutDate.setSeconds(0);

    return workoutDate;
  }

}
