<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { PortfolioData } from '../utils/contentParser';
import { useAudio } from '../composables/useAudio';

const emit = defineEmits<{ back: [] }>();
const portfolioData = inject<Ref<PortfolioData | null>>('portfolioData');
const { playNavigate } = useAudio();

const handleBack = () => {
    playNavigate();
    emit('back');
};
</script>

<template>
    <section class="screen">
        <header class="top-hud">
            <div class="hud-element">
                <span class="neon-text-cyan">MAP</span>
                <span class="pixel-text-xs">PROGRESS</span>
                <span class="neon-text-pink">99%</span>
            </div>

            <div class="hud-element title">
                <span class="neon-text-purple">WORLD MAP</span>
            </div>

            <button class="pixel-btn" @click="handleBack">BACK</button>
        </header>

        <div class="content">
            <div class="game-panel">
                <div class="game-panel-title">EDUCATION ROUTE</div>

                <!-- AI IMAGE PROMPT:
        Pixel art world map UI, 16-bit RPG overworld map with path nodes,
        glowing cyan route line, neon purple markers, cyberpunk theme
        -->
                <div class="map">
                    <div v-for="(edu, idx) in (portfolioData?.education || [])" :key="idx" class="node">
                        <div class="marker">
                            <!-- AI IMAGE PROMPT:
              Pixel art map marker icon, 16-bit UI pin, neon cyan glow
              -->
                            <span class="pin">⬣</span>
                        </div>
                        <div class="card">
                            <div class="inst neon-text-cyan">{{ edu.institution }}</div>
                            <div class="deg pixel-text-xs">{{ edu.degree }}</div>
                            <div v-if="edu.cgpa" class="meta pixel-text-xs">CGPA: <span class="neon-text-pink">{{
                                    edu.cgpa }}</span></div>
                            <div v-if="edu.focus" class="meta pixel-text-xs">Focus: {{ edu.focus }}</div>
                            <div v-if="edu.achievements?.length" class="meta pixel-text-xs">
                                Achievements: {{ edu.achievements.join(' • ') }}
                            </div>
                        </div>
                    </div>

                    <div class="route"></div>
                </div>
            </div>

            <div class="game-panel">
                <div class="game-panel-title">CURRENT ZONES</div>
                <div class="zones">
                    <div class="zone">
                        <div class="z-title">RESEARCH</div>
                        <div class="z-body terminal-text">{{ (portfolioData?.research || []).slice(0, 4).join(' • ') }}
                        </div>
                    </div>
                    <div class="zone">
                        <div class="z-title">BUILDING</div>
                        <div class="z-body terminal-text">AI-first platforms • Distributed systems • Applied CV</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.screen {
    min-height: 100vh;
    padding: 28px 18px 80px;
}

.top-hud {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto 18px;
}

.title {
    flex: 1;
    text-align: center;
}

.content {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    gap: 18px;
}

.map {
    position: relative;
    padding: 10px;
    display: grid;
    gap: 14px;
}

.node {
    display: grid;
    grid-template-columns: 30px 1fr;
    gap: 12px;
    align-items: start;
    position: relative;
    z-index: 2;
}

.marker {
    display: grid;
    place-items: center;
    margin-top: 6px;
}

.pin {
    color: var(--color-neon-cyan);
    text-shadow: 0 0 12px rgba(0, 255, 255, 0.55);
}

.card {
    background: rgba(0, 0, 0, 0.35);
    border: 3px solid rgba(0, 255, 255, 0.25);
    padding: 12px;
}

.inst {
    font-size: 12px;
    letter-spacing: 2px;
}

.deg {
    margin-top: 6px;
    color: var(--color-text-secondary);
}

.meta {
    margin-top: 6px;
    color: var(--color-text-secondary);
}

.route {
    position: absolute;
    left: 18px;
    top: 20px;
    bottom: 20px;
    width: 4px;
    background: linear-gradient(180deg, rgba(0, 255, 255, 0.8), rgba(157, 78, 221, 0.4));
    box-shadow: 0 0 18px rgba(0, 255, 255, 0.25);
    z-index: 1;
}

.zones {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 10px;
}

.zone {
    background: rgba(0, 0, 0, 0.35);
    border: 3px solid rgba(157, 78, 221, 0.25);
    padding: 12px;
}

.z-title {
    font-size: 10px;
    color: var(--color-neon-purple);
    margin-bottom: 8px;
}

@media (max-width: 900px) {
    .zones {
        grid-template-columns: 1fr;
    }
}
</style>
