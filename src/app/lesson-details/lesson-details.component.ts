import { Component } from '@angular/core';
import {Lesson} from '../lesson/lesson.model';
import {ActivatedRoute, Data, Params} from '@angular/router';
import {LessonDataService} from '../lesson.data-service';
import {combineLatest, Subscription, switchAll, switchMap} from 'rxjs';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.less'
})
export class LessonDetailsComponent {
  lesson: Lesson | undefined;
  lessonId: number = -1;
  private paramsSub: Subscription = new Subscription;

  constructor(private route: ActivatedRoute, private lessonDataService: LessonDataService) {
  }

  ngOnInit(): void{

    this.route.params.pipe(
      switchMap(params => this.lessonDataService.getById(params['lessonId']))

    ).subscribe(lesson => {
      this.lesson = lesson;
    });

    // combineLatest(
    //   this.route.params,
    //   this.lessonDataService.getById(this.lessonId),
    //   (params: Params, lesson: Lesson) => ({
    //     params,
    //     lesson,
    //   }),
    // ).subscribe((res: { params: Params; lesson: Lesson }) => {
    //   const { params, lesson} = res;
    //
    //
    // });
  }
}
