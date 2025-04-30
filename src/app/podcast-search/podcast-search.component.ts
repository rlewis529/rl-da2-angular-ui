import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Needed for ngModel
import { PodcastService } from '../podcast.service';

@Component({
  selector: 'app-podcast-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './podcast-search.component.html',
  styleUrls: ['./podcast-search.component.css']
})
export class PodcastSearchComponent {
  query = '';
  results: any[] = [];
  loading = false;
  error = '';

  constructor(private podcastService: PodcastService) {}

  search() {
    this.loading = true;
    this.error = '';
    this.results = [];

    this.podcastService.searchPodcasts(this.query).subscribe({
      next: (data) => {
        console.log('API Response:', data); 
        // this.results = data?.results || [];
        this.results = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching podcasts.';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
