videoact is a highly configrable html5 video component built from the ground up using React library.

### Usage

#### ES6

```bash
npm install videoact --save
# or
yarn add videoact
```

```js
import React, { Component } from 'react';
import Videoact from 'videoact';

class App extends Component {
  render () {
    return <Videoact src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4' />
  }
}
```

#### Es5

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js" type="text/javascript"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" type="text/javascript"></script>
<script crossorigin src="https://unpkg.com/videoact@0.0.2/lib/index.js" type="text/javascript"></script>
<script type="text/javascript">
  var props = {
    src: 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4',
    autoplay: true,
    controls: true,
  };
  ReactDOM.render(
    React.createElement(videoact.default, props, null),
    document.getElementById('app')
  );
</script> 
```

### Properties

##### Example

```jsx
<Videoact
  autoplay={true}
  controls={true}
  src={'https://www.videos.com/video.mp4'}
/>
```

##### List

| Property | Description | Default |
| :-- | :-- | :-- |
| autoplay | `set` Set if the video should start playing as soon as it is loaded | false |
| controls | `set` Set if the video should display controls (like play/pause etc.) | true |
| crossOrigin | `set` the CORS settings of the video | "anonymous" |
| currentTime | `set` the current playback position in the video (in seconds) | 0 |
| defaultMuted | `set` Set if the video should be muted by default | false |
| defaultPlaybackRate | `set` the default speed of the video playback | 1 |
| download | `set` the download option | false |
| height | `set` the video height | null |
| loop | `set` Set if the video should start over again when finished | false |
| mediaGroup | `set` the group the video belongs to (used to link multiple video elements) | "videoact" |
| muted | `set` Set if the video is muted or not | false |
| playbackRate | `set` the speed of the video playback | 1 |
| preload | `set` Set if the video should be loaded when the page loads | false |
| ratio | `set` the video aspect ratio | 3.166 *`(19/6)`* |
| src | `set` the current source of the video element | "" |
| volume | `set` the volume of the video | 1 |
| width | `set` the video width | "100%" |

> Note:
> If `width` and `height` was specified, the `ratio` be ignored
> also if you want to keep the original video aspect ratio set `ratio` it to `null`

#### Property list (get)

##### Example

```jsx
<Videoact {...props} ref={e => {this.video = e}} />
<button onClick={()=> { alert(this.video.duration) }}>video duration</button>
```
##### List

| Property | Description |
| :-- | :-- |
| audioTracks | `get` an AudioTrackList object representing available audio tracks |
| autoplay | `get` whether the video should start playing as soon as it is loaded |
| buffered | `get` a TimeRanges object representing the buffered parts of the video |
| controller | `get` the MediaController object representing the current media controller of the video |
| controls | `get` whether the video should display controls (like play/pause etc.) |
| crossOrigin | `get` the CORS settings of the video | "anonymous" |
| currentSrc | `get` the URL of the current video |
| currentTime | `get` the current playback position in the video (in seconds) |
| defaultMuted | `get` whether the video should be muted by default |
| defaultPlaybackRate | `get` the default speed of the video playback |
| duration | `get` the length of the current video (in seconds) |
| ended | `get` whether the playback of the video has ended or not |
| error | `get` a MediaError object representing the error state of the video |
| loop | `get` whether the video should start over again when finished |
| mediaGroup | `get` the group the video belongs to (used to link multiple video elements) |
| muted | `get` whether the video is muted or not |
| networkState | `get` the current network state of the video |
| paused | `get` whether the video is paused or not |
| playbackRate | `get` the speed of the video playback |
| played | `get` a TimeRanges object representing the played parts of the video |
| preload | `get` whether the video should be loaded when the page loads |
| readyState | `get` the current ready state of the video |
| seekable | `get` a TimeRanges object representing the seekable parts of the video |
| seeking | `get` whether the user is currently seeking in the video |
| src | `get` the current source of the video element |
| startDate | `get` a Date object representing the current time offset |
| textTracks | `get` a TextTrackList object representing the available text tracks |
| videoTracks | `get` a VideoTrackList object representing the available video tracks |
| volume | `get` the volume of the video |

### Events

The HTML5 DOM has events for the video elements, so all what I did here is mapping the native events to videoact component.

##### Example

```jsx
<Videoact
  {...props}
  onEnded={() => { alert('finished') }}
  onPause={() => { alert('paused') }}
/>
```

##### List
| Event | Description |
| :-- | :-- |
| onAbort | When the loading of an video is aborted |
| onCanPlay | When the browser can start playing the video |
| onCanPlayThrough | When the browser can play through the video without stopping for buffering |
| onDurationChange | When the download button clicked |
| onDurationChange | When the duration of the video is changed |
| onEmptied | When the current playlist is empty |
| onEnded | When the current playlist is ended |
| onError | When an error occurred during the loading of an video |
| onLoadedData | When the browser has loaded the current frame of the video |
| onLoadedMetadata | When the browser has loaded meta data for the video |
| onLoadStart | When the browser starts looking for the video |
| onPause | When the video has been paused |
| onPlay | When the video has been started or is no longer paused |
| onPlaying | When the video is playing after having been paused or stopped for buffering |
| onProgress | When the browser is downloading the video |
| onRateChange | When the playing speed of the video is changed |
| onSeeked | When the user is finished moving/skipping to a new position in the video |
| onSeeking | When the user starts moving/skipping to a new position in the video |
| onStalled | When the browser is trying to get media data, but data is not available |
| onSuspend | When the browser is intentionally not getting media data |
| onTimeUpdate | When the current playback position has changed |
| onVolumeChange | When the volume has been changed |
| onWaiting | When the video stops because it needs to buffer the next frame |

### Methods
These are all the HTML5 video methods that allow you to manipulate the videoact component.

#### Example
```jsx
<Videoact {...props} ref={e => {this.video = e}} />
<button onClick={()=> { this.video.play() }} >play</button>
```

#### Method list

| Method | Description |
| :-- | :-- |
| addTextTrack | Adds a new text track to the video |
| canPlayType | Checks if the browser can play the specified video type |
| load | Re-loads the video element |
| play | Starts playing the video |
| pause | Pauses the currently playing video |
| fullscreen* | Request full screen if supported |
| exitFullscreen* | Request exit from full screen |

> Note:
> Fullscreen need to be called from within an event handler or otherwise they will be denied.

### Methods

- add volume control
- add seeker