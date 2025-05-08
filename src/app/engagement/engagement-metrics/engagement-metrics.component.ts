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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  showTitle: string = '';
  searchTerm: string = '';
  metrics: any[] = [];
  youtubeBuzz: any = null;

  ngOnInit(): void {
    // If user navigated with a show title (via router state), fetch immediately
    const passedTitle = history.state?.title;
    if (passedTitle) {
      this.searchTerm = passedTitle;
      this.showTitle = passedTitle;
      this.fetchMetricsByTitle(passedTitle);
    }
  }

  fetchMetricsByTitle(title: string): void {
    const encodedTitle = encodeURIComponent(title);

    // Fetch YouTube buzz
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

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.fetchMetricsByTitle(this.searchTerm.trim());
    }
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString();
  }
}
