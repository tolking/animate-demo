import { nextTick, shallowRef, watch } from 'vue'
import { unrefElement, useAnimate, useElementBounding, useEventListener, useMouse } from '@vueuse/core'
import type { MaybeComputedElementRef } from '@vueuse/core'

export function useEffectRippleBall(el: MaybeComputedElementRef) {
  const { x, y } = useMouse()
  const rippleBallRef = shallowRef<HTMLElement>()

  watch(() => unrefElement(el), (dom) => {
    dom && nextTick(() => update(dom))
  })

  function update(el: HTMLElement | SVGElement) {
    const { top, left, width, height } = useElementBounding(el)
    const rippleBall = document.createElement('span')
    const size = Math.max(width.value, height.value) * 1.2

    rippleBall.style.position = 'absolute'
    rippleBall.style.left = `${x.value - left.value - size / 2}px`
    rippleBall.style.top = `${y.value - top.value - size / 2}px`
    rippleBall.style.width = `${size}px`
    rippleBall.style.height = `${size}px`
    rippleBall.style.borderRadius = '50%'
    rippleBall.style.backgroundColor = 'rgba(110, 125, 133, .4)'
    rippleBall.style.transformOrigin = 'center'

    el.style.position = 'relative'
    el.style.overflow = 'hidden'

    el.appendChild(rippleBall)

    rippleBallRef.value = rippleBall
  }

  const { play: _paly, animate } = useAnimate(rippleBallRef, [
    { transform: 'scale(0)' },
    { transform: 'scale(1)' },
  ], {
    immediate: false,
    duration: 300,
    onReady(animate) {
      useEventListener(animate, 'finish', () => {
        rippleBallRef.value &&
          unrefElement(el)?.contains(rippleBallRef.value) &&
          unrefElement(el)?.removeChild(rippleBallRef.value)
      })
    },
  })

  function play() {
    if (animate.value?.playState !== 'running' && unrefElement(el)) {
      update(unrefElement(el)!)
      _paly()
    }
  }

  return { play }
}
