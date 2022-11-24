/** 
 * Component wrapper for getUserMedia
 * https://w3c.github.io/mediacapture-main 
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#examples 
 * https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API 
*/

/*

  TODO 
  min, max, ideal, exact size constraints
  groupId: https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/groupId
  displaySurface: https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/displaySurface
  logicalSurface: https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/logicalSurface

  Eventually add support for ImageCaptureAPI
  https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API

*/

import { Component, Host, h, Element, Prop, Watch, Method, Event, EventEmitter } from '@stencil/core'

export type MediaStreamState = 'active' | 'inactive'
export type VideoFacingModeEnum = 'user' | 'environment' | 'left' | 'right'
export type VideoResizeModeEnum = 'none' | 'crop-and-scale'
export type FocusModeEnum = 'manual' | 'single-shot' | 'continuous'
export type MeteringModeEnum = 'none' | 'manual' | 'single-shot' | 'continuous'
export type Point2D = { x: 0, y: 0 }

function anyDefined(...args: any) { return !![...arguments].some(v => v !== undefined) }

@Component({
  tag: 'user-media',
  styleUrl: 'user-media.css',
  shadow: true,
})
export class UserMedia {

  // stream constraints
  /**
   * ID for selecting a specific video device
   * */
  @Prop({ reflect: true }) videoDeviceId: string
  /**
   * ID for selecting a specific audio device
   * */
  @Prop({ reflect: true }) audioDeviceId: string

  // video constraints
  /**
   * Simple boolean constraint that will use default stream values if none others are specified. Must be set to `true` to enable the video track.
   * */
  @Prop({ reflect: true }) video: boolean = true
  /**
   * Requested width of video track
   * */
  @Prop({ reflect: true }) width: number
  /**
   * Requested height of video track
   * */
  @Prop({ reflect: true }) height: number
  /**
   * Video track constraint for facing mode
   * */
  @Prop({ reflect: true }) videoFacingMode: VideoFacingModeEnum //MediaTrackConstraintSet["facingMode"]

  /**
   * Determines if the UA is allowed to use cropping and downscaling on the camera output
   */
  @Prop({ reflect: true }) resizeMode: VideoResizeModeEnum

  /**
   * The exact aspect ratio (width in pixels divided by height in pixels, represented as a double rounded to the tenth decimal place) or aspect ratio range.
   */
  @Prop({ reflect: true }) aspectRatio: number

  // audio constraints
  /**
   * Simple boolean constraint that will use default stream values if none others are specified. Must be set to `true` to enable the audio track.
   * */
  @Prop({ reflect: true }) audio: boolean = false

  /**
   * Specifies a desired sample rate, higher is better (Audio CDs for example have 44000 samples/s or 44kHz)
   */
  @Prop({ reflect: true }) sampleRate: number
  /**
   * The linear sample size in bits. This constraint can only be satisfied for audio devices that produce linear samples
   */
  @Prop({ reflect: true }) sampleSize: number
  /**
   * Echo cancellation to prevent feedback between the mic and speakers
   */
  @Prop({ reflect: true }) echoCancellation: boolean
  /**
   * Automatically adjusts the volume of the input from the mic
   */
  @Prop({ reflect: true }) autoGainControl: boolean
  /**
   * Removes the background noise from the audio signal
   */
  @Prop({ reflect: true }) noiseSuppression: boolean
  /**
   * controls the time between the start of the sound processing and the data being made available to the next step, specified in seconds
   */
  @Prop({ reflect: true }) latency: number
  /**
   * Number of channels to use with 1 being mono, 2 being stereo
   */
  @Prop({ reflect: true }) channelCount: number

  /**
   * Refresh rate of the video in frames per second
   */
  @Prop({ reflect: true }) frameRate: number

  /**
   * Brightness is "the attribute of a visual sensation according to which an area appears to emit more or less light" and in the context of the present API, it refers to the numeric camera setting that adjusts the perceived amount of light emitting from the photo object. A higher brightness setting increases the intensity of darker areas in a scene while compressing the intensity of brighter parts of the scene.
   */
  @Prop({ reflect: true }) brightness: number

  /**
   * This range reflects the supported correlated color temperatures to be used for the scene white balance calculation: 
   * incandescent	2500-3500
   * fluorescent	4000-5000
   * warm-fluorescent	5000-5500
   * daylight	5500-6500
   * cloudy-daylight	6500-8000
   * twilight	8000-9000
   * shade	9000-10000
   */
  @Prop({ reflect: true }) colorTemperature: number

  /**
   * Contrast is the numeric camera setting that controls the difference in brightness between light and dark areas in a scene. A higher contrast setting reflects an expansion in the difference in brightness. 
   */
  @Prop({ reflect: true }) contrast: number

  /**
   * Exposure Compensation is a numeric camera setting that adjusts the exposure level from the current value used by the implementation. This value can be used to bias the exposure level enabled by auto-exposure, and usually is a symmetric range around 0 EV (the no-compensation value). This value is only used in single-shot and continuous exposureMode.
   */
  @Prop({ reflect: true }) exposureCompensation: number

  /**
   * Exposure is the amount of light that is allowed to fall on the photosensitive device. In auto-exposure modes (single-shot or continuous exposureMode), the exposure time and/or camera aperture are automatically adjusted by the implementation based on the subject of the photo. In manual exposureMode, these parameters are set to fixed absolute values.
   */
  @Prop({ reflect: true }) exposureMode: MeteringModeEnum

  /**
   * Exposure Time is a numeric camera setting that controls the length of time during which light is allowed to fall on the photosensitive device. This value is used in manual exposureMode to control exposure. The value is in 100 microsecond units. That is, a value of 1.0 means an exposure time of 1/10000th of a second and a value of 10000.0 means an exposure time of 1 second.
   */
  @Prop({ reflect: true }) exposureTime: number

  /**
   * Focus distance is a numeric camera setting that controls the focus distance of the lens. The setting usually represents distance in meters to the optimal focus distance.
   */
  @Prop({ reflect: true }) focusDistance: number

  /**
   * Focus mode describes the focus setting of the capture device (e.g. auto or manual).
   */
  @Prop({ reflect: true }) focusMode: FocusModeEnum

  /**
   * The ISO setting of a camera describes the sensitivity of the camera to light. It is a numeric value, where the lower the value the greater the sensitivity.
   */
  @Prop({ reflect: true }) iso: number

  /**
   * Pan is a numeric camera setting that controls the pan of the camera. The setting represents pan in arc seconds, which are 1/3600th of a degree. Values are in the range from -180*3600 arc seconds to +180*3600 arc seconds. Positive values pan the camera clockwise as viewed from above, and negative values pan the camera counter clockwise as viewed from above.
   */
  @Prop({ reflect: true }) pan: number

  /**
   * Points of interest describe the metering area centers used in other settings, e.g. exposure, white balance mode and focus mode each one being a Point2D (usually these three controls are modified simultaneously by the so-called 3A algorithm: auto-focus, auto-exposure, auto-white-balance).
   */
  @Prop({ reflect: true }) pointsOfInterest: Array<Point2D>

  /**
   * Saturation is "the colourfulness of an area judged in proportion to its brightness" and in the current context it refers to a numeric camera setting that controls the intensity of color in a scene (i.e. the amount of gray in the scene). Very low saturation levels will result in photos closer to black-and-white.
   */
  @Prop({ reflect: true }) saturation: number

  /**
   * Sharpness is a numeric camera setting that controls the intensity of edges in a scene. Higher sharpness settings result in higher contrast along the edges, while lower settings result in less contrast and blurrier edges (i.e. soft focus).
   */
  @Prop({ reflect: true }) sharpness: number

  /**
   * Tilt is a numeric camera setting that controls the tilt of the camera. The setting represents tilt in arc seconds, which are 1/3600th of a degree. Values are in the range from -180*3600 arc seconds to +180*3600 arc seconds. Positive values tilt the camera upward when viewed from the front, and negative values tilt the camera downward as viewed from the front.
   */
  @Prop({ reflect: true }) tilt: number

  /**
   * Turns on the devices fill light
   */
  @Prop({ reflect: true }) torch: boolean

  /**
   * White balance mode is a setting that cameras use to adjust for different color temperatures. Color temperature is the temperature of background light (usually measured in Kelvin).
   */
  @Prop({ reflect: true }) whiteBalanceMode: MeteringModeEnum

  /**
   * Zoom is a numeric camera setting that controls the focal length of the lens. The setting usually represents a ratio, e.g. 4 is a zoom ratio of 4:1. The minimum value is usually 1, to represent a 1:1 ratio (i.e. no zoom).
   */
  @Prop({ reflect: true }) zoom: number

  private videoElement: HTMLVideoElement
  /**
   * Get the video element used to show the stream
   * */
  @Method() getVideoElement(): Promise<HTMLVideoElement> {
    return new Promise((resolve) => {
      const wait = (cb) => {
        setTimeout(cb, 100)
      }
      const tryResolving = () => {
        if (this.videoElement) return resolve(this.videoElement)
        else wait(tryResolving)
      }
    })
  }

  // video attributes
  /**
   * Video element attribute
   * */
  @Prop() controls: boolean = false

  /**
   * Video element attribute
   * */
  @Prop() muted: boolean = true

  /**
   * Video element attribute
   * */
  @Prop() volume: number = 1
  @Watch('volume')
  setVolume() {
    this.videoElement.volume = this.volume
  }

  /**
   * Video element attribute
   * */
  @Prop() autoplay: boolean = true

  /**
   * Video element attribute
   * */
  @Prop() playsinline: boolean = true

  /**
   * Reference to current stream, mainly for debugging
   * */
  @Prop({ mutable: true }) stream: MediaStream

  /**
   * Emitted when stream becomes active
   * */
  @Event() streamactive: EventEmitter

  /**
   * Emitted when stream becomes inactive
   * */
  @Event() streaminactive: EventEmitter

  /**
   * Emitted when video frame is updated
   * */
  @Event() frameupdate: EventEmitter

  /**
   * Emitted when stream fails to initialize
   * */
  @Event() streaminiterror: EventEmitter

  /**
   * Reflected attribute for styling based on stream state
   * */
  @Prop({ reflect: true, mutable: true }) streamState: MediaStreamState = 'inactive'

  @Element() el: HTMLElement

  componentDidLoad() {
    this.videoElement = this.el.shadowRoot.querySelector('video')

    // NOTE stream in/active events are dead (?) so we are doing it manually
    this.videoElement.addEventListener('playing', () => {
      this.setStreamState('active')
    })
    this.initStream()
  }

  private lastTime = -1
  onFrame() {
    if (this.streamState === 'active') requestAnimationFrame(this.onFrame.bind(this))
    var time = this.videoElement.currentTime
    if (time !== this.lastTime) {
      this.lastTime = time
      this.frameupdate.emit(time)
    }
  }

  // listen for all constraint prop changes, re-init stream
  @Watch('video')
  @Watch('videoDeviceId')
  @Watch('videoFacingMode')
  @Watch('aspectRatio')
  @Watch('resizeMode')
  @Watch('audio')
  @Watch('audioDeviceId')
  @Watch('sampleRate')
  @Watch('sampleSize')
  @Watch('echoCancellation')
  @Watch('autoGainControl')
  @Watch('noiseSuppression')
  @Watch('channelCount')
  @Watch('latency')
  async reInit() {
    // console.log('reinit')
    // TODO clean up old stream if it's there? Is this necessary?
    // if(this.stream) await this.stopStream()
    this.initStream()
  }

  // TODO determine which constraints don't require a full reinit, use applyConstraints
  // updateAudioConstraints(newVal, oldVal, constraint){
  //   console.log('updateAudioConstraints', arguments)  
  //   this.applyConstraints({
  //     [constraint]: newVal
  //   }, 'audio')
  // }

  @Watch('width')
  @Watch('height')
  @Watch('frameRate')
  @Watch('brightness')
  @Watch('colorTemperature')
  @Watch('contrast')
  @Watch('exposureCompensation')
  @Watch('exposureMode')
  @Watch('exposureTime')
  @Watch('focusDistance')
  @Watch('focusMode')
  @Watch('iso')
  @Watch('pan')
  @Watch('pointsOfInterest')
  @Watch('saturation')
  @Watch('sharpness')
  @Watch('tilt')
  @Watch('torch')
  @Watch('whiteBalanceMode')
  @Watch('zoom')
  updateVideoConstraints(newVal, oldVal, constraint) {
    console.log('updateVideoConstraints', arguments)
    this.applyConstraints({
      advanced: [{ [constraint]: newVal }]
    }, 'video')
  }

  getTrack(type: 'audio' | 'video' = 'video', trackIndex = 0): MediaStreamTrack {
    if (!this.stream || !this.stream.active) throw new Error('stream is not active')
    let track: MediaStreamTrack
    if (type === 'video') {
      track = this.stream.getVideoTracks()[trackIndex]
    } else if (type === 'audio') {
      track = this.stream.getAudioTracks()[trackIndex]
    }
    if (!track) throw new Error(`Can't get ${type} track from the current stream`)
    return track
  }

  async initStream() {
    this.setStreamState('inactive')
    try {
      const constraints: MediaStreamConstraints = await this.createConstraints()
      this.stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.videoElement.srcObject = this.stream
    } catch (err) {
      this.streaminiterror.emit(err)
    }
  }

  setStreamState(state: MediaStreamState) {
    this.streamState = state
    if (state === 'active') {
      this.streamactive.emit()
      this.onFrame()
    } else {
      this.streaminactive.emit()
    }
  }

  /**
   * Creates a MediaStreamConstraints object based on component attributes
   * */
  @Method()
  async createConstraints(): Promise<MediaStreamConstraints> {
    let constraints: MediaStreamConstraints = {
      audio: this.audio,
      video: this.video
    }
    if (this.video) { // must be true to activate video stream
      // check any of the video constraints to determine if we need to construct the video constraints object
      if (anyDefined(this.width, this.height, this.videoFacingMode, this.videoDeviceId)) {
        constraints.video = {}
        if (this.videoDeviceId) constraints.video.deviceId = this.videoDeviceId
        if (this.width) constraints.video.width = { ideal: this.width }
        if (this.height) constraints.video.height = { ideal: this.height }
        if (this.videoFacingMode) constraints.video.facingMode = this.videoFacingMode
        if (this.resizeMode) (constraints.video as any).resizeMode = this.resizeMode
        // TODO check if we need to define this?
        const advanced = constraints.video.advanced = []
        if (this.brightness !== undefined) advanced.push({ brightness: this.brightness })
        if (this.colorTemperature !== undefined) advanced.push({ colorTemperature: this.colorTemperature })
        if (this.contrast !== undefined) advanced.push({ contrast: this.contrast })
        if (this.exposureCompensation !== undefined) advanced.push({ exposureCompensation: this.exposureCompensation })
        if (this.exposureMode !== undefined) advanced.push({ exposureMode: this.exposureMode })
        if (this.exposureTime !== undefined) advanced.push({ exposureTime: this.exposureTime })
        if (this.focusDistance !== undefined) advanced.push({ focusDistance: this.focusDistance })
        if (this.focusMode !== undefined) advanced.push({ focusMode: this.focusMode })
        if (this.iso !== undefined) advanced.push({ iso: this.iso })
        if (this.pan !== undefined) advanced.push({ pan: this.pan })
        if (this.pointsOfInterest !== undefined) advanced.push({ pointsOfInterest: this.pointsOfInterest })
        if (this.saturation !== undefined) advanced.push({ saturation: this.saturation })
        if (this.sharpness !== undefined) advanced.push({ sharpness: this.sharpness })
        if (this.tilt !== undefined) advanced.push({ tilt: this.tilt })
        if (this.torch !== undefined) advanced.push({ torch: this.torch })
        if (this.whiteBalanceMode !== undefined) advanced.push({ whiteBalanceMode: this.whiteBalanceMode })
        if (this.zoom !== undefined) advanced.push({ zoom: this.zoom })
        if (this.frameRate !== undefined) advanced.push({ frameRate: this.frameRate })

      }
      // width: { min: 1024, ideal: 1280, max: 1920 },
      // height: { min: 576, ideal: 720, max: 1080 }
    }

    if (this.audio) {
      if (anyDefined(
        this.sampleRate,
        this.sampleSize,
        this.echoCancellation,
        this.autoGainControl,
        this.noiseSuppression,
        this.latency,
        this.channelCount)) {
        constraints.audio = {}
        if (this.audioDeviceId) constraints.audio.deviceId = this.audioDeviceId
        if (this.sampleRate) constraints.audio.sampleRate = this.sampleRate
        if (this.sampleSize) constraints.audio.sampleSize = this.sampleSize
        if (this.echoCancellation !== undefined) constraints.audio.echoCancellation = this.echoCancellation
        if (this.autoGainControl !== undefined) constraints.audio.autoGainControl = this.autoGainControl
        if (this.noiseSuppression !== undefined) constraints.audio.noiseSuppression = this.noiseSuppression
        if (this.latency !== undefined) constraints.audio.latency = this.latency
        if (this.channelCount) constraints.audio.channelCount = this.channelCount
      }
    }
    return constraints
  }

  /**
   * Applies constraints to a specific track
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/applyConstraints
   * */
  @Method()
  async applyConstraints(constraints: MediaTrackConstraints, type: 'audio' | 'video' = 'video', trackIndex = 0): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.getTrack(type, trackIndex).applyConstraints(constraints)
        resolve()
      } catch (e) {
        reject(e)
        console.error(e)
      }
    })
  }

  /**
   * Gets constraints of a specific track
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getConstraints
   * */
  @Method()
  async getConstraints(type: 'audio' | 'video' = 'video', trackIndex = 0): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.getTrack(type, trackIndex).getConstraints()
        resolve()
      } catch (e) {
        reject(e)
        console.error(e)
      }
    })
  }

  /**
   * Get an object of key/booleans that detail supported track capabilities
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities
   * */
  @Method()
  async getCapabilities(type: 'audio' | 'video' = 'video', trackIndex = 0): Promise<MediaTrackCapabilities> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.getTrack(type, trackIndex).getCapabilities())
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * Returns the actual track settings after constraints are applied
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getSettings
   * */
  @Method()
  async getTrackSettings(type: 'audio' | 'video' = 'video', trackIndex = 0): Promise<MediaTrackSettings> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.getTrack(type, trackIndex).getSettings())
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * Stops the current stream (all tracks)
   * */
  @Method()
  async stopStream(): Promise<void> {
    this.stream.getTracks().forEach(track => track.stop())
    this.setStreamState('inactive')
  }

  /**
   * Get a list of available media devices, filtered by kind
   * */
  @Method()
  async getMediaDevices(kind: MediaDeviceKind): Promise<MediaDeviceInfo[]> {
    if (['videoinput', 'audioinput', 'audiooutput'].indexOf(kind) === -1) return Promise.reject(new Error('kind must be videoinput, audioinput, or audiooutput'))
    const devices = await navigator.mediaDevices.enumerateDevices()
    return kind ? devices.filter(device => device.kind === kind) : devices
  }

  /**
   * Get a list of supported constraints
   * https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Constraints#specifications
   * */
  @Method()
  async getSupportedConstraints(): Promise<MediaTrackSupportedConstraints> {
    return Promise.resolve(navigator.mediaDevices.getSupportedConstraints())
  }

  /**
   * Read the docs! Calling this method opens a new browser window and loads the component API documentation.
   * */
  @Method()
  async viewDocumentation() {
    await window.open('https://github.com/The-AR-Company/user-media-component/blob/master/user-media/src/components/user-media/readme.md', '_blank')
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <video
          ref={el => this.videoElement = el as HTMLVideoElement}
          controls={this.controls}
          muted={this.muted}
          autoplay={this.autoplay}
          playsinline={this.playsinline}
        ></video>
      </Host>
    )
  }

}
