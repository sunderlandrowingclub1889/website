const joinUsButton = document.querySelector('#join-us-button')
joinUsButton.addEventListener('click', evt => {
  document.querySelector('#join-us-section').scrollIntoView({behavior: 'smooth'})
})