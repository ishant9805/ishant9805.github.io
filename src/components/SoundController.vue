<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useAudio } from '../composables/useAudio';

const { isSoundEnabled, isMusicEnabled, toggleSound, toggleMusic, playClick } = useAudio();

const handleToggleSound = () => {
    toggleSound();
};
const innerWidth = ref<number>(window.innerWidth);
const isExpanded = ref<boolean>(false);
const handleResize = () => {
  innerWidth.value = window.innerWidth;
  if (innerWidth.value >= 768) isExpanded.value = false;
};
const handleToggleMusic = () => {
    playClick();
    toggleMusic();
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

</script>

<template>
    <div class="sound-hud game-panel">
        <div class="toggles">
            <button v-if="innerWidth < 768" class="toggle" @click="() => { playClick(); isExpanded = !isExpanded; }">
                <span class="icon">{{ !isExpanded ? "⚙️" : "❌" }}</span>
            </button>

            <template v-if="innerWidth >= 768 || isExpanded">
                <div v-if="innerWidth >= 768" class="game-panel-title">AUDIO</div>

                <button class="toggle" @click="handleToggleSound">
                    <span class="icon">🔊</span>
                    <span v-if="innerWidth >= 768" class="label pixel-text-xs">SFX</span>
                    <span class="state" :class="{ on: isSoundEnabled }">{{ isSoundEnabled ? 'ON' : 'OFF' }}</span>
                </button>

                <button class="toggle" @click="handleToggleMusic">
                    <span class="icon">🎵</span>
                    <span v-if="innerWidth >= 768" class="label pixel-text-xs">MUSIC</span>
                    <span class="state" :class="{ on: isMusicEnabled }">{{ isMusicEnabled ? 'ON' : 'OFF' }}</span>
                </button>
            </template>
        </div>
    </div>
</template>

<style scoped>
.sound-hud {
    padding: 0;
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
