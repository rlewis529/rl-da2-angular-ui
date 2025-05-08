import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-engagement-metrics',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './engagement-metrics.component.html',
  styleUrls: ['./engagement-metrics.component.css']
})
export class EngagementMetricsComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);

  showId: string | null = null;
  showTitle: string = '';
  searchTerm: string = '';
  metrics: any[] = [];
  youtubeBuzz: any = null;

  ngOnInit() {
    this.showId = this.route.snapshot.paramMap.get('id');
    this.showTitle = history.state?.title || '';    
  }

  fetchMetricsByTitle(title: string) {
    const encodedTitle = encodeURIComponent(title);    
    // YouTube buzz metrics (new)
    this.http.get<any>(`http://localhost:5000/youtube-buzz?q=${encodedTitle}`)
    .subscribe({
      next: data => {
        this.youtubeBuzz = data;
      },
      error: err => {
        console.error('Error fetching YouTube buzz data', err);
        this.youtubeBuzz = null;
      }
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.fetchMetricsByTitle(this.searchTerm.trim());
    }
  }
}
