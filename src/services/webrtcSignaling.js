/**
 * WebRTC Encrypted Free Call Signaling Helper
 * Supports Voice & Video calls between UK Student and Korea Family
 */

export class WebRtcCallSession {
  constructor({ onDurationTick }) {
    this.duration = 0;
    this.timer = null;
    this.onDurationTick = onDurationTick;
  }

  start() {
    this.duration = 0;
    this.timer = setInterval(() => {
      this.duration += 1;
      if (this.onDurationTick) this.onDurationTick(this.duration);
    }, 1000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    return this.duration;
  }
}

