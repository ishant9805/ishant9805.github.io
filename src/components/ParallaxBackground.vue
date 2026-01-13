<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    twinkleDelay: number;
}

interface Cloud {
    id: number;
    x: number;
    y: number;
    speed: number;
    scale: number;
    opacity: number;
}

// Generate random stars
const stars = ref<Star[]>([]);
const clouds = ref<Cloud[]>([]);
const scrollY = ref(0);

const generateStars = () => {
    const starCount = 80;
    stars.value = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 60,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleDelay: Math.random() * 3
    }));
};

const generateClouds = () => {
    const cloudCount = 6;
    clouds.value = Array.from({ length: cloudCount }, (_, i) => ({
        id: i,
        x: Math.random() * 120 - 10,
        y: 10 + Math.random() * 30,
        speed: 0.02 + Math.random() * 0.03,
        scale: 0.5 + Math.random() * 0.8,
        opacity: 0.3 + Math.random() * 0.4
    }));
};

// Parallax scroll handler
const handleScroll = () => {
    scrollY.value = window.scrollY;
};

// Cloud animation
let animationFrame: number;
const animateClouds = () => {
    clouds.value = clouds.value.map(cloud => ({
        ...cloud,
        x: cloud.x > 110 ? -20 : cloud.x + cloud.speed
    }));
    animationFrame = requestAnimationFrame(animateClouds);
};

onMounted(() => {
    generateStars();
    generateClouds();
    window.addEventListener('scroll', handleScroll);
    animateClouds();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    cancelAnimationFrame(animationFrame);
});
</script>

<template>
    <div class="parallax-container">
        <!-- AI IMAGE PROMPT:
    Pixel art gradient sky background, deep purple at top transitioning to
    magenta and pink at horizon, 16-bit retro game dusk sky,
    subtle color bands creating retro aesthetic
    -->
        <div class="parallax-layer sky-layer" :style="{ transform: `translateY(${scrollY * 0.1}px)` }"></div>

        <!-- Stars Layer -->
        <div class="parallax-layer stars-layer" :style="{ transform: `translateY(${scrollY * 0.15}px)` }">
            <div v-for="star in stars" :key="star.id" class="star" :style="{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDelay: `${star.twinkleDelay}s`
            }"></div>
        </div>

        <!-- AI IMAGE PROMPT:
    Pixel art floating clouds, wispy and ethereal, light purple and pink tones,
    8-bit style cloud sprites, semi-transparent, retro game floating clouds
    -->
        <div class="parallax-layer clouds-layer" :style="{ transform: `translateY(${scrollY * 0.2}px)` }">
            <div v-for="cloud in clouds" :key="cloud.id" class="cloud" :style="{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                transform: `scale(${cloud.scale})`,
                opacity: cloud.opacity
            }"></div>
        </div>

        <!-- AI IMAGE PROMPT:
    Pixel art distant mountains silhouette, dark purple mountains against
    dusk sky, layered mountain range, 16-bit style terrain,
    far background layer for parallax
    -->
        <div class="parallax-layer mountains-far" :style="{ transform: `translateY(${scrollY * 0.25}px)` }"></div>

        <!-- AI IMAGE PROMPT:
    Pixel art Japanese temple silhouettes on hills, pagoda style buildings,
    dark silhouettes against pink/purple dusk sky, 16-bit retro game architecture,
    mystical eastern temples
    -->
        <div class="parallax-layer temples-layer" :style="{ transform: `translateY(${scrollY * 0.35}px)` }"></div>

        <!-- AI IMAGE PROMPT:
    Pixel art cyberpunk city skyline silhouette, futuristic buildings,
    neon-lit windows, skyscrapers and towers, dark buildings against dusk sky,
    16-bit arcade game cityscape, lighthouse on the right side
    -->
        <div class="parallax-layer city-layer" :style="{ transform: `translateY(${scrollY * 0.45}px)` }"></div>

        <!-- AI IMAGE PROMPT:
    Pixel art water reflection layer, calm water surface reflecting city lights,
    pink and purple reflections, ripple effect, 16-bit water animation,
    bottom of screen water body
    -->
        <div class="parallax-layer water-layer" :style="{ transform: `translateY(${scrollY * 0.5}px)` }"></div>

        <!-- Foreground glow effect -->
        <div class="parallax-layer glow-layer"></div>
    </div>
</template>

<style scoped>
.parallax-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
}

.parallax-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    will-change: transform;
}

/* Sky Gradient */
.sky-layer {
    background: linear-gradient(180deg,
            #0a0a1a 0%,
            #1a0a2e 15%,
            #2d1b4e 30%,
            #4a2c7a 50%,
            #6a3d9a 65%,
            #9d4edd 75%,
            #c77dff 85%,
            #ff6b9d 92%,
            #ffb4a2 100%);
}

/* Stars */
.stars-layer {
    pointer-events: none;
}

.star {
    position: absolute;
    background: #ffffff;
    border-radius: 50%;
    animation: twinkle 2s ease-in-out infinite;
    box-shadow: 0 0 4px #ffffff, 0 0 8px rgba(255, 255, 255, 0.5);
}

@keyframes twinkle {

    0%,
    100% {
        opacity: 0.3;
        transform: scale(1);
    }

    50% {
        opacity: 1;
        transform: scale(1.3);
    }
}

/* Clouds */
.clouds-layer {
    pointer-events: none;
}

.cloud {
    position: absolute;
    width: 120px;
    height: 40px;
    background:
        radial-gradient(ellipse 60px 30px at 30px 20px, rgba(200, 180, 220, 0.6) 0%, transparent 70%),
        radial-gradient(ellipse 50px 25px at 60px 25px, rgba(200, 180, 220, 0.5) 0%, transparent 70%),
        radial-gradient(ellipse 40px 20px at 90px 20px, rgba(200, 180, 220, 0.4) 0%, transparent 70%);
    filter: blur(1px);
}

/* Mountains Far */
.mountains-far {
    bottom: 30%;
    height: 40%;
    background:
        linear-gradient(135deg, transparent 40%, #1a0a2e 40%, #1a0a2e 42%, transparent 42%),
        linear-gradient(120deg, transparent 50%, #2d1b4e 50%, #2d1b4e 55%, transparent 55%),
        linear-gradient(150deg, transparent 35%, #1a0a2e 35%, #1a0a2e 40%, transparent 40%),
        linear-gradient(125deg, transparent 60%, #2d1b4e 60%, #2d1b4e 63%, transparent 63%);
    opacity: 0.7;
}

/* Temples Layer */
.temples-layer {
    bottom: 25%;
    height: 35%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 150'%3E%3Cpath fill='%231a0a2e' d='M0 150 L0 100 L20 100 L20 80 L25 80 L25 60 L30 50 L35 60 L35 80 L40 80 L40 100 L60 100 L60 150 Z'/%3E%3Cpath fill='%231a0a2e' d='M80 150 L80 90 L90 90 L95 70 L100 60 L105 70 L110 90 L120 90 L120 150 Z'/%3E%3Cpath fill='%231a0a2e' d='M320 150 L320 85 L330 85 L330 70 L340 55 L350 70 L350 85 L360 85 L360 150 Z'/%3E%3C/svg%3E");
    background-repeat: repeat-x;
    background-position: bottom;
    background-size: 500px auto;
    opacity: 0.8;
}

/* City Skyline */
.city-layer {
    bottom: 15%;
    height: 45%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'%3E%3Cdefs%3E%3ClinearGradient id='building' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231a1a2e'/%3E%3Cstop offset='100%25' style='stop-color:%230a0a1a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='10' y='80' width='40' height='120' fill='url(%23building)'/%3E%3Crect x='60' y='50' width='30' height='150' fill='url(%23building)'/%3E%3Crect x='100' y='90' width='50' height='110' fill='url(%23building)'/%3E%3Crect x='160' y='40' width='35' height='160' fill='url(%23building)'/%3E%3Crect x='200' y='70' width='45' height='130' fill='url(%23building)'/%3E%3Crect x='260' y='30' width='40' height='170' fill='url(%23building)'/%3E%3Crect x='310' y='60' width='55' height='140' fill='url(%23building)'/%3E%3Crect x='380' y='45' width='30' height='155' fill='url(%23building)'/%3E%3Crect x='420' y='80' width='60' height='120' fill='url(%23building)'/%3E%3Crect x='500' y='55' width='35' height='145' fill='url(%23building)'/%3E%3Crect x='550' y='35' width='45' height='165' fill='url(%23building)'/%3E%3Crect x='610' y='70' width='40' height='130' fill='url(%23building)'/%3E%3Crect x='660' y='50' width='50' height='150' fill='url(%23building)'/%3E%3Cpath d='M730 200 L730 100 L740 100 L750 50 L760 100 L770 100 L770 200 Z' fill='url(%23building)'/%3E%3Ccircle cx='750' cy='55' r='8' fill='%23ffff00' opacity='0.8'/%3E%3C/svg%3E");
    background-repeat: repeat-x;
    background-position: bottom;
    background-size: 800px auto;
}

/* Add glowing windows to buildings */
.city-layer::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
        radial-gradient(2px 2px at 50px 130px, #ffff99 50%, transparent 50%),
        radial-gradient(2px 2px at 70px 100px, #ff99ff 50%, transparent 50%),
        radial-gradient(2px 2px at 120px 140px, #99ffff 50%, transparent 50%),
        radial-gradient(2px 2px at 180px 90px, #ffff99 50%, transparent 50%),
        radial-gradient(2px 2px at 230px 120px, #ff99ff 50%, transparent 50%),
        radial-gradient(2px 2px at 280px 80px, #99ffff 50%, transparent 50%),
        radial-gradient(2px 2px at 340px 110px, #ffff99 50%, transparent 50%),
        radial-gradient(2px 2px at 400px 95px, #ff99ff 50%, transparent 50%),
        radial-gradient(2px 2px at 460px 130px, #99ffff 50%, transparent 50%),
        radial-gradient(2px 2px at 520px 100px, #ffff99 50%, transparent 50%),
        radial-gradient(2px 2px at 580px 85px, #ff99ff 50%, transparent 50%),
        radial-gradient(2px 2px at 640px 120px, #99ffff 50%, transparent 50%);
    animation: windowFlicker 4s ease-in-out infinite;
}

@keyframes windowFlicker {

    0%,
    100% {
        opacity: 0.8;
    }

    25% {
        opacity: 1;
    }

    50% {
        opacity: 0.6;
    }

    75% {
        opacity: 0.9;
    }
}

/* Water Reflection */
.water-layer {
    bottom: 0;
    height: 20%;
    background: linear-gradient(180deg,
            rgba(10, 10, 26, 0.8) 0%,
            rgba(26, 10, 46, 0.6) 30%,
            rgba(45, 27, 78, 0.4) 60%,
            rgba(74, 44, 122, 0.3) 100%);
}

.water-layer::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background:
        repeating-linear-gradient(0deg,
            transparent,
            transparent 4px,
            rgba(157, 78, 221, 0.1) 4px,
            rgba(157, 78, 221, 0.1) 6px);
    animation: waterRipple 3s linear infinite;
}

@keyframes waterRipple {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(6px);
    }
}

/* Horizon Glow */
.glow-layer {
    bottom: 15%;
    height: 30%;
    background: radial-gradient(ellipse 100% 50% at 50% 100%,
            rgba(255, 107, 157, 0.3) 0%,
            rgba(157, 78, 221, 0.2) 30%,
            transparent 70%);
    pointer-events: none;
}
</style>
