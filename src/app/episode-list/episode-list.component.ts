import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);

  showId: string | null = null;
  showTitle: string | null = null;
  episodes: any[] = [];

  ngOnInit() {
    this.showId = this.route.snapshot.paramMap.get('id');

    const nav = this.router.getCurrentNavigation();
    this.showTitle = history.state?.title || 'Unknown Show';

    if (this.showId) {
      this.http.get<any[]>(`http://localhost:5000/podcast-episodes?show_id=${this.showId}`)
        .subscribe({
          next: data => this.episodes = data,
          error: err => console.error('Error fetching episodes', err)
        });
    }
  }

  formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
