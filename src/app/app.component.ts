import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {LessonsTreeComponent} from './lessons-tree/lessons-tree.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot, HeaderComponent, LessonsTreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'startonecode-front';
}
