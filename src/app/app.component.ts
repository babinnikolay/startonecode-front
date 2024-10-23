import {TuiButton, TuiRoot, TuiTitle} from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TuiHeader} from '@taiga-ui/layout';
import {TuiBadgeNotification, TuiSensitive, TuiTooltip} from '@taiga-ui/kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot, TuiHeader, TuiTitle, TuiTooltip, TuiButton, TuiBadgeNotification, TuiSensitive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'startonecode-front';
}
