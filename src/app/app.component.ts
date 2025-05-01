import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftNavComponent } from "./left-nav/left-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rl-da2-angular-ui';
}
