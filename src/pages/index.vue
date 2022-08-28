<script setup lang="ts">
import { shallowRef } from 'vue'
import { useAnimate } from '@vueuse/core'
import type { MaybeElement } from '@vueuse/core'
import { useEffectRippleBall } from '../composables/rippleBall';

const el = shallowRef<MaybeElement>()
const buttonRef = shallowRef<HTMLElement>()

const { play, pause, playState } = useAnimate(
  el,
  [
    { clipPath: 'circle(20% at 0% 30%)' },
    { clipPath: 'circle(20% at 50% 80%)' },
    { clipPath: 'circle(20% at 100% 30%)' },
  ],
  {
    duration: 3000,
    iterations: Infinity,
    reactive: true,
    direction: 'alternate',
    easing: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
  },
)
useEffectRippleBall(buttonRef)
</script>

<template>
  <div class="center content">
    <div class="content-animate">
      <p ref="el" class="text">
        VueUse useAnimate
      </p>
    </div>
    <div>
      <button ref="buttonRef" v-if="playState === 'running'" @click="pause">
        pause
      </button>
      <button ref="buttonRef" v-else @click="play">
        play
      </button>
    </div>
  </div>
</template>

<style scoped>
.content .content-animate {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
}
.content .content-animate .text {
  font-size: 50px;
  color: var(--c-accent);
  font-weight: 800;
}
</style>
