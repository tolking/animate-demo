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
  { filter: 'blur(20px)' },
  { filter: 'blur(0px)' },
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
      <img ref="imgRef" :src="src" width="536" height="354" @load="play" />
    </div>
    <button ref="buttonRef" @click="handleClick">
      load
    </button>
  </div>
</template>

<style scoped>
.img-box {
  overflow: hidden;
}
</style>
