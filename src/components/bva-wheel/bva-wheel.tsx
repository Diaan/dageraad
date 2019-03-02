import {
  Component,
  Event,
  EventEmitter
} from '@stencil/core';

@Component({
  tag: 'bva-wheel',
  styleUrl: 'bva-wheel.scss'
})
export class BvaWheel {

  @Event() openSong: EventEmitter;

  showSongHandler(song) {
    this.openSong.emit(song);
  }

  render() {
    return (
      <svg viewBox="0 0 1600 1586" version="1.1" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
        <g id="wheelgroup">
          <use href="#wheel" x="0" y="0" width="1600px" height="1586px" id="bg" />
          <path onClick={this.showSongHandler.bind(this, 'song1')} d="M515.726,299.211L632.08,503.205C677.937,473.551 747.261,457.421 798.872,457.757L799.28,225.014C799.28,225.014 635.384,219.996 515.726,299.211Z" />
          <path onClick={this.showSongHandler.bind(this, 'song2')} d="M805.857,225.091L805.573,459.934C860.102,456.962 928.286,477.38 972.919,503.296L1088.83,301.469C1088.83,301.469 949.054,215.739 805.857,225.091Z" />
          <path onClick={this.showSongHandler.bind(this, 'song3')} d="M1097.16,297.59L975.693,498.583C1023.93,524.184 1071.79,576.867 1096.64,622.102L1300.09,509.072C1300.09,509.072 1224.63,363.496 1097.16,297.59Z" />
          <path onClick={this.showSongHandler.bind(this, 'song4')} d="M1303.23,514.852L1098,629.015C1127.16,675.187 1142.55,744.68 1141.66,796.284L1374.39,799.184C1374.39,799.184 1381.16,635.352 1303.23,514.852Z" />
          <path onClick={this.showSongHandler.bind(this, 'song5')} d="M1378.45,794.694L1143.61,793.53C1146.38,848.07 1125.71,916.177 1099.62,960.713L1301.02,1077.38C1301.02,1077.38 1387.27,937.926 1378.45,794.694Z" />
          <path onClick={this.showSongHandler.bind(this, 'song6')} d="M1297.66,1083.04L1094.39,965.429C1069.71,1014.15 1017.95,1063 973.198,1088.71L1090.09,1289.97C1090.09,1289.97 1234.2,1211.75 1297.66,1083.04Z" />
          <path onClick={this.showSongHandler.bind(this, 'song7')} d="M1089.29,1299.12L975.895,1093.47C929.614,1122.45 860.064,1137.58 808.463,1136.5L804.691,1369.21C804.691,1369.21 968.497,1376.6 1089.29,1299.12Z" />
          <path onClick={this.showSongHandler.bind(this, 'song8')} d="M798.116,1369.04L801.795,1134.23C747.228,1136.41 679.347,1115.01 635.093,1088.45L516.276,1288.58C516.276,1288.58 654.798,1376.32 798.116,1369.04Z" />
          <path onClick={this.showSongHandler.bind(this, 'song9')} d="M517.408,1293.13L636.08,1090.48C587.494,1065.55 538.911,1013.53 513.437,968.646L311.565,1084.48C311.565,1084.48 389.035,1229 517.408,1293.13Z" />
          <path onClick={this.showSongHandler.bind(this, 'song10')} d="M308.349,1078.74L511.978,961.753C482.182,915.989 465.836,846.716 466.01,795.104L233.267,795.423C233.267,795.423 228.76,959.333 308.349,1078.74Z" />
          <path onClick={this.showSongHandler.bind(this, 'song11')} d="M225.749,790.144L460.542,795.054C458.644,740.477 480.401,672.708 507.192,628.594L307.687,508.73C307.687,508.73 219.22,646.79 225.749,790.144Z" />
          <path onClick={this.showSongHandler.bind(this, 'song12')} d="M311.13,503.126L512.501,623.962C537.951,575.645 590.484,527.622 635.642,502.63L521.977,299.53C521.977,299.53 376.638,375.447 311.13,503.126Z" />
        </g>
        <defs>
          <image id="wheel" width="1600px" height="1586px" href="assets/cover.jpeg" />

          <pattern id="img1" patternUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1586">
            <use href="#wheel" width="1600" height="1586" />
          </pattern>
          <pattern id="img2" patternUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1586">
            <use href="#wheel2" width="1600" height="1586" />
          </pattern>
          <filter id="pictureFilter1" >
            <feColorMatrix type="saturate" values="0.1" />
          </filter>
          <filter id="pictureFilter2" >
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
      </svg>
    );
  }
}
