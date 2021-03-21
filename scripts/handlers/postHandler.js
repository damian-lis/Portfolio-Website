import Post from '../objects/Post.js'

export default (posts) => {
  posts.map((post) => new Post('.post-wrapper', post))

  const postSection = document.querySelector('#post-section')

  let postSectionHeight = postSection.clientHeight

  window.addEventListener('resize', () => {
    postSectionHeight = postSection.clientHeight
  })

  window.onscroll = function () {
    if (
      window.innerHeight + window.pageYOffset + postSectionHeight >=
      document.body.offsetHeight
    ) {
      postSection.classList.add('slideInFromTop')
      window.onscroll = null
    }
  }
}
