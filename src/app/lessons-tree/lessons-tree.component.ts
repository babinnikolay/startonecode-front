import { Component } from '@angular/core';
import {LessonDataService} from '../lesson.data-service';
import {TuiCheckbox, TuiTree} from '@taiga-ui/kit';
import {NgClass, NgForOf} from '@angular/common';
import {TuiLabel} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import {EMPTY_ARRAY, TuiHandler, TuiMapperPipe} from '@taiga-ui/cdk';
import {RouterLink} from '@angular/router';

interface TreeNode {
  readonly children?: readonly TreeNode[];
  readonly text: string;
  readonly id: number;
  readonly isAvailable: boolean;
  readonly isDone: boolean;

}

function flatten(item: TreeNode): readonly TreeNode[] {
  return item.children
    ? item.children.map(flatten).reduce((arr, item) => [...arr, ...item], [])
    : [item];
}

@Component({
  selector: 'app-lessons-tree',
  standalone: true,
  imports: [
    TuiTree,
    NgForOf,
    TuiLabel,
    TuiCheckbox,
    FormsModule,
    TuiMapperPipe,
    RouterLink,
    NgClass
  ],
  templateUrl: './lessons-tree.component.html',
  styleUrl: './lessons-tree.component.less'
})
export class LessonsTreeComponent {

  protected map = new Map<TreeNode, boolean>();

  protected readonly data: TreeNode = {
    text: 'Topmost',
    id: -1,
    isAvailable: true,
    isDone: true,
    children: [
      {
        text: 'Chapter 1',
        id: 0,
        isAvailable: true,
        isDone: false,
        children: [
          {
            text: 'Lesson 1',
            id: 1,
            isAvailable: true,
            isDone: true
          },
          {
            text: 'Lesson 2',
            id: 2,
            isAvailable: true,
            isDone: false
          },
          {
            text: 'Lesson 3',
            id: 3,
            isAvailable: false,
            isDone: false
          },
        ],
      },
      {text: 'Chapter 2',
        id: 0,
        isAvailable: true,
        isDone: false,
        children: [
          {
            text: 'Lesson 4',
            id: 4,
            isAvailable: false,
            isDone: false
          },
          {
            text: 'Lesson 5',
            id: 5,
            isAvailable: false,
            isDone: false
          },
          {
            text: 'Lesson 6',
            id: 6,
            isAvailable: false,
            isDone: false
          },
        ]
      },

    ],
  };

  protected readonly handler: TuiHandler<TreeNode, readonly TreeNode[]> = (item) =>
    item.children || EMPTY_ARRAY;

  protected readonly getValue = (item: TreeNode, map: Map<TreeNode, boolean>, ): boolean | null => {
    let result: boolean | null = null;
    const flat = flatten(item);
    const key = flat[0]!;

    if (key) {
      result = !!map.get(key);
    }

    for (const item of flat) {
      if (result !== !!map.get(item)) {
        return null;
      }
    }

    return result;
  };

  constructor(private lessonDataService: LessonDataService) {}

  protected onChecked(node: TreeNode, value: boolean): void {
    //flatten(node).forEach((item) => this.map.set(item, value));
    //this.map = new Map(this.map.entries());
  }



  public ngOnInit() {
    this.initForm();
  }

  private initForm() {
    console.log("on init")
  }
}
