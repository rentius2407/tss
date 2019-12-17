import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UniqueIdService {

    private id = 0;

    get nextId() {
        this.generateNextId();
        return this.id;
    }

    private generateNextId() {
        this.id = this.id + 1;
    }

}
