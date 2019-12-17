import { WorkoutType } from './workout-type.model';
export class Workout {
    constructor(
        public id: number,
        public title: string,
        public time: Date,
        public tss: number,
        public type: WorkoutType,
    ) { }
}
