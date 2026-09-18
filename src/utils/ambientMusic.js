// Cinematic Generative Ambient Lo-Fi Synthesizer via Web Audio API
// Zero external files, zero network latency, 100% reliable in any browser.

class AmbientMusicEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.activeNodes = [];
    this.timer = null;
    this.melodyTimer = null;
    this.chordIndex = 0;
    this.volume = 0.82; // Warm, clearly audible listening level

    // Lush D minor ambient progression: Dm9 -> Bbmaj9 -> Fmaj9 -> Am7
    this.chords = [
      [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9
      [116.54, 146.83, 174.61, 220.00, 261.63], // Bbmaj9
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
      [110.00, 164.81, 220.00, 261.63, 329.63], // Am7
    ];

    // Delicate floating bell tones (D pentatonic scale)
    this.melodyNotes = [
      587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51
    ];
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;

    // Fade in master volume swiftly and smoothly (0.8s)
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0.01, now);
    this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 0.8);

    // Play first chord immediately
    this.playNextChord();
    
    // Cycle chords every 6.5 seconds with crossfade
    this.timer = setInterval(() => {
      if (this.isPlaying) {
        this.playNextChord();
      }
    }, 6500);

    // Start subtle floating bell melody notes
    this.scheduleMelody();

    return true;
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);

      setTimeout(() => {
        this.cleanupNodes();
      }, 900);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      return this.start();
    }
  }

  cleanupNodes() {
    this.activeNodes.forEach((node) => {
      try {
        node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
  }

  playNextChord() {
    if (!this.ctx || !this.isPlaying) return;

    const chord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const chordDuration = 8.0; // Overlaps next chord for seamless cross-fade

    // Warm Low-pass filter for smooth cinematic pad texture (higher cutoff for richness)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.linearRampToValueAtTime(1600, now + 3.0);
    filter.frequency.linearRampToValueAtTime(1100, now + chordDuration);
    filter.connect(this.masterGain);

    // Warm Sub-Bass Root note (1 octave below chord root)
    const bassOsc = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    bassOsc.type = 'triangle';
    bassOsc.frequency.setValueAtTime(chord[0] / 2, now);
    bassGain.gain.setValueAtTime(0.001, now);
    bassGain.gain.linearRampToValueAtTime(0.09, now + 2.0);
    bassGain.gain.setValueAtTime(0.09, now + 5.0);
    bassGain.gain.linearRampToValueAtTime(0.001, now + chordDuration);
    bassOsc.connect(bassGain);
    bassGain.connect(filter);
    bassOsc.start(now);
    bassOsc.stop(now + chordDuration);
    this.activeNodes.push(bassOsc);

    // Chord pad voices
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Alternate between rich warm sine and rounded triangle waves
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      // Detune for rich lush analog chorus feel
      osc.detune.setValueAtTime((idx - 2) * 6, now);
      osc.frequency.setValueAtTime(freq, now);

      // Volume envelope: audible warmth and gentle decay
      const padVoiceVolume = 0.22 / chord.length; // ~0.044 per voice
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(padVoiceVolume, now + 2.0);
      gain.gain.setValueAtTime(padVoiceVolume, now + 5.0);
      gain.gain.linearRampToValueAtTime(0.0001, now + chordDuration);

      osc.connect(gain);
      gain.connect(filter);

      osc.start(now);
      osc.stop(now + chordDuration);
      this.activeNodes.push(osc);
    });

    // Remove finished nodes from tracking array
    setTimeout(() => {
      this.activeNodes = this.activeNodes.slice(-18);
    }, chordDuration * 1000);
  }

  scheduleMelody() {
    if (!this.isPlaying) return;

    const delay = 1400 + Math.random() * 2200;
    this.melodyTimer = setTimeout(() => {
      if (this.isPlaying) {
        this.playMelodyNote();
        this.scheduleMelody();
      }
    }, delay);
  }

  playMelodyNote() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const note = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(note, now);
    filter.Q.setValueAtTime(2.5, now);

    // Clear, audible bell chime envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2.3);
  }
}

export const ambientMusic = new AmbientMusicEngine();
