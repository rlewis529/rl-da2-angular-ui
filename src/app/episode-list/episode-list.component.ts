import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
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
  searchTerm: string = '';

  ngOnInit() {
    this.showId = this.route.snapshot.paramMap.get('id');
    this.showTitle = history.state?.title || '';
    const nav = this.router.getCurrentNavigation(); // do I need this?
    
    if (this.showId) {
      this.fetchEpisodes(this.showId);
    }
  }

  formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  fetchEpisodes(id: string) {
    this.http.get<any[]>(`http://localhost:5000/podcast-episodes?show_id=${id}`)
      .subscribe({
        next: data => this.episodes = data,
        error: err => console.error('Error fetching episodes', err)
      });
  }

  fetchEpisodesByTitle(title: string) {
    this.http.get<any[]>(`http://localhost:5000/podcast-episodes-by-title?show_title=${encodeURIComponent(title)}`)
      .subscribe({
        next: data => {
          this.episodes = data;
          this.showTitle = title;
        },
        error: err => {
          console.error('Error fetching episodes', err);
          this.episodes = [];
          this.showTitle = '';
        }
      });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.fetchEpisodesByTitle(this.searchTerm.trim());
    }
  }

}
