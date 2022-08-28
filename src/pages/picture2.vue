<script setup lang="ts">
import { useAnimate } from '@vueuse/core'
import { computed, ref, shallowRef } from 'vue'
import { useEffectRippleBall } from '../composables/rippleBall'

const imgRef = shallowRef<HTMLElement>()
const buttonRef = shallowRef<HTMLElement>()
const count = ref(0)
const src = computed(() => `https://picsum.photos/536/354?random&${count.value}`)

const { play: playRippleBall } = useEffectRippleBall(buttonRef)
const { play } = useAnimate(imgRef, [
  {
    backgroundSize: '6px 6px',
    backdropFilter: 'blur(14px)',
  },
  {
    backgroundSize: '0px 0px',
    backdropFilter: 'blur(0px)',
  },
], {
  duration: 300,
  commitStyles: true,
  fill: 'forwards',
  easing: 'ease-out',
})

function handleClick() {
  playRippleBall()
  count.value++
}
</script>

<template>
  <div class="card center">
    <div class="img-box">
      <img :src="src" width="536" height="354" @load="play" />
      <div ref="imgRef" class="img-mask" />
    </div>
    <button ref="buttonRef" @click="handleClick">
      load
    </button>
  </div>
</template>

<style scoped>
.img-box {
  position: relative;
  overflow: hidden;
}
.img-box .img-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: radial-gradient(transparent 1px,var(--c-bg) 1px);
}
</style>
