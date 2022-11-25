# &lt;user-media&gt;

`<user-media>` component attributes and API documentation.


<!-- Auto Generated Below -->


## Properties

| Property               | Attribute               | Description                                                                                                                                                                                                                                                                                                                                                                                                                | Type                                                  | Default      |
| ---------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------ |
| `aspectRatio`          | `aspect-ratio`          | The exact aspect ratio (width in pixels divided by height in pixels, represented as a double rounded to the tenth decimal place) or aspect ratio range.                                                                                                                                                                                                                                                                    | `number`                                              | `undefined`  |
| `audio`                | `audio`                 | Simple boolean constraint that will use default stream values if none others are specified. Must be set to `true` to enable the audio track.                                                                                                                                                                                                                                                                               | `boolean`                                             | `false`      |
| `audioDeviceId`        | `audio-device-id`       | ID for selecting a specific audio device                                                                                                                                                                                                                                                                                                                                                                                   | `string`                                              | `undefined`  |
| `autoGainControl`      | `auto-gain-control`     | Automatically adjusts the volume of the input from the mic                                                                                                                                                                                                                                                                                                                                                                 | `boolean`                                             | `undefined`  |
| `autoplay`             | `autoplay`              | Video element attribute                                                                                                                                                                                                                                                                                                                                                                                                    | `boolean`                                             | `true`       |
| `brightness`           | `brightness`            | Brightness is "the attribute of a visual sensation according to which an area appears to emit more or less light" and in the context of the present API, it refers to the numeric camera setting that adjusts the perceived amount of light emitting from the photo object. A higher brightness setting increases the intensity of darker areas in a scene while compressing the intensity of brighter parts of the scene. | `number`                                              | `undefined`  |
| `channelCount`         | `channel-count`         | Number of channels to use with 1 being mono, 2 being stereo                                                                                                                                                                                                                                                                                                                                                                | `number`                                              | `undefined`  |
| `colorTemperature`     | `color-temperature`     | This range reflects the supported correlated color temperatures to be used for the scene white balance calculation:  incandescent	2500-3500 fluorescent	4000-5000 warm-fluorescent	5000-5500 daylight	5500-6500 cloudy-daylight	6500-8000 twilight	8000-9000 shade	9000-10000                                                                                                                                              | `number`                                              | `undefined`  |
| `contrast`             | `contrast`              | Contrast is the numeric camera setting that controls the difference in brightness between light and dark areas in a scene. A higher contrast setting reflects an expansion in the difference in brightness.                                                                                                                                                                                                                | `number`                                              | `undefined`  |
| `controls`             | `controls`              | Video element attribute                                                                                                                                                                                                                                                                                                                                                                                                    | `boolean`                                             | `false`      |
| `echoCancellation`     | `echo-cancellation`     | Echo cancellation to prevent feedback between the mic and speakers                                                                                                                                                                                                                                                                                                                                                         | `boolean`                                             | `undefined`  |
| `exposureCompensation` | `exposure-compensation` | Exposure Compensation is a numeric camera setting that adjusts the exposure level from the current value used by the implementation. This value can be used to bias the exposure level enabled by auto-exposure, and usually is a symmetric range around 0 EV (the no-compensation value). This value is only used in single-shot and continuous exposureMode.                                                             | `number`                                              | `undefined`  |
| `exposureMode`         | `exposure-mode`         | Exposure is the amount of light that is allowed to fall on the photosensitive device. In auto-exposure modes (single-shot or continuous exposureMode), the exposure time and/or camera aperture are automatically adjusted by the implementation based on the subject of the photo. In manual exposureMode, these parameters are set to fixed absolute values.                                                             | `"continuous" \| "manual" \| "none" \| "single-shot"` | `undefined`  |
| `exposureTime`         | `exposure-time`         | Exposure Time is a numeric camera setting that controls the length of time during which light is allowed to fall on the photosensitive device. This value is used in manual exposureMode to control exposure. The value is in 100 microsecond units. That is, a value of 1.0 means an exposure time of 1/10000th of a second and a value of 10000.0 means an exposure time of 1 second.                                    | `number`                                              | `undefined`  |
| `focusDistance`        | `focus-distance`        | Focus distance is a numeric camera setting that controls the focus distance of the lens. The setting usually represents distance in meters to the optimal focus distance.                                                                                                                                                                                                                                                  | `number`                                              | `undefined`  |
| `focusMode`            | `focus-mode`            | Focus mode describes the focus setting of the capture device (e.g. auto or manual).                                                                                                                                                                                                                                                                                                                                        | `"continuous" \| "manual" \| "single-shot"`           | `undefined`  |
| `frameRate`            | `frame-rate`            | Refresh rate of the video in frames per second                                                                                                                                                                                                                                                                                                                                                                             | `number`                                              | `undefined`  |
| `height`               | `height`                | Requested height of video track                                                                                                                                                                                                                                                                                                                                                                                            | `number`                                              | `undefined`  |
| `iso`                  | `iso`                   | The ISO setting of a camera describes the sensitivity of the camera to light. It is a numeric value, where the lower the value the greater the sensitivity.                                                                                                                                                                                                                                                                | `number`                                              | `undefined`  |
| `latency`              | `latency`               | controls the time between the start of the sound processing and the data being made available to the next step, specified in seconds                                                                                                                                                                                                                                                                                       | `number`                                              | `undefined`  |
| `muted`                | `muted`                 | Video element attribute                                                                                                                                                                                                                                                                                                                                                                                                    | `boolean`                                             | `true`       |
| `noiseSuppression`     | `noise-suppression`     | Removes the background noise from the audio signal                                                                                                                                                                                                                                                                                                                                                                         | `boolean`                                             | `undefined`  |
| `pan`                  | `pan`                   | Pan is a numeric camera setting that controls the pan of the camera. The setting represents pan in arc seconds, which are 1/3600th of a degree. Values are in the range from -180*3600 arc seconds to +180*3600 arc seconds. Positive values pan the camera clockwise as viewed from above, and negative values pan the camera counter clockwise as viewed from above.                                                     | `number`                                              | `undefined`  |
| `playsinline`          | `playsinline`           | Video element attribute                                                                                                                                                                                                                                                                                                                                                                                                    | `boolean`                                             | `true`       |
| `pointsOfInterest`     | --                      | Points of interest describe the metering area centers used in other settings, e.g. exposure, white balance mode and focus mode each one being a Point2D (usually these three controls are modified simultaneously by the so-called 3A algorithm: auto-focus, auto-exposure, auto-white-balance).                                                                                                                           | `Point2D[]`                                           | `undefined`  |
| `resizeMode`           | `resize-mode`           | Determines if the UA is allowed to use cropping and downscaling on the camera output                                                                                                                                                                                                                                                                                                                                       | `"crop-and-scale" \| "none"`                          | `undefined`  |
| `sampleRate`           | `sample-rate`           | Specifies a desired sample rate, higher is better (Audio CDs for example have 44000 samples/s or 44kHz)                                                                                                                                                                                                                                                                                                                    | `number`                                              | `undefined`  |
| `sampleSize`           | `sample-size`           | The linear sample size in bits. This constraint can only be satisfied for audio devices that produce linear samples                                                                                                                                                                                                                                                                                                        | `number`                                              | `undefined`  |
| `saturation`           | `saturation`            | Saturation is "the colourfulness of an area judged in proportion to its brightness" and in the current context it refers to a numeric camera setting that controls the intensity of color in a scene (i.e. the amount of gray in the scene). Very low saturation levels will result in photos closer to black-and-white.                                                                                                   | `number`                                              | `undefined`  |
| `sharpness`            | `sharpness`             | Sharpness is a numeric camera setting that controls the intensity of edges in a scene. Higher sharpness settings result in higher contrast along the edges, while lower settings result in less contrast and blurrier edges (i.e. soft focus).                                                                                                                                                                             | `number`                                              | `undefined`  |
| `stream`               | --                      | Reference to current stream, mainly for debugging                                                                                                                                                                                                                                                                                                                                                                          | `MediaStream`                                         | `undefined`  |
| `streamState`          | `stream-state`          | Reflected attribute for styling based on stream state                                                                                                                                                                                                                                                                                                                                                                      | `"active" \| "inactive"`                              | `'inactive'` |
| `tilt`                 | `tilt`                  | Tilt is a numeric camera setting that controls the tilt of the camera. The setting represents tilt in arc seconds, which are 1/3600th of a degree. Values are in the range from -180*3600 arc seconds to +180*3600 arc seconds. Positive values tilt the camera upward when viewed from the front, and negative values tilt the camera downward as viewed from the front.                                                  | `number`                                              | `undefined`  |
| `torch`                | `torch`                 | Turns on the devices fill light                                                                                                                                                                                                                                                                                                                                                                                            | `boolean`                                             | `undefined`  |
| `video`                | `video`                 | Simple boolean constraint that will use default stream values if none others are specified. Must be set to `true` to enable the video track.                                                                                                                                                                                                                                                                               | `boolean`                                             | `true`       |
| `videoDeviceId`        | `video-device-id`       | ID for selecting a specific video device                                                                                                                                                                                                                                                                                                                                                                                   | `string`                                              | `undefined`  |
| `videoFacingMode`      | `video-facing-mode`     | Video track constraint for facing mode                                                                                                                                                                                                                                                                                                                                                                                     | `"environment" \| "left" \| "right" \| "user"`        | `undefined`  |
| `volume`               | `volume`                | Video element attribute                                                                                                                                                                                                                                                                                                                                                                                                    | `number`                                              | `1`          |
| `whiteBalanceMode`     | `white-balance-mode`    | White balance mode is a setting that cameras use to adjust for different color temperatures. Color temperature is the temperature of background light (usually measured in Kelvin).                                                                                                                                                                                                                                        | `"continuous" \| "manual" \| "none" \| "single-shot"` | `undefined`  |
| `width`                | `width`                 | Requested width of video track                                                                                                                                                                                                                                                                                                                                                                                             | `number`                                              | `undefined`  |
| `zoom`                 | `zoom`                  | Zoom is a numeric camera setting that controls the focal length of the lens. The setting usually represents a ratio, e.g. 4 is a zoom ratio of 4:1. The minimum value is usually 1, to represent a 1:1 ratio (i.e. no zoom).                                                                                                                                                                                               | `number`                                              | `undefined`  |


## Events

| Event             | Description                             | Type               |
| ----------------- | --------------------------------------- | ------------------ |
| `frameupdate`     | Emitted when video frame is updated     | `CustomEvent<any>` |
| `streamactive`    | Emitted when stream becomes active      | `CustomEvent<any>` |
| `streaminactive`  | Emitted when stream becomes inactive    | `CustomEvent<any>` |
| `streaminiterror` | Emitted when stream fails to initialize | `CustomEvent<any>` |


## Methods

### `applyConstraints(constraints: MediaTrackConstraints, type?: 'audio' | 'video', trackIndex?: number) => Promise<void>`

Applies constraints to a specific track
https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/applyConstraints

#### Returns

Type: `Promise<void>`



### `createConstraints() => Promise<MediaStreamConstraints>`

Creates a MediaStreamConstraints object based on component attributes

#### Returns

Type: `Promise<MediaStreamConstraints>`



### `getCapabilities(type?: 'audio' | 'video', trackIndex?: number) => Promise<MediaTrackCapabilities>`

Get an object of key/booleans that detail supported track capabilities
https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities

#### Returns

Type: `Promise<MediaTrackCapabilities>`



### `getConstraints(type?: 'audio' | 'video', trackIndex?: number) => Promise<void>`

Gets constraints of a specific track
https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getConstraints

#### Returns

Type: `Promise<void>`



### `getMediaDevices(kind: MediaDeviceKind) => Promise<MediaDeviceInfo[]>`

Get a list of available media devices, filtered by kind

#### Returns

Type: `Promise<MediaDeviceInfo[]>`



### `getSupportedConstraints() => Promise<MediaTrackSupportedConstraints>`

Get a list of supported constraints
https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Constraints#specifications

#### Returns

Type: `Promise<MediaTrackSupportedConstraints>`



### `getTrackSettings(type?: 'audio' | 'video', trackIndex?: number) => Promise<MediaTrackSettings>`

Returns the actual track settings after constraints are applied
https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getSettings

#### Returns

Type: `Promise<MediaTrackSettings>`



### `getVideoElement() => Promise<HTMLVideoElement>`

Get the video element used to show the stream

#### Returns

Type: `Promise<HTMLVideoElement>`



### `stopStream() => Promise<void>`

Stops the current stream (all tracks)

#### Returns

Type: `Promise<void>`



### `viewDocumentation() => Promise<void>`

Read the docs! Calling this method opens a new browser window and loads the component API documentation.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
