const __events = ['onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting'];

// check if function
export function isFunc(data) {
  return data && data.constructor == Function;
}

// check if string
export function isString(data) {
  return data && data.constructor == String;
}

// format video source
export function getSource(props) {
  let _source = {};
  if (props.src && isString(props.src) && props.src.length) {
    _source.src = props.src;
    _source.type = props.src.split('.')[props.src.split('.').length - 1]
  };
  return { source: _source };
}

export function getEvents(props) {
  const keys = Object.keys(props);
  let _evetns = {};
  keys.map(k => {
    if (__events.indexOf(k) < 0 || !isFunc(props[k])) return;
    _evetns[k] = props[k];
  });
  return _evetns;
}

export function cleanProps(props) {
  return {
    ...getEvents(props),
    ...getSource(props),
  }
}

// generat time strin from seconds - HH-MM-SS
function formatSeconds(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds }
}

export function formatTime(totalTime, playedTime) {
  const _total = formatSeconds(totalTime)
  const _played = formatSeconds(playedTime)
  let total = ('0' + _total.seconds).slice(-2);
  let played = ('0' + _played.seconds).slice(-2);
  if (_total.minutes) {
    total = ('0' + _total.minutes).slice(-2) + ':' + total;
    played = ('0' + _played.minutes).slice(-2) + ':' + played;
  }
  if (_total.hours) {
    total = ('0' + _total.hours).slice(-2) + ':' + total;
    played = ('0' + _played.hours).slice(-2) + ':' + played;
  }
  return { total, played }
}