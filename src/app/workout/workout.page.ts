import { WorkoutType } from './workout-type.model';
import { WorkoutService } from './workout.service';
import { Workout } from './workout.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {

  workouts: Workout[];

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.workouts = this.workoutService.workouts;
  }

  deleteWorkout(workoutId: number) {
    this.workoutService.delete(workoutId);
    this.workouts = this.workoutService.workouts;
  }

}
