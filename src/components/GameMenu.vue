<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted, type Ref } from 'vue';
import { useAudio } from '../composables/useAudio';
import type { PortfolioData } from '../utils/contentParser';

const emit = defineEmits<{
    navigate: [screen: string];
}>();

const portfolioData = inject<Ref<PortfolioData | null>>('portfolioData');
const { playClick, playNavigate } = useAudio();

const selectedIndex = ref(0);

const menuItems = [
    { id: 'about', label: 'CHARACTER INFO', icon: '👤', description: 'Learn about the developer' },
    { id: 'skills', label: 'INVENTORY', icon: '🎒', description: 'View skills & technologies' },
    { id: 'quests', label: 'QUEST BOARD', icon: '📜', description: 'Explore completed projects' },
    { id: 'map', label: 'WORLD MAP', icon: '🗺️', description: 'Education & journey' },
    { id: 'achievements', label: 'ACHIEVEMENTS', icon: '🏆', description: 'Certifications & awards' },
    { id: 'contact', label: 'CONTACT PORTAL', icon: '📡', description: 'Get in touch' },
    { id: 'start', label: 'HOME', icon: '🏠', description: 'Return to start screen' },

];

const handleSelect = (item: typeof menuItems[0]) => {
    playClick();
    emit('navigate', item.id);
};

const handleHover = (index: number) => {
    if (selectedIndex.value !== index) {
        selectedIndex.value = index;
        playNavigate();
    }
};

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'w') {
        selectedIndex.value = (selectedIndex.value - 1 + menuItems.length) % menuItems.length;
        playNavigate();
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        selectedIndex.value = (selectedIndex.value + 1) % menuItems.length;
        playNavigate();
    } else if (e.key === 'Enter' || e.key === ' ') {
        const item = menuItems[selectedIndex.value];
        if (item) handleSelect(item);
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <div class="game-menu">
        <div class="menu-container">
            <!-- Header HUD -->
            <div class="menu-header">
                <div class="header-left hud-element">
                    <span class="neon-text-cyan">◆</span>
                    <span class="pixel-text-xs">{{ portfolioData?.hero?.name || 'PLAYER' }}</span>
                </div>
                <h2 class="menu-title neon-text-purple pixel-text-xl">MAIN MENU</h2>
                <div class="header-right hud-element">
                    <span class="pixel-text-xs">LVL</span>
                    <span class="neon-text-cyan">99</span>
                </div>
            </div>

            <!-- Menu Panel -->
            <div class="menu-panel game-panel">
                <div class="game-panel-title">SELECT DESTINATION</div>

                <!-- AI IMAGE PROMPT:
        Pixel art RPG menu interface, dark panel with glowing borders,
        menu item buttons with hover effects, 16-bit game UI style,
        selection cursor, neon purple accents
        -->
                <div class="menu-items">
                    <button v-for="(item, index) in menuItems" :key="item.id" class="menu-item"
                        :class="{ 'selected': selectedIndex === index }" @click="handleSelect(item)"
                        @mouseenter="handleHover(index)">
                        <span class="item-cursor">{{ selectedIndex === index ? '▶' : '' }}</span>
                        <!-- AI IMAGE PROMPT:
                        Pixel art UI icon sprite, 16-bit RPG menu icon style,
                        neon cyan/purple outline, crisp pixel art, small square icon
                        -->
                        <span class="item-icon">{{ item.icon }}</span>
                        <div class="item-content">
                            <span class="item-label">{{ item.label }}</span>
                            <span class="item-desc pixel-text-xs">{{ item.description }}</span>
                        </div>
                        <span class="item-arrow">→</span>
                    </button>
                </div>
            </div>

            <!-- Quick Stats Panel -->
            <div class="stats-panel">
                <div class="stat-box game-panel">
                    <div class="stat-label pixel-text-xs">PROJECTS</div>
                    <div class="stat-value neon-text-cyan">{{ portfolioData?.projects?.length || 5 }}</div>
                </div>
                <div class="stat-box game-panel">
                    <div class="stat-label pixel-text-xs">SKILLS</div>
                    <div class="stat-value neon-text-pink">20+</div>
                </div>
                <div class="stat-box game-panel">
                    <div class="stat-label pixel-text-xs">ACHIEVEMENTS</div>
                    <div class="stat-value neon-text-purple">8</div>
                </div>
            </div>

            <!-- Footer Instructions -->
            <div class="menu-footer">
                <div class="control-hint hud-element">
                    <span class="pixel-text-xs">
                        <span class="key">↑↓</span> Navigate
                        <span class="separator">|</span>
                        <span class="key">ENTER</span> Select
                        <span class="separator">|</span>
                        <span class="key">CLICK</span> Choose
                    </span>
                </div>
            </div>
        </div>

        <!-- Decorative character -->
        <div class="menu-character">
            <!-- AI IMAGE PROMPT:
      Pixel art developer character in thinking pose, 16-bit RPG style,
      purple hoodie, standing next to menu, idle animation
      -->
            <div class="character-sprite"></div>
            <div class="speech-bubble">
                <span class="pixel-text-xs">Where shall we go?</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.game-menu {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    position: relative;
}

.menu-container {
    max-width: 600px;
    width: 100%;
}

/* Header */
.menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 10px;
}

.menu-title {
    letter-spacing: 4px;
}

.header-left,
.header-right {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Menu Panel */
.menu-panel {
    margin-bottom: 20px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 0;
}

.menu-item {
    font-family: var(--font-pixel);
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: rgba(26, 26, 46, 0.5);
    border: 2px solid transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
    width: 100%;
}

.menu-item:hover,
.menu-item.selected {
    background: rgba(157, 78, 221, 0.2);
    border-color: var(--color-neon-purple);
    color: var(--color-text-primary);
    transform: translateX(10px);
    box-shadow:
        0 0 10px rgba(157, 78, 221, 0.3),
        inset 0 0 20px rgba(157, 78, 221, 0.1);
}

.item-cursor {
    width: 16px;
    color: var(--color-neon-cyan);
    animation: blink 0.5s step-end infinite;
}

.item-icon {
    font-size: 20px;
    filter: grayscale(50%);
    transition: filter 0.2s ease;
}

.menu-item:hover .item-icon,
.menu-item.selected .item-icon {
    filter: grayscale(0%);
}

.item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.item-label {
    letter-spacing: 2px;
}

.item-desc {
    color: var(--color-text-secondary);
    opacity: 0.7;
}

.item-arrow {
    color: var(--color-neon-cyan);
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.2s ease;
}

.menu-item:hover .item-arrow,
.menu-item.selected .item-arrow {
    opacity: 1;
    transform: translateX(0);
}

/* Stats Panel */
.stats-panel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 20px;
}

.stat-box {
    text-align: center;
    padding: 15px 10px;
}

.stat-label {
    color: var(--color-text-secondary);
    margin-bottom: 8px;
}

.stat-value {
    font-size: 24px;
}

/* Footer */
.menu-footer {
    display: flex;
    justify-content: center;
}

.control-hint .key {
    color: var(--color-neon-cyan);
    padding: 2px 6px;
    border: 1px solid var(--color-neon-cyan);
    margin: 0 4px;
}

.control-hint .separator {
    color: var(--color-text-secondary);
    margin: 0 8px;
}

/* Character */
.menu-character {
    position: fixed;
    bottom: 20%;
    right: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: float 3s ease-in-out infinite;
}

.menu-character .character-sprite {
    width: 80px;
    height: 100px;
    background: linear-gradient(180deg, #4a2c7a 0%, #6a3d9a 50%, #4a2c7a 100%);
    border: 3px solid var(--color-neon-purple);
    border-radius: 4px;
    position: relative;
    box-shadow: 0 0 20px rgba(157, 78, 221, 0.3);
}

.menu-character .character-sprite::before {
    content: '🧑‍💻';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
}

.speech-bubble {
    background: var(--color-panel-bg);
    border: 2px solid var(--color-neon-cyan);
    padding: 10px 15px;
    margin-top: 15px;
    position: relative;
    animation: fadeIn 0.5s ease;
}

.speech-bubble::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-bottom-color: var(--color-neon-cyan);
}

/* Responsive */
@media (max-width: 768px) {
    .menu-character {
        display: none;
    }

    .menu-item {
        padding: 12px 15px;
        font-size: 10px;
    }

    .stats-panel {
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .stat-value {
        font-size: 18px;
    }
}

@media (max-width: 480px) {
    .menu-header {
        flex-direction: column;
        gap: 10px;
    }

    .header-left,
    .header-right {
        font-size: 8px;
    }

    .control-hint {
        display: none;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
