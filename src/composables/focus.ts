import { useAnimate, UseAnimateOptions } from '@vueuse/core'
import type { MaybeComputedElementRef } from '@vueuse/core'

export function useEffectFocus(
  el: MaybeComputedElementRef,
  options: number | UseAnimateOptions<false> = 300,
) {
  return useAnimate(el, [
    {
      outline: '0px solid rgba(100, 108, 255, .8)',
      outlineOffset: '0px',
      boxShadow: '0 0 0px 0px rgba(134, 140, 240, .4)',
    },
    {
      outline: '1px solid rgba(100, 108, 255, .8)',
      outlineOffset: '1px',
      boxShadow: '0 0 3px 5px rgba(134, 140, 240, .4)',
    },
  ], options)
}
