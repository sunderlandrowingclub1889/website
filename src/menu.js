const button = document.querySelector('#nav-bar-hamburger-button')
const navList = document.querySelector('#nav-list')

let navListVisible = false
button.addEventListener('click', evt => {
  if (navListVisible) {
    navList.style.display = 'none'
    delete button.dataset.listVisible
    navListVisible = false
  } else {
    navList.style.display = 'flex'
    button.dataset.listVisible = ''
    navListVisible = true
  }
})
