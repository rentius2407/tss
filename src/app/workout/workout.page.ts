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
    this.workoutService.getWorkouts().then((workouts: Workout[]) => {
      this.workouts = this.orderWorkouts(workouts);
    });
  }

  orderWorkouts(workouts: Workout[]) {
    if (workouts) {
      return workouts.sort((a: Workout, b: Workout) => {
        return b.time.getTime() - a.time.getTime();

      });
    }

    return workouts;
  }

  deleteWorkout(workoutId: number) {
    this.workoutService.delete(workoutId).then((workouts: Workout[]) => {
      this.workouts = this.orderWorkouts(workouts);
    });
  }

}
