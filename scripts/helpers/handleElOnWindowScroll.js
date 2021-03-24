export default ({
  onWhatElement,
  cbWhenTrue = () => {},
  cbWhenFalse = () => {},
  modifier = 1,
}) => {
  if (!onWhatElement) return
  const element = document.querySelector(onWhatElement)

  window.addEventListener('scroll', () => {
    if (
      window.innerHeight + window.pageYOffset * modifier >
      element.offsetTop
    ) {
      cbWhenTrue(element)
    } else {
      cbWhenFalse(element)
    }
  })
}