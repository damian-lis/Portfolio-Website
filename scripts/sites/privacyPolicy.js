import themes from '/data/global/themes.js'
import { idReferences, paths } from '/data/global/names.js'
import {
  privacyPolicyDescription,
  formFeidlsDescription,
} from '/data/descriptions/index.js'
import {
  DescriptionArrange,
  Theme,
  Particles,
  Form,
  Back,
  Audio,
} from '/scripts/objects/index.js'

new DescriptionArrange({
  container: idReferences.privacyPolicy.description,
  description: privacyPolicyDescription,
})
new Theme({
  container: idReferences.theme.main,
  themesObj: themes,
  background: {
    Object: Particles,
    objContainer: idReferences.global.mainContainer,
  },
})
new Back({ container: idReferences.global.leftContainer })
new Audio({
  container: idReferences.global.leftContainer,
  path: paths.privacyPolicyIntroduction,
})
new Form({
  container: idReferences.global.leftContainer,
  description: formFeidlsDescription,
})
