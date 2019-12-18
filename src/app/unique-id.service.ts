import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const WORKOUT_UNIQUE_KEY = 'workouts-unique-key';

@Injectable({
    providedIn: 'root'
})
export class UniqueIdService {

    constructor(
        private storage: Storage
    ) { }

    get nextId() {
        return this.generateNextId();
    }

    private async generateNextId() {
        const id = await this.storage.get(WORKOUT_UNIQUE_KEY);
        let newId = id + 1;
        return this.storage.set(WORKOUT_UNIQUE_KEY, newId);
    }

}
