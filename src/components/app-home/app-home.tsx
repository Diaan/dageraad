import { Component, Prop, Listen } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: true
})
export class AppHome {
  @Prop({ mutable: true }) activeSong = null;
  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;

  @Listen('openSong')
  openSongHandler(song) {
    this.history.push(`/song/${song.detail}`, {});
    this.activeSong = song.detail;
  }

  @Listen('closeDrawer')
  closeDrawerHandler() {
    this.history.push(`/`, {});
    this.activeSong = null;
  }

  render() {
    let drawer = null;
    if (this.match.params.title) {
      drawer = [
        <bva-songdrawer song={this.match.params.title}></bva-songdrawer>
      ];
    }

    return (
      [
        <bva-wheel></bva-wheel>,
        drawer
      ]
    );
  }
}
