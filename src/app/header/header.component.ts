import { Component } from '@angular/core';
import {TuiHeader} from '@taiga-ui/layout';
import {TuiButton, TuiIcon, TuiTitle} from '@taiga-ui/core';
import {TuiBadgeNotification, TuiSensitive, TuiTooltip} from '@taiga-ui/kit';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TuiHeader,
    TuiTitle,
    TuiSensitive,
    TuiBadgeNotification,
    TuiIcon,
    TuiTooltip,
    TuiButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {

}
