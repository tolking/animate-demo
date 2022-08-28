<script setup lang="ts">
import { ref } from 'vue'
import { useEffectFocus } from '../composables/focus'
import { useEffectRippleBall } from '../composables/rippleBall'

const inputRef = ref<HTMLElement>()
const buttonRef = ref<HTMLElement>()
const currentRef = ref<HTMLElement>()

const { play: playRippleBall } = useEffectRippleBall(buttonRef)
const { play, reverse } = useEffectFocus(currentRef, {
  immediate: false,
  duration: 300,
  commitStyles: true,
  fill: 'forwards',
})

function focus(val: HTMLElement | undefined) {
  currentRef.value = val
  play()
}
</script>

<template>
  <section class="card">
    <input ref="inputRef" @focus="focus(inputRef)" @blur="reverse" />
    <div style="height:20px" />
    <button ref="buttonRef" @focus="focus(buttonRef)" @blur="reverse" @click="playRippleBall">
      button
    </button>
  </section>
</template>
