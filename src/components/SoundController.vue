<script setup lang="ts">
import { useAudio } from '../composables/useAudio';

const { isSoundEnabled, isMusicEnabled, toggleSound, toggleMusic, playClick } = useAudio();

const handleToggleSound = () => {
    toggleSound();
};

const handleToggleMusic = () => {
    playClick();
    toggleMusic();
};
</script>

<template>
    <div class="sound-hud game-panel">
        <div class="game-panel-title">AUDIO</div>

        <div class="toggles">
            <button class="toggle" @click="handleToggleSound">
                <!-- AI IMAGE PROMPT:
        Pixel art speaker icon, 16-bit arcade HUD icon, neon cyan glow, crisp pixels
        -->
                <span class="icon">🔊</span>
                <span class="label pixel-text-xs">SFX</span>
                <span class="state" :class="{ on: isSoundEnabled }">{{ isSoundEnabled ? 'ON' : 'OFF' }}</span>
            </button>

            <button class="toggle" @click="handleToggleMusic">
                <!-- AI IMAGE PROMPT:
        Pixel art music note icon, 16-bit arcade HUD icon, neon purple glow, crisp pixels
        -->
                <span class="icon">🎵</span>
                <span class="label pixel-text-xs">MUSIC</span>
                <span class="state" :class="{ on: isMusicEnabled }">{{ isMusicEnabled ? 'ON' : 'OFF' }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.sound-hud {
    padding: 10px 12px;
}

.toggles {
    display: flex;
    gap: 10px;
}

.toggle {
    font-family: var(--font-pixel);
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid var(--color-neon-cyan);
    color: var(--color-text-primary);
    padding: 8px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.15s ease;
}

.toggle:hover {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.35);
    transform: translateY(-1px);
}

.icon {
    width: 18px;
    text-align: center;
}

.state {
    margin-left: 4px;
    color: var(--color-text-secondary);
}

.state.on {
    color: var(--color-neon-green);
    text-shadow: 0 0 10px rgba(57, 255, 20, 0.5);
}

@media (max-width: 768px) {
    .toggles {
        gap: 6px;
    }

    .toggle {
        padding: 6px 8px;
    }
}
</style>
