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

function shuffle(array) {
  let i = array.length, ri
  while (i !== 0) {
    ri = Math.floor(Math.random() * i)
    i--
    [array[i], array[ri]] = [array[ri], array[i]]
  }
  return array
}

function loadImage(src) {
  return new Promise((fulfil, reject) => {
    const img = new Image
    img.src = src
    img.addEventListener('load', evt => {
      fulfil(img)
    })
    img.addEventListener('error', evt => {
      reject(evt)
    })
  })
}

function wait(duration) {
  return new Promise(fulfil => {
    setTimeout(fulfil, duration)
  })
}

function addFullscreenHandler(img) {
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

for (const img of document.querySelectorAll('.section-attachments img')) {
  imageObserver.observe(img)
  addFullscreenHandler(img)
}

let allImages
try {
  allImages = shuffle((await fetch('/assets/images.json').then(e => e.json())))
} catch {
  allImages = []
}

if (allImages.length) {
  for (const scroller of document.querySelectorAll('.image-scroller')) new Promise(async () => {
    const images = allImages.filter(e => e.startsWith(scroller.dataset.dir))
    let i = 0
    while (true) try {
      const img = await loadImage(`/assets/${images[i]}`)
      addFullscreenHandler(img)
      if (scroller.children.length) {
        scroller.children[0].classList.add('timed-out')
        setTimeout(() => {
          scroller.children[0].remove()
        }, 1000)
      }
      scroller.append(img)
      i = ++i % images.length
      if (images.length === 1) {
        break
      }
      await wait(5000)
    } catch {}
  })
} else {
  for (const scroller of document.querySelectorAll('.image-scroller')) {
    scroller.remove()
  }
}
