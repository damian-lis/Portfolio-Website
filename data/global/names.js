export const common = {
  headline: 'headline',
  title: 'title',
  image: 'image',
  paragraph: 'paragraph',
  link: 'link',
  code: 'code',
  theme: 'theme',
  submit: 'submit',
  fieldname: 'fieldname',
  message: 'message',
  listeners: 'listeners',
  attributes: 'attributes',
  classes: 'classes',
  styles: 'styles',
  TEXTAREA: 'TEXTAREA',
  type: 'type',
  string: 'string',
  object: 'object',
  header: 'header',
  list: 'list',
  image: 'image',
  on: 'on',
  off: 'off',
}

export const elements = {
  canvas: 'canvas',
  div: 'div',
  button: 'button',
  input: 'input',
  img: 'img',
  audio: 'audio',
  h: (value) => `h${value}`,
  a: 'a',
  p: 'p',
  pre: 'pre',
  code: 'code',
  form: 'form',
  label: 'label',
  textarea: 'textarea',
  span: 'span',
  ul: 'ul',
  li: 'li',
}

export const elementProps = {
  names: {
    textContent: 'textContent',
    disabled: 'disabled',
    innerHTML: 'innerHTML',
  },
  values: {
    blank: '_blank',
  },
}

export const styleProps = {
  names: {
    display: 'display',
    pointerEvents: 'pointerEvents',
    visibility: 'visibility',
    opacity: 'opacity',
    overflow: 'overflow',
    transform: 'transform',
    transition: 'transition',
    position: 'position',
    top: 'top',
    height: 'height',
  },
  values: {
    none: 'none',
    block: 'block',
    visible: 'visible',
    hidden: 'hidden',
    auto: 'auto',
    flex: 'flex',
    visible: 'visible',
    hidden: 'hidden',
    relative: 'relative',
    translateX: (value) => `translateX(${value}%)`,
    translateY: (value) => `translateY(${value}%)`,
  },
}

export const events = {
  click: 'click',
  keypress: 'keypress',
  resize: 'resize',
  DOMContentLoaded: 'DOMContentLoaded',
  submit: 'submit',
  focus: 'focus',
  input: 'input',
  scroll: 'scroll',
}

export const fetchProps = {
  methods: {
    POST: 'POST',
  },
  headers: {
    props: {
      ContentType: 'Content-Type',
    },
    values: {
      applicationJson: 'application/json',
    },
  },
}

export const info = {
  themeNote: '*Theme settings will be saved for your next visit',
  personalizeTheme: 'Personalize Theme',
  duringDevelopment: 'During dev...',
  momentLonger: 'literally wait a moment longer! ⚡',
  sendingNow: "I'm sending now! 🚀",
  writeMessage: 'Write to me a message',
}

export const formFieldsContent = [
  {
    label: 'Name',
    type: 'text',
    name: 'name',
    notification: 'name is required 😡',
  },
  {
    label: 'Subject',
    type: 'text',
    name: 'subject',
    notification: 'subject is required 😡',
  },
  {
    label: 'Email',
    type: 'email',
    name: 'email',
    notification: 'email is required 😡',
  },
  {
    label: 'Message',
    name: 'message',
    type: 'textarea',
    notification: 'message is required 😡',
  },
  {
    type: 'submit',
    value: 'Wyślij',
    name: 'submit',
    notification: 'Please wait a moment more! 🕐',
  },
]

export const idNames = {
  global: {
    mainContainer: 'global-main-container',
    leftContainer: 'global-left-container',
  },

  sneakPeeks: {
    hook: 'posts-hook',
    wrapper: 'posts-wrapper',
  },

  preview: {
    cornerTl: 'preview-corner-tl',
    cornerTr: 'preview-corner-tr',
    cornerBr: 'preview-corner-br',
    cornerBl: 'preview-corner-bl',
  },

  theme: {
    canvas: 'theme-canvas',
  },
}

export const classNames = {
  curtain: {
    container: 'curtain-container',
    active: 'curtain-active',
  },
  form: {
    card: 'form-card',
    cardInnerContainer: 'form-card-innerContainer',
    titleContainer: 'form-title-container',
    title: 'form-title',
    container: 'form-container',
    main: 'form',
    field: 'form-field',
    fieldMessage: 'form-field-message',
    btnDeleteContainer: 'form-btn-delete-container',
    btnDelete: 'form-btn-delete',
    spinnerContainer: 'form-spinner-container',
    spinner: 'form-spinner',
    fieldSubmitNotification: 'form-field-submit-notification',
    fieldInputNotification: 'form-field-input-notification',
  },
  global: {
    leftBtn: 'global-left-btn',
  },

  sneakPeeks: {
    hook: 'sneakPeeks-hook',
    wrapper: 'sneakPeeks-wrapper',
    container: 'sneakPeeks-container',
  },

  sneakPeek: {
    linkWrapper: 'sneakPeek-link-wrapper',
    container: 'sneakPeek-container',
    thubnail: 'sneakPeek-thubnail',
    preview: 'sneakPeek-preview',
    title: 'sneakPeek-title',
    intro: 'sneakPeek-intro',
    iconsContainer: 'sneakPeek-icons-container',
    ribbon: 'sneakPeek-ribbon',
    ribbonText: 'sneakPeek-ribbon-text',
  },

  preview: {
    container: 'preview-container',
    shadow: 'preview-shadow',
    corner: 'preview-corner',
  },

  skills: {
    container: 'skills-container',
    headline: 'skills-headline',
    header: 'skills-header',
    listItem: 'skills-list-item',
  },

  theme: {
    container: 'theme-container',
    optionsContainer: 'theme-options-container',
    optionsDot: 'theme-options-dot',
    note: 'theme-note',
    optionsDotActive: 'theme-options-dot-active',
  },

  animations: {
    slideInFromLeft: ' slideInFromLeft',
    slideInFromRight: 'slideInFromRight',
    slideInFromTop: 'slideInFromTop',
    showObject: 'showObject',
  },

  utilities: {
    animations: {
      slideInFromTop: 'slideInFromTop',
    },
    text: {
      center: 'text-center',
      justify: 'text-justify',
      lh: (value) => `text-lh-${value}`,
      smLeft: 'sm-text-left',
    },

    margin: (type, value) => `m${type}-${value}`,

    border: {
      rounded: 'rounded',
      danger: 'border-danger',
    },

    width: {
      full: 'w-full',
    },

    height: {
      full: 'h-full',
    },

    dash: 'dash',
  },

  prism: {
    languageJS: 'language-js',
  },
}

export const idReferences = {
  global: {
    mainContainer: '#global-main-container',
    leftContainer: '#global-left-container',
  },
  sneakPeeks: {
    main: '#sneakPeeks',
    trigger: '#sneakPeeks-trigger',
    wrapper: '#sneakPeeks-wrapper',
  },
  theme: {
    main: '#theme',
  },
  project: {
    description: '#project-description',
  },
  about: {
    description: '#about-description',
  },
  skills: {
    description: '#skills-description',
  },
}

export const paths = {
  playImg: '/images/icons/stopMusic.svg',
  pauseImg: '/images/icons/playMusic.svg',
  audioRecord: '/audio/ambient.mp3',
  emailImg: '/images/icons/email.svg',
  arrowImg: '/images/icons/arrow.svg',
}

export const mailEndPoint = 'https://dirt-ten-risk.glitch.me/api/mail/portfolio'
