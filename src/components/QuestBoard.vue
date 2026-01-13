<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { PortfolioData } from '../utils/contentParser';
import { useAudio } from '../composables/useAudio';

const emit = defineEmits<{ back: [] }>();
const portfolioData = inject<Ref<PortfolioData | null>>('portfolioData');
const { playNavigate, playSelect } = useAudio();

const handleBack = () => {
    playNavigate();
    emit('back');
};

const openProfile = () => {
    playSelect();
    const url = portfolioData?.value?.contact?.github?.[0]
        ? `https://${portfolioData.value.contact.github[0].replace(/^https?:\/\//, '')}`
        : 'https://github.com/ishant9805';
    window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<template>
    <section class="screen">
        <header class="top-hud">
            <button class="pixel-btn" @click="handleBack">BACK</button>
            <div class="hud-element">
                <span class="neon-text-cyan">QUESTS </span>
                <span class="pixel-text-xs">COMPLETED: </span>
                <span class="neon-text-pink">{{ portfolioData?.projects?.length || 0 }}</span>
            </div>


        </header>
        <div class="hud-element title">
            <span class="neon-text-purple">QUEST BOARD</span>
        </div>

        <div class="content game-panel">
            <div class="game-panel-title">FEATURED PROJECTS</div>

            <!-- AI IMAGE PROMPT:
      Pixel art quest board UI, wooden board texture in pixel art,
      pinned parchment notes, neon cyberpunk glow, 16-bit RPG quest menu
      -->
            <div class="quests">
                <article v-for="(p, idx) in (portfolioData?.projects || [])" :key="idx" class="quest">
                    <header class="quest-head">
                        <div class="name neon-text-cyan">{{ p.name }}</div>
                        <div class="badge">MAIN QUEST</div>
                    </header>

                    <p class="desc terminal-text">{{ p.description }}</p>

                    <div v-if="p.problem" class="block">
                        <div class="label">PROBLEM</div>
                        <p class="terminal-text">{{ p.problem }}</p>
                    </div>

                    <div v-if="p.solution" class="block">
                        <div class="label">SOLUTION</div>
                        <p class="terminal-text">{{ p.solution }}</p>
                    </div>

                    <div class="block">
                        <div class="label">TECH STACK</div>
                        <div class="tags">
                            <span v-for="(t, i) in p.techStack" :key="i" class="tag">{{ t }}</span>
                        </div>
                    </div>

                    <div class="block">
                        <div class="label">FEATURES</div>
                        <ul class="features terminal-text">
                            <li v-for="(f, i) in p.features" :key="i">• {{ f }}</li>
                        </ul>
                    </div>

                    <div class="actions">
                        <button class="pixel-btn pixel-btn-cyan" @click="openProfile">GITHUB</button>
                        <button class="pixel-btn" disabled
                            title="Demo links are not provided in about_me.txt">DEMO</button>
                    </div>
                </article>
            </div>

            <div class="note hud-element">
                <span class="pixel-text-xs">GitHub/Demo links are rendered from available data.</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.screen {
    min-height: 100vh;
    padding: 4rem 18px 80px;
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
    margin-bottom: 1em;
    text-align: center;
}

.content {
    max-width: 1200px;
    margin: 0 auto;
}

.quests {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 10px;
}

.quest {
    background: rgba(0, 0, 0, 0.35);
    border: 3px solid rgba(255, 0, 255, 0.25);
    padding: 14px;
}

.quest-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.name {
    font-size: 12px;
    letter-spacing: 2px;
}

.badge {
    font-size: 8px;
    padding: 6px 8px;
    border: 2px solid rgba(0, 255, 255, 0.35);
    color: var(--color-neon-cyan);
}

.desc {
    margin-top: 10px;
}

.block {
    margin-top: 12px;
}

.label {
    font-size: 9px;
    color: var(--color-neon-purple);
    margin-bottom: 6px;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    font-family: var(--font-terminal);
    font-size: 18px;
    padding: 4px 8px;
    border: 2px solid rgba(0, 255, 255, 0.25);
    background: rgba(26, 26, 46, 0.4);
}

.features {
    list-style: none;
    padding-left: 0;
}

.actions {
    display: flex;
    gap: 10px;
    margin-top: 14px;
}

.note {
    margin-top: 16px;
    text-align: center;
}

button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}

@media (max-width: 980px) {
    .quests {
        grid-template-columns: 1fr;
    }
}
</style>
