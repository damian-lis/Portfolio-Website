import { common, events } from '/data/global/names.js'

export default ({
  onWhatElement: trigerElement,
  cbOnEnterTriggerEl = () => {},
  cbOnExitTriggerEl = () => {},
  modifier = 0,
}) => {
  if (!trigerElement) return

  let element = trigerElement

  if (typeof trigerElement === common.string) {
    element = document.querySelector(trigerElement)
  }

  window.addEventListener(events.scroll, () => {
    window.innerHeight + window.pageYOffset - modifier > element.offsetTop
      ? cbOnEnterTriggerEl(element)
      : cbOnExitTriggerEl(element)
  })
}
