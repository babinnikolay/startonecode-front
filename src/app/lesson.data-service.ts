import {Injectable} from '@angular/core';
import {Lesson} from './lesson.model';
import {of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LessonDataService {

  private lessons: Lesson[] = new Array<Lesson>(new Lesson(1, "First", "Learn catalogs 1"),
    new Lesson(2, "Second", "Learn catalogs 2"),
    new Lesson(3, "Third", "Learn catalogs 3"));


  findAll(): Lesson[] {

    return this.lessons;
  }

  findById(lessonId: number) {
    return this.lessons.find(lesson => lesson.id === lessonId);
  }

  getById(lessonId: number) {
    console.log(lessonId)
    const lesson = this.lessons[lessonId - 1]; //find(lesson => lesson.id === lessonId);
    console.log("service - " + lesson)
    return of(lesson);
  }
}
