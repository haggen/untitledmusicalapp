const audioContext = new AudioContext();

export function playSweep() {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const time = audioContext.currentTime;

  const oscillatorNode1 = new OscillatorNode(audioContext, {
    frequency: 220,
    type: "sine",
  });

  // const oscillatorNode2 = new OscillatorNode(audioContext, {
  //   frequency: 659.25,
  //   type: "sine",
  // });

  const gainNode1 = new GainNode(audioContext);
  gainNode1.gain.cancelScheduledValues(time);
  gainNode1.gain.setValueAtTime(1, time);

  const length = 5;
  const pulses = 16;
  const wholestep = length / pulses;
  const halfstep = wholestep / 2;

  // for (let i = 0; i < pulses; i += 1) {
  //   gainNode1.gain.linearRampToValueAtTime(1, time + wholestep * i + halfstep);
  //   gainNode1.gain.linearRampToValueAtTime(0, time + wholestep * i + wholestep);
  // }

  oscillatorNode1.frequency.setValueCurveAtTime(
    [220, 30, 60, 30, 60, 30, 60, 30, 220],
    time,
    length
  );

  // const gainNode2 = new GainNode(audioContext);
  // gainNode2.gain.cancelScheduledValues(time);
  // gainNode2.gain.setValueAtTime(0, time);
  // gainNode2.gain.setValueAtTime(0, time + 1.5);
  // gainNode2.gain.linearRampToValueAtTime(1, time + 2);

  oscillatorNode1.connect(gainNode1).connect(audioContext.destination);
  oscillatorNode1.start(time);
  oscillatorNode1.stop(time + length);

  // oscillatorNode2.connect(gainNode2).connect(audioContext.destination);
  // oscillatorNode2.start(time + 1);
  // oscillatorNode2.stop(time + 2);
}
