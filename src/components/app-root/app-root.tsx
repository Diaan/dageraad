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
    console.log('render app-root');
    return (
      <stencil-router>
        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route url='/' component='app-home' exact={true} />
          <stencil-route url={['/', '/song/:title']} component='app-home' exact={true} />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
