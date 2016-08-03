import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EmitterService {
    // Event store
    private static _emitter: { [ID: string]: EventEmitter<any> } = {};

    // Set a new even in the store with a given ID as key
    static get(ID: string) : EventEmitter<any> {
        if (!this._emitter[ID]) {
            this._emitter[ID] = new EventEmitter();
        }
        return this._emitter[ID];
    }
}