const imageObserver = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src
      entry.target.removeAttribute('data-src')
      imageObserver.unobserve(entry.target)
    }
  })
})

for (const img of document.querySelectorAll('.section img')) {
  imageObserver.observe(img)
}

try {
  const cause = await fetch('https://api-v3.easyfundraising.org.uk/causes/e8b381e5b2125a1f43ecd65b8348b3fbb2e600e9').then(e => e.json())
  document.getElementById('easyfundraising-total').textContent = cause.details.cause.donationTotal
  document.getElementById('easyfundraising-supporters').textContent = cause.details.cause.numberOfSupporters
} catch {
  document.getElementById('easyfundraising-info').remove()
}
