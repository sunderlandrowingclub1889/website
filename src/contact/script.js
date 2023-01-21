const imageObserver = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src
      entry.target.removeAttribute('data-src')
      imageObserver.unobserve(entry.target)
    }
  })
})

const E = document.createElement.bind(document)

for (const img of document.querySelectorAll('.section-attachments img')) {
  imageObserver.observe(img)
  img.addEventListener('click', evt => {
    document.body.style.overflow = 'hidden'
    const fsImg = E('img')
    fsImg.src = img.src.length ? img.src : img.dataset.src
    const cover = E('div')
    cover.id = 'fullscreen-cover'
    cover.addEventListener('click', evt => {
      cover.remove()
      document.body.style.overflow = null
    })
    document.body.append(cover)
    fsImg.addEventListener('load', evt => {
      cover.append(fsImg)
    })
  })
}
