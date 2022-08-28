<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEffectRippleBall } from './composables/rippleBall'
import type { ComponentPublicInstance } from 'vue'

const router = useRouter()
const menuRefs = ref<Array<Element | ComponentPublicInstance | null>>([])
const currentIndex = ref()
const currentRef = ref()

const { play } = useEffectRippleBall(currentRef)

function handleClick(index: number) {
  if (currentIndex.value === index) {
    play()
  } else {
    currentIndex.value = index
    currentRef.value = menuRefs.value[index]
  }
}
</script>

<template>
  <aside class="menu">
    <router-link
      v-for="(item, index) in router.options.routes"
      :ref="(el) => { menuRefs[index] = el }"
      :key="item.path"
      :to="item.path"
      class="menu-item"
      @click="handleClick(index)"
    >
      {{ item.path.match(/\/(\w+)$/)?.[1] || 'home' }}
    </router-link>
  </aside>
  <main class="main">
    <router-view />
  </main>
</template>

<style scoped>
.menu {
  width: 200px;
  min-height: 100vh;
  border-right: 1px solid var(--c-border);
}
.menu .menu-item {
  display: block;
  padding-left: 30px;
  height: 50px;
  line-height: 50px;
  color: var(--c-font);
  text-decoration: none;
}
.menu .menu-item:hover {
  color: var(--c-accent-light);
}
.menu .menu-item.router-link-active {
  color: var(--c-accent);
}
.main {
  flex: 1;
}
</style>
