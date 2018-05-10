import React, { Component } from 'react';
import css from './style.scss';

import * as _events from './events';
import * as _methods from './methods';
import * as _getters from './getters';

import { isFunc, cleanProps, formatTime } from './utils';

import defaultEvents from './defaultEvents';
import defaultProperties from './defaultProperties';

import PauseIcon from '../icons/pause.svg';
import PlayIcon from '../icons/play.svg';
import FullscreenIcon from '../icons/fullscreen.svg';
import MinimizeIcon from '../icons/minimize.svg';
import DownloadIcon from '../icons/download.svg';


class Videoact extends Component {
  constructor(props) {
    super(props);

    // internal methods
    this.handleVideoClick = this.handleVideoClick.bind(this);
    this.handleVideoDblClick = this.handleVideoDblClick.bind(this);
    this.handleExitFullScreen = this.handleExitFullScreen.bind(this);
    this.handleResize = this.handleResize.bind(this);

    // method
    this.addTextTrack = _methods.addTextTrack.bind(this);
    this.canPlayType = _methods.canPlayType.bind(this);
    this.download = _methods.download.bind(this);
    this.exitFullscreen = _methods.exitFullscreen.bind(this);
    this.fullscreen = _methods.fullscreen.bind(this);
    this.load = _methods.load.bind(this);
    this.pause = _methods.pause.bind(this);
    this.play = _methods.play.bind(this);

    // events
    this.onAbort = _events.onAbort.bind(this);
    this.onCanPlay = _events.onCanPlay.bind(this);
    this.onCanPlayThrough = _events.onCanPlayThrough.bind(this);
    this.onDownload = _events.onDownload.bind(this);
    this.onDurationChange = _events.onDurationChange.bind(this);
    this.onEmptied = _events.onEmptied.bind(this);
    this.onEnded = _events.onEnded.bind(this);
    this.onError = _events.onError.bind(this);
    this.onLoadedData = _events.onLoadedData.bind(this);
    this.onLoadedMetadata = _events.onLoadedMetadata.bind(this);
    this.onLoadStart = _events.onLoadStart.bind(this);
    this.onPause = _events.onPause.bind(this);
    this.onPlay = _events.onPlay.bind(this);
    this.onPlaying = _events.onPlaying.bind(this);
    this.onProgress = _events.onProgress.bind(this);
    this.onRateChange = _events.onRateChange.bind(this);
    this.onSeeked = _events.onSeeked.bind(this);
    this.onSeeking = _events.onSeeking.bind(this);
    this.onStalled = _events.onStalled.bind(this);
    this.onSuspend = _events.onSuspend.bind(this);
    this.onTimeUpdate = _events.onTimeUpdate.bind(this);
    this.onVolumeChange = _events.onVolumeChange.bind(this);
    this.onWaiting = _events.onWaiting.bind(this);

    this.state = {
      ...defaultEvents,
      ...defaultProperties,
      ...cleanProps(props),

      // player controls
      progress: 0,
      totalTime: 0,
      playedTime: 0,
      isPlaying: false,
      isFullScreen: false
    }
  }

  handleVideoClick() {
    this.state.isPlaying && this.pause();
    !this.state.isPlaying && this.play();
  }

  handleVideoDblClick() {
    !this.state.isFullScreen && this.fullscreen();
    this.state.isFullScreen && this.exitFullscreen();
  }

  handleExitFullScreen(e) {
    return !(document.fullscreenElement
      || document.webkitFullscreenElement
      || document.mozFullscreenElement
      || document.oFullscreenElement
      || document.msFullscreenElement) && this.exitFullscreen();
  }

  handleResize() {
    const { ratio } = this.state;
    if (!this.state.ratio) return false;
    this.setState({ height: this.wrapper.offsetWidth / ratio })
  }

  // Properties Getters
  get audioTracks() { return _getters.audioTracks.bind(this)(); }
  get autoplay() { return _getters.autoplay.bind(this)(); }
  get buffered() { return _getters.buffered.bind(this)(); }
  get controller() { return _getters.controller.bind(this)(); }
  get controls() { return _getters.controls.bind(this)(); }
  get crossOrigin() { return _getters.crossOrigin.bind(this)(); }
  get currentSrc() { return _getters.currentSrc.bind(this)(); }
  get currentTime() { return _getters.currentTime.bind(this)(); }
  get defaultMuted() { return _getters.defaultMuted.bind(this)(); }
  get defaultPlaybackRate() { return _getters.defaultPlaybackRate.bind(this)(); }
  get duration() { return _getters.duration.bind(this)(); }
  get ended() { return _getters.ended.bind(this)(); }
  get error() { return _getters.error.bind(this)(); }
  get loop() { return _getters.loop.bind(this)(); }
  get mediaGroup() { return _getters.mediaGroup.bind(this)(); }
  get muted() { return _getters.muted.bind(this)(); }
  get networkState() { return _getters.networkState.bind(this)(); }
  get paused() { return _getters.paused.bind(this)(); }
  get playbackRate() { return _getters.playbackRate.bind(this)(); }
  get played() { return _getters.played.bind(this)(); }
  get preload() { return _getters.preload.bind(this)(); }
  get readyState() { return _getters.readyState.bind(this)(); }
  get seekable() { return _getters.seekable.bind(this)(); }
  get seeking() { return _getters.seeking.bind(this)(); }
  get src() { return _getters.src.bind(this)(); }
  get startDate() { return _getters.startDate.bind(this)(); }
  get textTracks() { return _getters.textTracks.bind(this)(); }
  get videoTracks() { return _getters.videoTracks.bind(this)(); }
  get volume() { return _getters.volume.bind(this)(); }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...cleanProps(nextProps) });
  }

  componentDidMount() {
    const name = (
      this.wrapper.requestFullscreen && 'fullscreenchange'
      || this.wrapper.webkitRequestFullscreen && 'webkitfullscreenchange'
      || this.wrapper.mozRequestFullScreen && 'mozfullscreenchange'
      || this.wrapper.oRequestFullscreen && 'ofullscreenchange'
      || this.wrapper.msRequestFullscreen && 'msfullscreenchange'
    );
    window.addEventListener(name, this.handleExitFullScreen);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    const name = (
      this.wrapper.requestFullscreen && 'fullscreenchange'
      || this.wrapper.webkitRequestFullscreen && 'webkitfullscreenchange'
      || this.wrapper.mozRequestFullScreen && 'mozfullscreenchange'
      || this.wrapper.oRequestFullscreen && 'ofullscreenchange'
      || this.wrapper.msRequestFullscreen && 'msfullscreenchange'
    );
    window.removeEventListener(name, this.handleExitFullScreen);
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const {
      controls,
      download,
      height,
      isBuffering,
      isFullScreen,
      isPlaying,
      playedTime,
      progress,
      source,
      totalTime,
    } = this.state
    const time = formatTime(totalTime, playedTime);
    return !!source && (
      <div
        ref={e => { this.wrapper = e }}
        style={{ height: `${height ? height + 'px' : 'auto'}` }}
        className={`
          ${css.videoact}
          ${this.props.className}
          ${isFullScreen ? css.videoact__full : ''}
        `}>
        <video
          className={css.videoact__video}
          ref={e => { this.video = e }}
          // events
          onAbort={this.onAbort}
          onCanPlay={this.onCanPlay}
          onCanPlayThrough={this.onCanPlayThrough}
          onDurationChange={this.onDurationChange}
          onEmptied={this.onEmptied}
          onEnded={this.onEnded}
          onError={this.onError}
          onLoadedData={this.onLoadedData}
          onLoadedMetadata={this.onLoadedMetadata}
          onLoadStart={this.onLoadStart}
          onPause={this.onPause}
          onPlay={this.onPlay}
          onPlaying={this.onPlaying}
          onProgress={this.onProgress}
          onRateChange={this.onRateChange}
          onSeeked={this.onSeeked}
          onSeeking={this.onSeeking}
          onStalled={this.onStalled}
          onSuspend={this.onSuspend}
          onTimeUpdate={this.onTimeUpdate}
          onVolumeChange={this.onVolumeChange}
          onWaiting={this.onWaiting}
          onClick={this.handleVideoClick}
          onDoubleClick={this.handleVideoDblClick}
          //properties
          controls={false}
        >
          <source src={source.src} type={`video/${source.type}`} />}
      </video>
        {controls && <div className={css.videoact__controls}>
          <div className={css.videoact__leading}>
            <button
              className={`
                  ${css.videoact__leading}
                  ${css.videoact__controls__btn}
                  ${isPlaying ? css.videoact__hidden : ''}
                `}
              onClick={this.play}>
              <PlayIcon className={css.videoact__controls__icon} />
            </button>
            <button
              className={`
                  ${css.videoact__leading}
                  ${css.videoact__controls__btn}
                  ${isPlaying ? '' : css.videoact__hidden}
                `}
              onClick={this.pause}>
              <PauseIcon className={css.videoact__controls__icon} />
            </button>
          </div>
          <div className={css.videoact__trailing}>
            {download && <button
              className={`
                  ${css.videoact__trailing}
                  ${css.videoact__controls__btn}
                `}
              onClick={this.download}>
              <DownloadIcon className={css.videoact__controls__icon} />
            </button>}
            <button
              className={`
                  ${css.videoact__trailing}
                  ${css.videoact__controls__btn}
                  ${isFullScreen ? css.videoact__hidden : ''}
                `}
              onClick={this.fullscreen}>
              <FullscreenIcon className={css.videoact__controls__icon} />
            </button>
            <button
              className={`
                  ${css.videoact__trailing}
                  ${css.videoact__controls__btn}
                  ${!isFullScreen ? css.videoact__hidden : ''}
                `}
              onClick={this.exitFullscreen}>
              <MinimizeIcon className={css.videoact__controls__icon} />
            </button>
          </div>
          <div className={css.videoact__middle}>
            <div className={css.videoact__progress}>
              <div className={css.videoact__leading}>
                <span className={css.videoact__progress__time}>
                  {time.played}
                </span>
              </div>
              <div className={css.videoact__trailing}>
                <span className={css.videoact__progress__time}>
                  {time.total}
                </span>
              </div>
              <div className={css.videoact__middle}>
                <span className={css.videoact__progress__bar}>
                  <span
                    className={css.videoact__progress__innerbar}
                    style={{ width: `${progress}%` }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>}
      </div >
    );
  }
}

export default Videoact;
