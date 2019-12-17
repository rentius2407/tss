import { WorkoutType } from './workout-type.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WorkoutTypeService {

    private _workoutTypes: WorkoutType[] = [
        new WorkoutType('endurance', 'Endurance'),
        new WorkoutType('tempo', 'Tempo'),
        new WorkoutType('sst', 'SST'),
        new WorkoutType('vo', 'V02'),
        new WorkoutType('mixup', 'Mix Up')
    ];

    get workoutTypes() {
        return [...this._workoutTypes];
    }

    findWorkoutTypeByName(name: string) {
        return this._workoutTypes.find(workoutType => workoutType.name === name);
    }

}
