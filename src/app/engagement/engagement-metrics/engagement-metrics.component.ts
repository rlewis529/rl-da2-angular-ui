import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private http = inject(HttpClient);

  showTitle: string = '';
  searchTerm: string = '';
  metrics: any[] = [];
  youtubeBuzz: any = null;

  ngOnInit(): void {
    const titleParam = this.route.snapshot.paramMap.get('title');

    if (titleParam) {
      const decodedTitle = decodeURIComponent(titleParam);
      this.showTitle = decodedTitle;
      this.searchTerm = decodedTitle;
      this.fetchMetricsByTitle(decodedTitle);
    }
  }

  fetchMetricsByTitle(title: string): void {
    const encoded = encodeURIComponent(title);    

    this.http.get<any>(`http://localhost:5000/youtube-buzz?q=${encoded}`)
      .subscribe({
        next: data => this.youtubeBuzz = data,
        error: err => {
          console.error('Error fetching YouTube buzz data', err);
          this.youtubeBuzz = null;
        }
      });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.fetchMetricsByTitle(this.searchTerm.trim());
      this.showTitle = this.searchTerm.trim();
    }
  }
}
