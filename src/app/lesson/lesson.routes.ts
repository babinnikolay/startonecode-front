import {Route} from '@angular/router';
import {LessonComponent} from './lesson.component';
import {LessonDetailsComponent} from '../lesson-details/lesson-details.component';
import {AuthActivateRouteGuard} from '../share/auth.activate-route.guard';

export const LESSONS_ROUTES: Route[] = [
  {path: '', component: LessonComponent, canActivate: [AuthActivateRouteGuard] },
  {path: ':lessonId', component: LessonDetailsComponent, canActivate: [AuthActivateRouteGuard] }
];
