import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WheelComponent } from './features/wheel/wheel.component';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeComponent } from './shared/youtube/youtube.component';
import { SongDetailComponent } from './shared/song-detail/song-detail.component';
import { SpotifyComponent } from './shared/spotify/spotify.component';
import { RouterModule, Routes } from '@angular/router';
import { SongResolver } from './core/songs-resolver.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: 'song/:slug',
    resolve: { song: SongResolver },
    component: SongDetailComponent,
    data: { animation: 'song' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    YoutubeComponent,
    SongDetailComponent,
    SpotifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    SongResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
