import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  showInstruction = new BehaviorSubject(true);

  constructor() { }

  songClicked() {
    this.showInstruction.next(false);
  }
}
