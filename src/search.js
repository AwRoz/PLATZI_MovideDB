const indexView = document.querySelector('#index-view')
const searchView = document.querySelector('#search-view')
const searchIcon = document.querySelector('.search-icon')
const exitSearchIcon = document.querySelector('.exit-search-icon')
const searchInput = document.querySelector('#search-input')
exitSearchIcon.addEventListener('click',closeSearchView)
searchInput.addEventListener('click',disableIndexView)


function disableIndexView(){
    indexView.classList.add('disable-view')
    searchView.classList.remove('disable-view')
    searchView.classList.add('search-view')
    searchIcon.classList.add('disable-view')
    exitSearchIcon.classList.remove('disable-view')
}

function closeSearchView(){
    searchView.classList.add('disable-view')
    indexView.classList.remove('disable-view')
    exitSearchIcon.classList.add('disable-view')
    searchIcon.classList.remove('disable-view')
    searchInput.value = ''
}