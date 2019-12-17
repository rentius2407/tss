import { UniqueIdService } from './../unique-id.service';
import { WorkoutType } from './workout-type.model';
import { Workout } from './workout.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {

    private _workouts: Workout[] = [];

    constructor(private uniqueIdService: UniqueIdService) { }

    get workouts() {
        return [...this._workouts];
    }

    addWorkout(
        title: string,
        time: Date,
        tss: number,
        type: WorkoutType
    ) {
        const generatedId = this.uniqueIdService.nextId;
        const workout = new Workout(generatedId, title, time, tss, type);
        this._workouts.push(workout);
    }

    delete(workoutId: number) {
        this._workouts = this._workouts.filter(workout => {
            return workout.id !== workoutId;
        });

    }
}
