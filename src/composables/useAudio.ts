// Audio Composable - Manages retro game sounds
import { ref, onMounted, onUnmounted } from 'vue';

const isSoundEnabled = ref(true);
const isMusicEnabled = ref(false);

// Audio context for generating 8-bit sounds
let audioContext: AudioContext | null = null;

export function useAudio() {
  onMounted(() => {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  });

  onUnmounted(() => {
    if (audioContext) {
      audioContext.close();
    }
  });

  // Generate 8-bit beep sound
  const playBeep = (frequency: number = 440, duration: number = 0.1, type: OscillatorType = 'square') => {
    if (!isSoundEnabled.value || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  // Button click sound
  const playClick = () => {
    playBeep(800, 0.05, 'square');
    setTimeout(() => playBeep(1000, 0.05, 'square'), 50);
  };

  // Menu select sound
  const playSelect = () => {
    playBeep(523, 0.1, 'square');
    setTimeout(() => playBeep(659, 0.1, 'square'), 100);
    setTimeout(() => playBeep(784, 0.15, 'square'), 200);
  };

  // Navigation sound
  const playNavigate = () => {
    playBeep(600, 0.08, 'triangle');
  };

  // Error sound
  const playError = () => {
    playBeep(200, 0.2, 'sawtooth');
  };

  // Achievement unlock sound
  const playAchievement = () => {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => playBeep(freq, 0.15, 'square'), i * 100);
    });
  };

  // Toggle sound effects
  const toggleSound = () => {
    isSoundEnabled.value = !isSoundEnabled.value;
    if (isSoundEnabled.value) {
      playClick();
    }
  };

  // Toggle background music
  const toggleMusic = () => {
    isMusicEnabled.value = !isMusicEnabled.value;
  };

  // Initialize audio context on user interaction
  const initAudio = () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  };

  return {
    isSoundEnabled,
    isMusicEnabled,
    playClick,
    playSelect,
    playNavigate,
    playError,
    playAchievement,
    toggleSound,
    toggleMusic,
    initAudio
  };
}
