import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'bva-songdrawer',
  styleUrl: 'bva-songdrawer.scss'
})
export class BvaSongdrawer {

  @Prop({ mutable: true }) song: string;

  closeHandler() {

  }

  render() {
    return (
      <div>
        <p>Hello BvaSongdrawer! {this.song}</p>
        <button onClick={this.closeHandler.bind(this, 'song1')}>close</button>
      </div>
    );
  }
}
