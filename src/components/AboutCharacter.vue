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
                <span class="neon-text-cyan">HP</span>
                <span class="bar"></span>
                <span class="pixel-text-xs">∞</span>
            </div>

            <div class="hud-element title">
                <span class="neon-text-purple">CHARACTER INFO</span>
            </div>

            <button class="pixel-btn" @click="handleBack">BACK</button>
        </header>

        <div class="content">
            <div class="layout">
                <div class="left game-panel">
                    <div class="game-panel-title">PLAYER CARD</div>

                    <!-- AI IMAGE PROMPT:
          Pixel art RPG character portrait frame, neon purple border, CRT glow,
          16-bit UI panel, cyberpunk purple/cyan accents
          -->
                    <div class="portrait">
                        <!-- AI IMAGE PROMPT:
            Pixel art developer avatar portrait, 16-bit RPG style, purple hoodie,
            confident expression, neon rim light, ultra-detailed pixel portrait
            -->
                        <div class="portrait-sprite">🧑‍💻</div>
                    </div>

                    <div class="stats">
                        <div class="row">
                            <span class="k pixel-text-xs">NAME</span>
                            <span class="v">{{ portfolioData?.hero.name || 'Ishant Kumar' }}</span>
                        </div>
                        <div class="row">
                            <span class="k pixel-text-xs">CLASS</span>
                            <span class="v">{{ portfolioData?.hero.title || 'AI Engineer | Data Scientist' }}</span>
                        </div>
                        <div class="row">
                            <span class="k pixel-text-xs">ALIGN</span>
                            <span class="v neon-text-cyan">BUILDER</span>
                        </div>
                    </div>

                    <div class="tags">
                        <div v-for="(tag, i) in (portfolioData?.hero.tags || [])" :key="i" class="tag hud-element">
                            <span class="dot">◆</span>
                            <span class="pixel-text-xs">{{ tag }}</span>
                        </div>
                    </div>
                </div>

                <div class="right">
                    <div class="game-panel">
                        <div class="game-panel-title">STORY</div>
                        <p class="terminal-text story">
                            {{ portfolioData?.about.summary }}
                        </p>
                    </div>

                    <div class="game-panel">
                        <div class="game-panel-title">VISION</div>
                        <p class="terminal-text story">
                            {{ portfolioData?.vision }}
                        </p>
                    </div>

                    <div class="game-panel">
                        <div class="game-panel-title">INTERESTS</div>
                        <div class="chips">
                            <span v-for="(r, i) in (portfolioData?.research || [])" :key="i" class="chip">
                                {{ r }}
                            </span>
                        </div>
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

.bar {
    display: inline-block;
    width: 80px;
    height: 10px;
    margin: 0 8px;
    background: linear-gradient(90deg, var(--color-neon-green), var(--color-neon-cyan));
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.content {
    max-width: 1100px;
    margin: 0 auto;
}

.layout {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 18px;
}

.portrait {
    display: grid;
    place-items: center;
    padding: 14px;
    border: 3px solid var(--color-neon-purple);
    box-shadow: 0 0 20px rgba(157, 78, 221, 0.25);
    background: rgba(0, 0, 0, 0.35);
}

.portrait-sprite {
    width: 160px;
    height: 160px;
    display: grid;
    place-items: center;
    font-size: 72px;
    border: 3px dashed rgba(0, 255, 255, 0.35);
}

.stats {
    margin-top: 14px;
    display: grid;
    gap: 10px;
}

.row {
    display: grid;
    grid-template-columns: 70px 1fr;
    gap: 10px;
    align-items: start;
}

.k {
    color: var(--color-text-secondary);
}

.v {
    font-size: 10px;
    line-height: 1.6;
}

.tags {
    margin-top: 14px;
    display: grid;
    gap: 8px;
}

.tag {
    display: flex;
    align-items: center;
    gap: 8px;
}

.dot {
    color: var(--color-neon-purple);
}

.story {
    margin-top: 6px;
    white-space: pre-wrap;
}

.chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
}

.chip {
    font-family: var(--font-terminal);
    font-size: 18px;
    padding: 6px 10px;
    border: 2px solid rgba(0, 255, 255, 0.35);
    background: rgba(0, 0, 0, 0.4);
}

@media (max-width: 980px) {
    .layout {
        grid-template-columns: 1fr;
    }
}
</style>
