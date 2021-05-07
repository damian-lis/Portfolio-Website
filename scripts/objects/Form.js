import curtain from './Curtain.js'
import {
  createElementFn,
  triggerActionOnWindowScrollFn,
  appendElementsToContainerFn,
  setPropsFn,
  toggleClassesFn,
} from '/scripts/helpers/index.js'
import {
  styleProps,
  elementProps,
  fetchProps,
  elements,
  events,
  classNames,
  mailEndPoint,
  paths,
  formFieldsContent,
  common,
  info,
} from '/data/global/names.js'

class Form {
  constructor(container, trigger) {
    const containerSent = document.querySelector(container)
    const triggerElement = document.querySelector(trigger)
    this.dataFromUser = {}

    this.createInitialElements()
    this.createInitialComponents()
    appendElementsToContainerFn([this.btnComponent], containerSent)

    triggerActionOnWindowScrollFn({
      onWhatElement: triggerElement,
      cbOnEnterTriggerEl: () => this.toggleBtnComponent(common.off),
      cbOnExitTriggerEl: () => this.toggleBtnComponent(common.on),
    })
  }

  createInitialElements() {
    this.btn = createElementFn({
      element: elements.button,
      classes: [classNames.global.leftBtn],
      listeners: [
        {
          event: events.click,
          cb: () => this.handleCardComponentCreate(),
        },
      ],
    })

    this.emailImg = createElementFn({
      element: elements.img,
      classes: [classNames.utilities.margin.t5],
      src: paths.emailImg,
    })
  }

  createInitialComponents() {
    this.btnComponent = appendElementsToContainerFn([this.emailImg], this.btn)
  }

  createMainElements() {
    this.card = createElementFn({
      element: elements.div,
      classes: [classNames.form.card],
      listeners: [{ event: events.click, cb: (e) => e.stopPropagation() }],
    })

    this.cardInnerContainer = createElementFn({
      element: elements.div,
      classes: [classNames.form.cardInnerContainer],
    })

    this.btnDeleteContainer = createElementFn({
      element: elements.div,
      classes: [classNames.form.btnDeleteContainer],
    })

    this.btnDelete = createElementFn({
      element: elements.button,
      classes: [classNames.form.btnDelete],
      textContent: 'X',
      listeners: [
        {
          event: events.click,
          cb: () => curtain.toggleShow(common.off),
        },
      ],
    })

    this.titleContainer = createElementFn({
      element: elements.div,
      classes: [classNames.form.titleContainer],
    })

    this.title = createElementFn({
      element: elements.h(3),
      classes: [classNames.form.title],
      textContent: info.writeMessage,
    })

    this.formContainer = createElementFn({
      element: elements.div,
      classes: [classNames.form.container],
    })

    this.form = createElementFn({
      element: elements.form,
      classes: [classNames.form.main],
      listeners: [
        { event: events.submit, cb: (e) => this.handleFormSubmit(e) },
      ],
    })

    this.formFields = formFieldsContent.map((field) =>
      createElementFn({
        element: elements.div,
        classes: [
          classNames.form.field,
          `${classNames.form.field}-${field.name}`,
        ],
      })
    )

    this.formFieldsElements = formFieldsContent.map((fieldContent) =>
      this.createFormFieldElements(fieldContent)
    )

    this.formSubmitInput = (() => {
      let submitInput
      this.formFieldsElements.map((formFieldElements) => {
        if (formFieldElements.input.type === common.submit)
          submitInput = formFieldElements.input
      })
      return submitInput
    })()

    this.formTextInputs = (() => {
      let textInputs = []
      this.formFieldsElements.map((formFieldElements) => {
        if (formFieldElements.input.type !== common.submit)
          textInputs.push(formFieldElements.input)
      })

      return textInputs
    })()

    this.formSpinnerContainer = createElementFn({
      element: elements.div,
      classes: [classNames.form.spinnerContainer],
    })

    this.formSpinner = createElementFn({
      element: elements.div,
      classes: [classNames.form.spinner],
    })
  }

  createFormFieldElements({ label, type, name, value, notification }) {
    let lab, input

    switch (type) {
      case common.submit:
        input = createElementFn({
          element: elements.input,
          type,
          name,
          id: name,
          value,
        })
        break

      default:
        lab = createElementFn({
          element: elements.label,
          textContent: label,
          htmlFor: name,
        })
        input = createElementFn({
          element:
            type === elements.textarea ? elements.textarea : elements.input,
          type,
          name,
          id: name,
          listeners: [
            {
              event: events.input,
              cb: (e) => this.handleFormInputTyping(e, name),
            },
            {
              event: events.focus,
              cb: (e) => this.handleFormInputFocus(e),
            },
          ],
        })
        break
    }
    const notificationEl = createElementFn({
      element: elements.span,
      attributes: [{ name: common.fieldname, value: name }],
      classes: [
        type === common.submit
          ? classNames.form.fieldSubmitNotification
          : classNames.form.fieldInputNotification,
      ],
      innerHTML: notification,
      listeners: [
        {
          event: events.click,
          cb: (e) => this.handleFormNotificationClick(e),
        },
      ],
    })

    return lab ? { lab, input, notificationEl } : { input, notificationEl }
  }

  createMainComponents() {
    this.formSpinnerComponent = appendElementsToContainerFn(
      [this.formSpinner],
      this.formSpinnerContainer
    )

    this.formFieldComponents = this.formFields.map((field, index) => {
      const { lab, input, notificationEl } = Object.entries(
        this.formFieldsElements
      )[index][1]

      lab
        ? appendElementsToContainerFn([lab, input, notificationEl], field)
        : appendElementsToContainerFn(
            [input, notificationEl, this.formSpinnerComponent],
            field
          )

      return field
    })

    this.formComponent = (() => {
      this.formFieldComponents.map((fieldComponent) =>
        this.form.appendChild(fieldComponent)
      )
      this.formContainer.appendChild(this.form)

      return this.formContainer
    })()

    this.titleComponent = appendElementsToContainerFn(
      [this.title],
      this.titleContainer
    )

    this.cardInnerComponent = appendElementsToContainerFn(
      [this.titleComponent, this.formComponent],
      this.cardInnerContainer
    )

    this.btnDeleteComponent = appendElementsToContainerFn(
      [this.btnDelete],
      this.btnDeleteContainer
    )

    this.cardComponent = appendElementsToContainerFn(
      [this.btnDeleteComponent, this.cardInnerComponent],
      this.card
    )

    return this.cardComponent
  }

  handleFormInputTyping(e, name) {
    this.dataFromUser[name] = e.target.value
  }

  handleFormInputFocus(e) {
    this.toggleBorderDanger(common.off, {
      element: e.target,
    })
    this.toggleAlertMessage(common.off, {
      element: e.target.parentElement.querySelector(elements.span),
    })
  }

  handleFormNotificationClick(e) {
    e.target.parentElement
      .querySelector(
        e.target.attributes.fieldname.value === common.message
          ? elements.textarea
          : elements.input
      )
      .focus()
  }

  handleCardComponentCreate() {
    this.toggleBtnComponent(common.off)
    this.createMainElements()
    this.createMainComponents()
    curtain.toggleShow(common.on, {
      appendElements: [this.cardComponent],
      cbsToCallOnHidden: [
        () => {
          this.toggleBtnComponent(common.on)
          this.resetFormInputsValue()
          this.resetDataFromUser()
        },
      ],
    })
  }

  async handleEmailSent() {
    return await fetch(mailEndPoint, {
      method: fetchProps.methods.POST,
      headers: {
        [fetchProps.headers.props.ContentType]:
          fetchProps.headers.values.applicationJson,
      },
      body: JSON.stringify(this.dataFromUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.showMessageAfterSubmit(data.message)
        } else {
          this.showMessageAfterSubmit(data.message)
        }
      })
      .catch(() => {
        const message = 'Unable to connect to the server 😔'
        this.showMessageAfterSubmit(message)
      })
  }

  async handleFormSubmit(e) {
    e.preventDefault()
    const areEmptyFormInputsValue = this.checkIfEmptyFormInputsValue()
    if (areEmptyFormInputsValue) return

    this.disableFormInputs()
    this.toggleDeleteBtnComponent(common.on)
    this.toggleSpinnerComponent(common.on)
    this.toggleSubmitlNotifications(common.on, {
      firstNotificationDelay: 2000,
      secondNotificationDelay: 8000,
      thirdNotificationDelay: 15000,
    })

    await this.handleEmailSent()
    this.toggleDeleteBtnComponent(common.off)
    this.toggleSpinnerComponent(common.off)
    this.toggleSubmitlNotifications(common.off, {})
  }

  toggleDeleteBtnComponent(toggle) {
    setPropsFn([
      {
        elements: [this.btnDeleteComponent],
        styleProps: [
          {
            name: styleProps.names.visibility,
            value:
              toggle === common.on
                ? styleProps.values.hidden
                : styleProps.values.visible,
          },
          {
            name: styleProps.names.opacity,
            value: toggle === common.on ? 0 : 1,
          },
        ],
      },
    ])
  }

  toggleSubmitlNotifications(
    toggle,
    { firstNotificationDelay, secondNotificationDelay, thirdNotificationDelay }
  ) {
    const formSubmitnotification = this.formSubmitInput.parentElement.querySelector(
      elements.span
    )

    switch (toggle) {
      case common.on:
        this.showNotificationTimeout = setPropsFn(
          [
            {
              elements: [formSubmitnotification],
              styleProps: [
                {
                  name: styleProps.names.visibility,
                  value: styleProps.values.visible,
                },
                {
                  name: styleProps.names.opacity,
                  value: 1,
                },
              ],
            },
          ],
          firstNotificationDelay
        )
        this.changeFirstNotificationTimout = setPropsFn(
          [
            {
              elements: [formSubmitnotification],
              props: [
                {
                  name: elementProps.names.innerHTML,
                  value: info.momentLonger,
                },
              ],
            },
          ],
          secondNotificationDelay
        )
        this.changeSecondNotificationTimout = setPropsFn(
          [
            {
              elements: [formSubmitnotification],
              props: [
                {
                  name: elementProps.names.innerHTML,
                  value: info.sendingNow,
                },
              ],
            },
          ],
          thirdNotificationDelay
        )
        break

      case common.off:
        clearInterval(this.showNotificationTimeout)
        clearInterval(this.changeFirstNotificationTimout)
        clearInterval(this.changeSecondNotificationTimout)
        setPropsFn([
          {
            elements: [formSubmitnotification],
            styleProps: [
              {
                name: styleProps.names.visibility,
                value: styleProps.values.hidden,
              },
              {
                name: styleProps.names.opacity,
                value: 0,
              },
            ],
          },
        ])

      default:
        break
    }
  }

  toggleAlertMessage(toggle, { element }) {
    setPropsFn([
      {
        elements: [element],
        styleProps: [
          {
            name: styleProps.names.visibility,
            value:
              toggle === common.on
                ? styleProps.values.visible
                : styleProps.values.hidden,
          },
          {
            name: styleProps.names.opacity,
            value: toggle === common.on ? 1 : 0,
          },
        ],
      },
    ])
  }

  toggleBorderDanger(toggle, { element }) {
    toggleClassesFn(toggle, {
      elements: [element],
      classes: [classNames.utilities.border.danger],
    })
  }

  toggleBtnComponent(toggle) {
    setPropsFn([
      {
        elements: [this.btnComponent],
        styleProps: [
          {
            name: styleProps.names.transform,
            value:
              toggle === common.on
                ? styleProps.values.translateX(0)
                : styleProps.values.translateX(-100),
          },
        ],
      },
    ])
  }

  toggleSpinnerComponent(toggle) {
    setPropsFn([
      {
        elements: [this.formSubmitInput],
        styleProps: [
          {
            name: styleProps.names.display,
            value:
              toggle === common.on
                ? styleProps.values.none
                : styleProps.values.block,
          },
        ],
      },
      {
        elements: [this.formSpinnerComponent],
        styleProps: [
          {
            name: styleProps.names.display,
            value:
              toggle === common.on
                ? styleProps.values.flex
                : styleProps.values.none,
          },
        ],
      },
    ])
  }

  resetFormInputsValue() {
    this.formTextInputs.map((input) => {
      input.value = ''
    })
  }

  resetDataFromUser() {
    this.dataFromUser = {}
  }

  showMessageAfterSubmit(message) {
    this.resetFormInputsValue()
    setPropsFn(
      [
        {
          elements: [this.titleComponent],
          styleProps: [
            {
              name: styleProps.names.top,
              value: '50%',
            },
            {
              name: styleProps.names.transition,
              value: '0.9s',
            },
            {
              name: styleProps.names.position,
              value: styleProps.values.relative,
            },
            {
              name: styleProps.names.transform,
              value: styleProps.values.translateY(-50),
            },
          ],
        },

        {
          elements: [this.formComponent],
          styleProps: [
            {
              name: styleProps.names.transition,
              value: '0.3s',
            },
            {
              name: styleProps.names.height,
              value: '0px',
            },
            {
              name: styleProps.names.overflow,
              value: styleProps.values.hidden,
            },
            {
              name: styleProps.names.opacity,
              value: 0,
            },
            {
              name: styleProps.names.visibility,
              value: styleProps.values.hidden,
            },
          ],
        },
        {
          elements: [this.title],
          props: [
            {
              name: elementProps.names.innerHTML,
              value: message,
            },
          ],
        },
      ],
      300
    )
  }

  checkIfEmptyFormInputsValue() {
    let isEmptyInputValue = false
    this.formTextInputs.map((input) => {
      if (input.value === '') {
        this.toggleBorderDanger(common.on, { element: input })
        this.toggleAlertMessage(common.on, {
          element: input.parentElement.querySelector(elements.span),
        })
        isEmptyInputValue = true
      }
    })

    return isEmptyInputValue
  }

  disableFormInputs() {
    const formInputs = [this.formSubmitInput, ...this.formTextInputs]

    formInputs.map((input) =>
      setPropsFn([
        {
          elements: [input],
          props: [
            {
              name: elementProps.names.disabled,
              value: true,
            },
          ],
          styleProps: [
            {
              name: styleProps.names.opacity,
              value: 0.4,
            },
          ],
        },
      ])
    )
  }
}

export default Form
