
export function addTextTrack() {
  this.video && this.video.addTextTrack(...arguments);
}

export function canPlayType() {
  this.video && this.video.canPlayType(...arguments);
}

export function download() {
  let link = document.createElement('a');
  link.setAttribute('href', this.state.source.src);
  link.setAttribute('download', `video.${this.state.source.type}`);
  link.setAttribute('target', '_blank');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function load() {
  this.video && this.video.load();
}

export function play() {
  this.video && this.video.play();
}

export function pause() {
  this.video && this.video.pause();
}

export function fullscreen() {
  if (!this.video) return false;
  const fs = this.wrapper.requestFullscreen
    || this.wrapper.webkitRequestFullscreen
    || this.wrapper.mozRequestFullScreen
    || this.wrapper.oRequestFullscreen
    || this.wrapper.msRequestFullscreen
    || false;
  if (!fs) return false;
  fs.call(this.wrapper);
  this.setState({ isFullScreen: true })
}

export function exitFullscreen() {
  const fs = document.exitFullscreen
    || document.webkitExitFullscreen
    || document.mozExitFullscreen
    || document.oExitFullscreen
    || document.msExitFullscreen
    || false;
  if (!fs) return false;
  fs.call(document);
  this.setState({ isFullScreen: false });
}