import { Routes } from '@angular/router';
import { PodcastSearchComponent } from './podcast-search/podcast-search.component';
import { EpisodeListComponent } from './episode-list/episode-list.component';

export const routes: Routes = [
  { path: '', component: PodcastSearchComponent },
  { path: 'episodes/:id', component: EpisodeListComponent }
];
