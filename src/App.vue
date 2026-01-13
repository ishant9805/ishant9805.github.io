<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide } from 'vue';
import { fetchPortfolioData, type PortfolioData } from './utils/contentParser';
import { useAudio } from './composables/useAudio';
import ParallaxBackground from './components/ParallaxBackground.vue';
import StartScreen from './components/StartScreen.vue';
import GameMenu from './components/GameMenu.vue';
import AboutCharacter from './components/AboutCharacter.vue';
import SkillInventory from './components/SkillInventory.vue';
import QuestBoard from './components/QuestBoard.vue';
import WorldMap from './components/WorldMap.vue';
import Achievements from './components/Achievements.vue';
import ContactPortal from './components/ContactPortal.vue';
import SoundController from './components/SoundController.vue';

// State management
const currentScreen = ref<string>('start');
const portfolioData = ref<PortfolioData | null>(null);
const isLoading = ref(true);
const isTransitioning = ref(false);

// Audio
const { playSelect, playNavigate, initAudio } = useAudio();

const handleAppKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && currentScreen.value !== 'start') {
    goBack();
  }
};

// Provide portfolio data to all child components
provide('portfolioData', portfolioData);
provide('currentScreen', currentScreen);

const innerWidth = ref<number>(window.innerWidth);

const handleResize = () => {
  innerWidth.value = window.innerWidth;
};

window.addEventListener('resize', handleResize);

// Navigation function
const navigateTo = (screen: string) => {
  if (isTransitioning.value) return;

  playNavigate();
  isTransitioning.value = true;

  setTimeout(() => {
    currentScreen.value = screen;
    isTransitioning.value = false;
  }, 300);
};

// Start game function
const startGame = () => {
  playSelect();
  isTransitioning.value = true;

  setTimeout(() => {
    currentScreen.value = 'menu';
    isTransitioning.value = false;
  }, 500);
};

// Go back to menu
const goBack = () => {
  playNavigate();
  isTransitioning.value = true;

  setTimeout(() => {
    currentScreen.value = 'menu';
    isTransitioning.value = false;
  }, 300);
};

// Provide navigation functions
provide('navigateTo', navigateTo);
provide('startGame', startGame);
provide('goBack', goBack);

// Load portfolio data on mount
onMounted(async () => {
  initAudio();
  portfolioData.value = await fetchPortfolioData();
  isLoading.value = false;

  window.addEventListener('keydown', handleAppKeydown);
  window.addEventListener('resize', handleResize);

});

onUnmounted(() => {
  window.removeEventListener('keydown', handleAppKeydown);
  window.removeEventListener('resize', handleResize);

});
</script>

<template>
  <div class="game-container crt-effect" @click="initAudio">
    <!-- AI IMAGE PROMPT:
    Pixel art retro game parallax background with cyberpunk dusk city skyline,
    neon purple sky gradient from dark purple at top to pink at horizon,
    floating clouds, twinkling stars, silhouette of temples and lighthouse,
    water reflection, 16-bit arcade game aesthetic, multiple parallax layers
    -->
    <ParallaxBackground v-if="innerWidth < 768" />
    <img v-else src="/background_landscape.png" alt="Background" class="static-background" />

    <!-- Sound Controller (Always visible) -->
    <SoundController class="sound-controller" />

    <!-- Loading Screen -->
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-content">
        <div class="loading-text pixel-text-lg neon-text-cyan">LOADING</div>
        <div class="loading-bar">
          <div class="loading-bar-fill"></div>
        </div>
        <div class="loading-dots pixel-text-sm">
          <span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </div>
      </div>
    </div>

    <!-- Screen Transition Overlay -->
    <Transition name="fade">
      <div v-if="isTransitioning" class="transition-overlay"></div>
    </Transition>

    <!-- Main Content -->
    <main v-if="!isLoading" class="main-content">
      <Transition name="screen-slide" mode="out-in">
        <!-- Start Screen -->
        <StartScreen v-if="currentScreen === 'start'" key="start" @start="startGame" />

        <!-- Game Menu -->
        <GameMenu v-else-if="currentScreen === 'menu'" key="menu" @navigate="navigateTo" />

        <!-- About Character -->
        <AboutCharacter v-else-if="currentScreen === 'about'" key="about" @back="goBack" />

        <!-- Skill Inventory -->
        <SkillInventory v-else-if="currentScreen === 'skills'" key="skills" @back="goBack" />

        <!-- Quest Board (Projects) -->
        <QuestBoard v-else-if="currentScreen === 'quests'" key="quests" @back="goBack" />

        <!-- World Map (Education & Experience) -->
        <WorldMap v-else-if="currentScreen === 'map'" key="map" @back="goBack" />

        <!-- Achievements -->
        <Achievements v-else-if="currentScreen === 'achievements'" key="achievements" @back="goBack" />

        <!-- Contact Portal -->
        <ContactPortal v-else-if="currentScreen === 'contact'" key="contact" @back="goBack" />
      </Transition>
    </main>

    <!-- Footer HUD -->
    <footer v-if="!isLoading && currentScreen !== 'start'" class="footer-hud">
      <div class="hud-element">
        <span class="neon-text-cyan">◀ </span>
        <span class="pixel-text-xs">PRESS [ESC] OR CLICK BACK TO RETURN</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.game-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}

.static-background {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.sound-controller {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

/* Loading Screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.loading-content {
  text-align: center;
}

.loading-text {
  margin-bottom: 20px;
  animation: pulse-glow 1.5s ease-in-out infinite;
}

.loading-bar {
  width: 200px;
  height: 16px;
  background: var(--color-bg-medium);
  border: 3px solid var(--color-neon-cyan);
  margin: 0 auto 20px;
  overflow: hidden;
}

.loading-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-neon-cyan), var(--color-neon-purple));
  animation: load 2s ease-in-out infinite;
}

@keyframes load {
  0% {
    width: 0%;
  }

  50% {
    width: 100%;
  }

  100% {
    width: 0%;
  }
}

.loading-dots .dot {
  animation: blink 1s step-end infinite;
}

.loading-dots .dot:nth-child(2) {
  animation-delay: 0.3s;
}

.loading-dots .dot:nth-child(3) {
  animation-delay: 0.6s;
}

/* Transition Overlay */
.transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg-dark);
  z-index: 500;
}

/* Main Content */
.main-content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
}

/* Footer HUD */
.footer-hud {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.screen-slide-enter-active {
  transition: all 0.4s ease-out;
}

.screen-slide-leave-active {
  transition: all 0.3s ease-in;
}

.screen-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.screen-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Responsive */
@media (max-width: 768px) {
  .sound-controller {
    top: 10px;
    right: 10px;
  }

  .footer-hud {
    bottom: 10px;
  }
}
</style>
