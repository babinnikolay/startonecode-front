import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
import {TuiButton} from '@taiga-ui/core';
import {TuiButtonLoading} from '@taiga-ui/kit';
import {map, startWith, Subject, switchMap, timer} from 'rxjs';
import {TUI_FALSE_HANDLER} from '@taiga-ui/cdk';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    TuiButton,
    TuiButtonLoading,
    AsyncPipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less'
})
export class FooterComponent {
  protected readonly trigger$ = new Subject<void>();
  protected readonly loading$ = this.trigger$.pipe(
    switchMap(() => timer(2000).pipe(map(TUI_FALSE_HANDLER), startWith('Loading'))),
  );

}
