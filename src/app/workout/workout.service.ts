import { UniqueIdService } from './../unique-id.service';
import { WorkoutType } from './workout-type.model';
import { Workout } from './workout.model';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const WORKOUT_KEY = 'workouts-key';

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {

    constructor(
        private uniqueIdService: UniqueIdService,
        private storage: Storage
    ) { }

    getWorkouts(): Promise<Workout[]> {
        return this.storage.get(WORKOUT_KEY);
    }

    async addWorkout(
        title: string,
        time: Date,
        tss: number,
        type: WorkoutType
    ): Promise<any> {
        const generatedId = await this.uniqueIdService.nextId;
        const workout = new Workout(generatedId, title, time, tss, type);
        const workouts = await this.storage.get(WORKOUT_KEY);
        if (workouts) {
            workouts.push(workout);
            return this.storage.set(WORKOUT_KEY, workouts);
        }
        else {
            return this.storage.set(WORKOUT_KEY, [workout]);
        }
    }

    async delete(workoutId: number): Promise<Workout[]> {
        const workouts = await this.storage.get(WORKOUT_KEY);
        if (!workouts || workouts.length === 0) {
            return null;
        }
        let keepWorkouts: Workout[] = workouts.filter(workout => {
            return workout.id !== workoutId;
        });
        return this.storage.set(WORKOUT_KEY, keepWorkouts);
    }
}
