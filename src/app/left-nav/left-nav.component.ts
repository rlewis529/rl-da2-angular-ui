import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent {
  docLinks = [
    { title: 'Podcast Search', link: '' },
    { title: 'Episode List', link: 'episodes' }
  ];

  getAccent(index: number): string {
    const colors = [
      'oklch(51.01% 0.274 263.83)',
      'oklch(47.66% 0.246 305.88)',
      'oklch(61.42% 0.238 15.34)',
      'oklch(63.32% 0.24 31.68)',
      'oklch(69.02% 0.277 332.77)'
    ];
    return colors[index % colors.length];
  }
}
