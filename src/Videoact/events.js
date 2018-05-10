
export function onAbort() {
  this.state.onAbort();
}

export function onCanPlay() {
  this.setState({ isBuffering: false })
  this.state.onCanPlay();
}

export function onCanPlayThrough() {
  this.state.onCanPlayThrough();
}

export function onDownload() {
  this.state.onDownload();
}

export function onDurationChange() {
  this.state.onDurationChange();
}

export function onEmptied() {
  this.state.onEmptied();
}

export function onEnded() {
  this.state.onEnded();
}

export function onError() {
  this.state.onError();
}

export function onLoadedData() {
  this.state.onLoadedData();
}

export function onLoadedMetadata() {
  this.setState({
    totalTime: Math.ceil(this.duration),
    playedTime: 0
  })
  this.state.onLoadedMetadata();
}

export function onLoadStart() {
  this.state.onLoadStart();
}

export function onPause() {
  this.setState({ isPlaying: false })
  this.state.onPause();
}

export function onPlay() {
  this.setState({ isPlaying: true })
  this.state.onPlay();
}

export function onPlaying() {
  this.setState({ isPlaying: true })
  this.state.onPlaying();
}

export function onProgress() {
  this.setState({ isBuffering: true })
  this.state.onProgress();
}

export function onRateChange() {
  this.state.onRateChange();
}

export function onSeeked() {
  this.state.onSeeked();
}

export function onSeeking() {
  this.state.onSeeking();
}

export function onStalled() {
  this.state.onStalled();
}

export function onSuspend() {
  this.state.onSuspend();
}

export function onTimeUpdate() {
  const playedTime = Math.ceil(this.currentTime);
  const totalTime = Math.ceil(this.state.totalTime);
  const progress = Math.ceil(100 * (playedTime / totalTime));
  this.setState({ playedTime, progress });
  this.state.onTimeUpdate();
}

export function onVolumeChange() {
  this.state.onVolumeChange();
}

export function onWaiting() {
  this.state.onWaiting();
}