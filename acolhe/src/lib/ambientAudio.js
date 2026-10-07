let context = null;
let master = null;
let nodes = [];
let fadeTimer = null;

function getContext() {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!context) {
    context = new Ctor();
    master = context.createGain();
    master.gain.value = 0.0001;
    master.connect(context.destination);
  }
  return context;
}

function noiseSource(ctx) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function tone(ctx, frequency, level, type = "sine") {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = frequency;
  const amp = ctx.createGain();
  amp.gain.value = level;
  osc.connect(amp);
  amp.connect(master);
  osc.start();
  return [osc, amp];
}

const cenas = {
  chuva(ctx) {
    const source = noiseSource(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1100;
    const amp = ctx.createGain();
    amp.gain.value = 0.5;
    source.connect(filter).connect(amp).connect(master);
    source.start();
    return [source, filter, amp];
  },
  mar(ctx) {
    const source = noiseSource(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 480;
    const amp = ctx.createGain();
    amp.gain.value = 0.34;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const depth = ctx.createGain();
    depth.gain.value = 0.2;
    lfo.connect(depth).connect(amp.gain);
    source.connect(filter).connect(amp).connect(master);
    source.start();
    lfo.start();
    return [source, lfo, filter, amp, depth];
  },
  ninar(ctx) {
    return [
      ...tone(ctx, 110, 0.22),
      ...tone(ctx, 110.7, 0.2),
      ...tone(ctx, 220, 0.05),
      ...tone(ctx, 329.6, 0.03),
    ];
  },
  acalanto(ctx) {
    return [
      ...tone(ctx, 174.6, 0.16),
      ...tone(ctx, 220, 0.12),
      ...tone(ctx, 261.6, 0.1),
      ...tone(ctx, 349.2, 0.05),
    ];
  },
};

function teardown() {
  nodes.forEach((node) => {
    try {
      node.stop?.();
    } catch {
      /* fonte já encerrada */
    }
    try {
      node.disconnect?.();
    } catch {
      /* já desconectado */
    }
  });
  nodes = [];
}

export function playPaisagem(id, volume = 0.5) {
  const ctx = getContext();
  if (!ctx || !cenas[id]) return false;
  ctx.resume?.();
  clearTimeout(fadeTimer);

  const swap = () => {
    teardown();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.4);
    nodes = cenas[id](ctx);
  };

  if (nodes.length) {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.12);
    fadeTimer = setTimeout(swap, 380);
  } else {
    swap();
  }
  return true;
}

export function stopPaisagem() {
  if (!context || !master) return;
  clearTimeout(fadeTimer);
  master.gain.cancelScheduledValues(context.currentTime);
  master.gain.setTargetAtTime(0.0001, context.currentTime, 0.15);
  fadeTimer = setTimeout(teardown, 700);
}

export function playBlip(frequency = 620) {
  const ctx = getContext();
  if (!ctx) return;
  ctx.resume?.();
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = frequency;
  const amp = ctx.createGain();
  amp.gain.setValueAtTime(0.0001, ctx.currentTime);
  amp.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.04);
  amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
  osc.connect(amp).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 1);
}