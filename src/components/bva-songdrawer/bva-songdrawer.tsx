import { Component, Prop, EventEmitter, Event } from '@stencil/core';


@Component({
  tag: 'bva-songdrawer',
  styleUrl: 'bva-songdrawer.scss'
})
export class BvaSongdrawer {

  @Prop({ mutable: true }) song: string;
  @Event() closeDrawer: EventEmitter;

  closeHandler() {
    this.closeDrawer.emit();
  }

  render() {
    return (
      <div>
        <p>Hello BvaSongdrawer! {this.song}</p>
        <button onClick={this.closeHandler.bind(this)}>close</button>
      </div>
    );
  }
}
