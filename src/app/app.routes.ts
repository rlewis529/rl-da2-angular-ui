import { Routes } from '@angular/router';
import { PodcastSearchComponent } from './podcast-search/podcast-search.component';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EngagementMetricsComponent } from './engagement/engagement-metrics/engagement-metrics.component';

export const routes: Routes = [
  { path: '', component: PodcastSearchComponent },
  { path: 'episodes/:id', component: EpisodeListComponent },
  { path: 'episodes', component: EpisodeListComponent },
  { path: 'engagement', component: EngagementMetricsComponent },
  { path: 'engagement/:title', component: EngagementMetricsComponent }
];
