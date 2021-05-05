import {
  createElementFn,
  appendElementsToContainerFn,
} from '../helpers/index.js'
import { classNames, src } from '../../data/global/names.js'

class BackBtn {
  constructor(container) {
    const containerSent = document.querySelector(container)
    this.createElements()
    this.createComponents()

    appendElementsToContainerFn([this.backBtnComponent], containerSent)
  }

  createElements() {
    this.backBtnContainer = createElementFn({
      element: 'a',
      href: '/',
      classes: [classNames.global.leftBtn],
    })
    this.backBtnImage = createElementFn({
      element: 'img',
      src: src.arrowImg,
    })
  }

  createComponents() {
    this.backBtnComponent = appendElementsToContainerFn(
      [this.backBtnImage],
      this.backBtnContainer
    )
  }
}

export default BackBtn