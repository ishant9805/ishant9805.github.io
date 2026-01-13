<script setup lang="ts">
import { inject, type Ref, computed } from 'vue';
import type { PortfolioData } from '../utils/contentParser';
import { useAudio } from '../composables/useAudio';

const emit = defineEmits<{ back: [] }>();
const portfolioData = inject<Ref<PortfolioData | null>>('portfolioData');
const { playNavigate, playClick } = useAudio();

const handleBack = () => {
    playNavigate();
    emit('back');
};

const sections = computed(() => {
    const s = portfolioData?.value?.skills;
    return [
        { key: 'programming', title: 'PROGRAMMING', items: s?.programming || [], icon: '⌨️' },
        { key: 'backend', title: 'BACKEND', items: s?.backend || [], icon: '🧩' },
        { key: 'frontend', title: 'FRONTEND', items: s?.frontend || [], icon: '🖼️' },
        { key: 'databases', title: 'DATABASES', items: s?.databases || [], icon: '🗄️' },
        { key: 'ai', title: 'AI / DATA', items: s?.ai || [], icon: '🧠' },
        { key: 'electrical', title: 'EMBEDDED', items: s?.electrical || [], icon: '⚡' },
        { key: 'devops', title: 'DEVOPS', items: s?.devops || [], icon: '🛠️' },
    ];
});

const onHover = () => playClick();
</script>

<template>
    <section class="screen">
        <header class="top-hud">
            <div class="hud-element">
                <span class="neon-text-cyan">INV</span>
                <span class="pixel-text-xs">SLOTS</span>
                <span class="neon-text-pink">∞</span>
            </div>

            <div class="hud-element title">
                <span class="neon-text-purple">INVENTORY</span>
            </div>

            <button class="pixel-btn" @click="handleBack">BACK</button>
        </header>

        <div class="content game-panel">
            <div class="game-panel-title">SKILLS & TECHNOLOGY STACK</div>

            <!-- AI IMAGE PROMPT:
      Pixel art inventory grid UI, 16-bit RPG menu, item slots, neon cyan border,
      cyberpunk purple background, subtle scanlines
      -->
            <div class="grid">
                <div v-for="section in sections" :key="section.key" class="panel">
                    <div class="panel-header">
                        <!-- AI IMAGE PROMPT:
            Pixel art category icon for inventory header, 16-bit UI icon, neon glow, crisp pixel art
            -->
                        <span class="icon">{{ section.icon }}</span>
                        <span class="panel-title">{{ section.title }}</span>
                    </div>

                    <div class="items">
                        <button v-for="(item, idx) in section.items" :key="idx" class="item" @mouseenter="onHover"
                            type="button">
                            <span class="name">{{ item }}</span>
                            <span class="rarity">RARE</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="legend hud-element">
                <span class="pixel-text-xs">
                    TIP: Hover items for SFX • This inventory is loaded from about_me.txt
                </span>
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
    max-width: 1200px;
    margin: 0 auto 18px;
}

.title {
    flex: 1;
    text-align: center;
}

.content {
    max-width: 1200px;
    margin: 0 auto;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 10px;
}

.panel {
    border: 3px solid rgba(157, 78, 221, 0.45);
    background: rgba(0, 0, 0, 0.35);
    padding: 12px;
}

.panel-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.icon {
    width: 22px;
    text-align: center;
}

.panel-title {
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--color-neon-cyan);
}

.items {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
}

.item {
    font-family: var(--font-pixel);
    font-size: 9px;
    text-align: left;
    padding: 10px;
    border: 2px solid rgba(0, 255, 255, 0.25);
    background: rgba(26, 26, 46, 0.45);
    color: var(--color-text-primary);
    cursor: default;
    transition: all 0.12s ease;
}

.item:hover {
    border-color: rgba(0, 255, 255, 0.75);
    box-shadow: 0 0 18px rgba(0, 255, 255, 0.2);
    transform: translateY(-1px);
}

.name {
    display: block;
    line-height: 1.6;
}

.rarity {
    display: block;
    margin-top: 6px;
    font-size: 8px;
    color: var(--color-neon-purple);
}

.legend {
    margin-top: 16px;
    text-align: center;
}

@media (max-width: 980px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 520px) {
    .items {
        grid-template-columns: 1fr;
    }
}
</style>
