// SEARCH BAR
  // Get the necessary DOM elements
  const indexView = document.querySelector('#index-view');
  const searchView = document.querySelector('#search-view');
  const searchIcon = document.querySelector('.search-icon');
  const exitSearchIcon = document.querySelector('.exit-search-icon');
  const searchInput = document.querySelector('#search-input');
  const filtersPage = document.querySelector('#filters-page')
  const navView = document.querySelector('.navigation')
  const savedView = document.querySelector('#saved-page')
  const movieDetails = document.querySelector('#movie-details-page')

//setting up the start point to 0 on the pictures scroll/carousel
const carousel = document.querySelectorAll('.carousel-scroll')
window.addEventListener('load', () =>{
    carousel.forEach(element => element.scrollLeft=0)})


// NAVIGATION - VIEWS

window.addEventListener('hashchange',navigatorViews)
function navigatorViews(){
  console.log({location})
  const hash = location.hash
  if(hash.startsWith('#movie-details')){
      console.log(`You're in Movie Details page`)
      goToMovieDetails()
    } else if(hash.startsWith('#filters')){
      console.log(`You're in Filters page`)
      goToFilters()
    } else if(hash.startsWith('#saved')){
      console.log(`You're in saved stuff page`) 
    } else if(hash.startsWith('#movies')){
      console.log(`You're in movies page`)
    } else if (hash.startsWith('#tv-shows')){
      console.log(`You're in TV-Shows Page`)
    } else if (hash.startsWith('#search')){
      console.log(`You're in search view`)
      goToSearch()
    } else{
      console.log(`You're back in the Home!`)
      goToHome()
    }
  }


  function goToSearch(){
    indexView.classList.add('disable-view');
    searchView.classList.replace('disable-view','search-view');
    searchIcon.classList.add('disable-view');
    exitSearchIcon.classList.remove('disable-view');
    navView.classList.replace('disable-view','navigation')
    filtersPage.classList.replace('filters-page','disable-view')
  }

  function goToHome(){
    searchView.classList.add('disable-view');
    indexView.classList.remove('disable-view');
    exitSearchIcon.classList.add('disable-view');
    searchIcon.classList.remove('disable-view');
    navView.classList.replace('disable-view','navigation')
    searchInput.value = '';
  }

  function goToFilters(){
    indexView.classList.add('disable-view');
    searchView.classList.add('disable-view');
    searchIcon.classList.add('disable-view');
    filtersPage.classList.replace('disable-view','filters-page')
    navView.classList.replace('navigation','disable-view')
  }

  function goToMovieDetails(){
    indexView.classList.replace('index-view','disable-view');
    searchView.classList.replace('navigation','disable-view');
    filtersPage.classList.replace('filters-page','disable-view')
    // savedView.classList.replace('saved-view','disabled-view')
    navView.classList.replace('navigation','disable-view')
    movieDetails.classList.toggle('disable-view')
  }