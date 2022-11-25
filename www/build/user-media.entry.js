import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-5016bdb2.js';

const userMediaCss = ":host{display:block}video{width:100%;height:100%;object-fit:contain}";

function anyDefined(...args) { return !![...arguments].some(v => v !== undefined); }
const UserMedia = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.streamactive = createEvent(this, "streamactive", 7);
    this.streaminactive = createEvent(this, "streaminactive", 7);
    this.frameupdate = createEvent(this, "frameupdate", 7);
    this.streaminiterror = createEvent(this, "streaminiterror", 7);
    this.lastTime = -1;
    this.videoDeviceId = undefined;
    this.audioDeviceId = undefined;
    this.video = true;
    this.width = undefined;
    this.height = undefined;
    this.videoFacingMode = undefined;
    this.resizeMode = undefined;
    this.aspectRatio = undefined;
    this.audio = false;
    this.sampleRate = undefined;
    this.sampleSize = undefined;
    this.echoCancellation = undefined;
    this.autoGainControl = undefined;
    this.noiseSuppression = undefined;
    this.latency = undefined;
    this.channelCount = undefined;
    this.frameRate = undefined;
    this.brightness = undefined;
    this.colorTemperature = undefined;
    this.contrast = undefined;
    this.exposureCompensation = undefined;
    this.exposureMode = undefined;
    this.exposureTime = undefined;
    this.focusDistance = undefined;
    this.focusMode = undefined;
    this.iso = undefined;
    this.pan = undefined;
    this.pointsOfInterest = undefined;
    this.saturation = undefined;
    this.sharpness = undefined;
    this.tilt = undefined;
    this.torch = undefined;
    this.whiteBalanceMode = undefined;
    this.zoom = undefined;
    this.controls = false;
    this.muted = true;
    this.volume = 1;
    this.autoplay = true;
    this.playsinline = true;
    this.stream = undefined;
    this.streamState = 'inactive';
  }
  /**
   * Get the video element used to show the stream
   * */
  getVideoElement() {
    return new Promise((resolve) => {
      const wait = (cb) => {
        setTimeout(cb, 100);
      };
      const tryResolving = () => {
        if (this.videoElement)
          return resolve(this.videoElement);
        else
          wait(tryResolving);
      };
    });
  }
  setVolume() {
    this.videoElement.volume = this.volume;
  }
  componentDidLoad() {
    this.videoElement = this.el.shadowRoot.querySelector('video');
    // NOTE stream in/active events are dead (?) so we are doing it manually
    this.videoElement.addEventListener('playing', () => {
      this.setStreamState('active');
    });
    this.initStream();
  }
  onFrame() {
    if (this.streamState === 'active')
      requestAnimationFrame(this.onFrame.bind(this));
    var time = this.videoElement.currentTime;
    if (time !== this.lastTime) {
      this.lastTime = time;
      this.frameupdate.emit(time);
    }
  }
  // listen for all constraint prop changes, re-init stream
  async reInit() {
    // console.log('reinit')
    // TODO clean up old stream if it's there? Is this necessary?
    // if(this.stream) await this.stopStream()
    this.initStream();
  }
  // TODO determine which constraints don't require a full reinit, use applyConstraints
  // updateAudioConstraints(newVal, oldVal, constraint){
  //   console.log('updateAudioConstraints', arguments)  
  //   this.applyConstraints({
  //     [constraint]: newVal
  //   }, 'audio')
  // }
  updateVideoConstraints(newVal, oldVal, constraint) {
    console.log('updateVideoConstraints', arguments);
    this.applyConstraints({
      advanced: [{ [constraint]: newVal }]
    }, 'video');
  }
  getTrack(type = 'video', trackIndex = 0) {
    if (!this.stream || !this.stream.active)
      throw new Error('stream is not active');
    let track;
    if (type === 'video') {
      track = this.stream.getVideoTracks()[trackIndex];
    }
    else if (type === 'audio') {
      track = this.stream.getAudioTracks()[trackIndex];
    }
    if (!track)
      throw new Error(`Can't get ${type} track from the current stream`);
    return track;
  }
  async initStream() {
    this.setStreamState('inactive');
    try {
      const constraints = await this.createConstraints();
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = this.stream;
    }
    catch (err) {
      this.streaminiterror.emit(err);
    }
  }
  setStreamState(state) {
    this.streamState = state;
    if (state === 'active') {
      this.streamactive.emit();
      this.onFrame();
    }
    else {
      this.streaminactive.emit();
    }
  }
  /**
   * Creates a MediaStreamConstraints object based on component attributes
   * */
  async createConstraints() {
    let constraints = {
      audio: this.audio,
      video: this.video
    };
    if (this.video) { // must be true to activate video stream
      // check any of the video constraints to determine if we need to construct the video constraints object
      if (anyDefined(this.width, this.height, this.videoFacingMode, this.videoDeviceId)) {
        constraints.video = {};
        if (this.videoDeviceId)
          constraints.video.deviceId = this.videoDeviceId;
        if (this.width)
          constraints.video.width = { ideal: this.width };
        if (this.height)
          constraints.video.height = { ideal: this.height };
        if (this.videoFacingMode)
          constraints.video.facingMode = this.videoFacingMode;
        if (this.resizeMode)
          constraints.video.resizeMode = this.resizeMode;
        // TODO check if we need to define this?
        const advanced = constraints.video.advanced = [];
        if (this.brightness !== undefined)
          advanced.push({ brightness: this.brightness });
        if (this.colorTemperature !== undefined)
          advanced.push({ colorTemperature: this.colorTemperature });
        if (this.contrast !== undefined)
          advanced.push({ contrast: this.contrast });
        if (this.exposureCompensation !== undefined)
          advanced.push({ exposureCompensation: this.exposureCompensation });
        if (this.exposureMode !== undefined)
          advanced.push({ exposureMode: this.exposureMode });
        if (this.exposureTime !== undefined)
          advanced.push({ exposureTime: this.exposureTime });
        if (this.focusDistance !== undefined)
          advanced.push({ focusDistance: this.focusDistance });
        if (this.focusMode !== undefined)
          advanced.push({ focusMode: this.focusMode });
        if (this.iso !== undefined)
          advanced.push({ iso: this.iso });
        if (this.pan !== undefined)
          advanced.push({ pan: this.pan });
        if (this.pointsOfInterest !== undefined)
          advanced.push({ pointsOfInterest: this.pointsOfInterest });
        if (this.saturation !== undefined)
          advanced.push({ saturation: this.saturation });
        if (this.sharpness !== undefined)
          advanced.push({ sharpness: this.sharpness });
        if (this.tilt !== undefined)
          advanced.push({ tilt: this.tilt });
        if (this.torch !== undefined)
          advanced.push({ torch: this.torch });
        if (this.whiteBalanceMode !== undefined)
          advanced.push({ whiteBalanceMode: this.whiteBalanceMode });
        if (this.zoom !== undefined)
          advanced.push({ zoom: this.zoom });
        if (this.frameRate !== undefined)
          advanced.push({ frameRate: this.frameRate });
      }
      // width: { min: 1024, ideal: 1280, max: 1920 },
      // height: { min: 576, ideal: 720, max: 1080 }
    }
    if (this.audio) {
      if (anyDefined(this.sampleRate, this.sampleSize, this.echoCancellation, this.autoGainControl, this.noiseSuppression, this.latency, this.channelCount)) {
        constraints.audio = {};
        if (this.audioDeviceId)
          constraints.audio.deviceId = this.audioDeviceId;
        if (this.sampleRate)
          constraints.audio.sampleRate = this.sampleRate;
        if (this.sampleSize)
          constraints.audio.sampleSize = this.sampleSize;
        if (this.echoCancellation !== undefined)
          constraints.audio.echoCancellation = this.echoCancellation;
        if (this.autoGainControl !== undefined)
          constraints.audio.autoGainControl = this.autoGainControl;
        if (this.noiseSuppression !== undefined)
          constraints.audio.noiseSuppression = this.noiseSuppression;
        if (this.latency !== undefined)
          constraints.audio.latency = this.latency;
        if (this.channelCount)
          constraints.audio.channelCount = this.channelCount;
      }
    }
    return constraints;
  }
  /**
   * Applies constraints to a specific track
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/applyConstraints
   * */
  async applyConstraints(constraints, type = 'video', trackIndex = 0) {
    return new Promise((resolve, reject) => {
      try {
        this.getTrack(type, trackIndex).applyConstraints(constraints);
        resolve();
      }
      catch (e) {
        reject(e);
        console.error(e);
      }
    });
  }
  /**
   * Gets constraints of a specific track
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getConstraints
   * */
  async getConstraints(type = 'video', trackIndex = 0) {
    return new Promise((resolve, reject) => {
      try {
        this.getTrack(type, trackIndex).getConstraints();
        resolve();
      }
      catch (e) {
        reject(e);
        console.error(e);
      }
    });
  }
  /**
   * Get an object of key/booleans that detail supported track capabilities
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities
   * */
  async getCapabilities(type = 'video', trackIndex = 0) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.getTrack(type, trackIndex).getCapabilities());
      }
      catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Returns the actual track settings after constraints are applied
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getSettings
   * */
  async getTrackSettings(type = 'video', trackIndex = 0) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.getTrack(type, trackIndex).getSettings());
      }
      catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Stops the current stream (all tracks)
   * */
  async stopStream() {
    this.stream.getTracks().forEach(track => track.stop());
    this.setStreamState('inactive');
  }
  /**
   * Get a list of available media devices, filtered by kind
   * */
  async getMediaDevices(kind) {
    if (['videoinput', 'audioinput', 'audiooutput'].indexOf(kind) === -1)
      return Promise.reject(new Error('kind must be videoinput, audioinput, or audiooutput'));
    const devices = await navigator.mediaDevices.enumerateDevices();
    return kind ? devices.filter(device => device.kind === kind) : devices;
  }
  /**
   * Get a list of supported constraints
   * https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Constraints#specifications
   * */
  async getSupportedConstraints() {
    return Promise.resolve(navigator.mediaDevices.getSupportedConstraints());
  }
  /**
   * Read the docs! Calling this method opens a new browser window and loads the component API documentation.
   * */
  async viewDocumentation() {
    await window.open('https://github.com/The-AR-Company/user-media-component/blob/master/user-media/src/components/user-media/readme.md', '_blank');
  }
  render() {
    return (h(Host, null, h("slot", null), h("video", { ref: el => this.videoElement = el, controls: this.controls, muted: this.muted, autoplay: this.autoplay, playsinline: this.playsinline })));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "volume": ["setVolume"],
    "video": ["reInit"],
    "videoDeviceId": ["reInit"],
    "videoFacingMode": ["reInit"],
    "aspectRatio": ["reInit"],
    "resizeMode": ["reInit"],
    "audio": ["reInit"],
    "audioDeviceId": ["reInit"],
    "sampleRate": ["reInit"],
    "sampleSize": ["reInit"],
    "echoCancellation": ["reInit"],
    "autoGainControl": ["reInit"],
    "noiseSuppression": ["reInit"],
    "channelCount": ["reInit"],
    "latency": ["reInit"],
    "width": ["updateVideoConstraints"],
    "height": ["updateVideoConstraints"],
    "frameRate": ["updateVideoConstraints"],
    "brightness": ["updateVideoConstraints"],
    "colorTemperature": ["updateVideoConstraints"],
    "contrast": ["updateVideoConstraints"],
    "exposureCompensation": ["updateVideoConstraints"],
    "exposureMode": ["updateVideoConstraints"],
    "exposureTime": ["updateVideoConstraints"],
    "focusDistance": ["updateVideoConstraints"],
    "focusMode": ["updateVideoConstraints"],
    "iso": ["updateVideoConstraints"],
    "pan": ["updateVideoConstraints"],
    "pointsOfInterest": ["updateVideoConstraints"],
    "saturation": ["updateVideoConstraints"],
    "sharpness": ["updateVideoConstraints"],
    "tilt": ["updateVideoConstraints"],
    "torch": ["updateVideoConstraints"],
    "whiteBalanceMode": ["updateVideoConstraints"],
    "zoom": ["updateVideoConstraints"]
  }; }
};
UserMedia.style = userMediaCss;

export { UserMedia as user_media };
