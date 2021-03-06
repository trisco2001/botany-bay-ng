import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ClassColorService {
  classColors: {[classId: number]: string}

  constructor(private messageService: MessageService) { 
    this.classColors = {
      1: "#C79C6E",
      2: "#F58CBA",
      3: "#ABD473",
      4: "#FFF569",
      5: "#FFFFFF",
      6: "#C41F3B",
      7: "#0070DE",
      8: "#40C7EB",
      9: "#8787ED",
      10: "#00FF96",
      11: "#FF7D0A",
      12: "#A330C9",
    }
  }

  getColorForClass(classId: number) {
    this.messageService.add(`class id ${classId} = ${this.classColors[classId]}`)
    return this.classColors[classId]
  }
}
