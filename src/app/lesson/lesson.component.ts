import { Component } from '@angular/core';
import {LessonsTreeComponent} from '../lessons-tree/lessons-tree.component';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [
    LessonsTreeComponent
  ],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.less'
})
export class LessonComponent {

}
