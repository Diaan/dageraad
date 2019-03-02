import { Component, Listen, Prop } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true
})
export class AppRoot {
  @Prop({ mutable: true }) activeSong = null;

  @Listen('openSong')
  closeModalHandler(song) {
    this.activeSong = song.detail;
  }

  render() {

    let drawer = null;
    if (this.activeSong) {
      drawer = [
        <bva-songdrawer song={this.activeSong}></bva-songdrawer>
      ];
    }


    return (
      // <stencil-router>
      //   <stencil-route-switch scrollTopOffset={0}>
      //     <stencil-route url='/' component='app-home' exact={true} />
      //     <stencil-route url='/wheel' component='bva-wheel' exact={true} />
      //   </stencil-route-switch>
      // </stencil-router>
      [
        <bva-wheel></bva-wheel>,
        drawer
      ]
    );
  }
}
