// SEARCH BAR
  // Get the necessary DOM elements
  const indexView = document.querySelector('#index-view');
  const searchView = document.querySelector('#search-view');
  const searchIcon = document.querySelector('.search-icon');
  const searchInput = document.querySelector('#search-input')
  const filtersPage = document.querySelector('#filters-page')
  const navView = document.querySelector('.navigation')
  const savedView = document.querySelector('#saved-page')
  const mediaDetails = document.querySelector('#media-details-page')
  const exitSearchIcon = document.querySelector('.exit-search-icon')
  
  const homedBtn = document.querySelector('#btn-home').addEventListener('click', () => {location.hash='#home'; window.scrollTo(0,0)})
  const moviesdBtn = document.querySelector('#btn-movies').addEventListener('click', () => {location.hash='#index-movies'})
  const tvShowsdBtn = document.querySelector('#btn-tv-shows').addEventListener('click', () => {location.hash='#ftv'})
  const savedBtn = document.querySelector('#btn-saved').addEventListener('click', () => {location.hash='#saved'})
  const filtersBtn = document.querySelector('#btn-custom').addEventListener('click', () => {location.hash='#filters'})
  searchInput.addEventListener('click', ()=> {location.hash = '#search'})
  exitSearchIcon.addEventListener('click',()=>{location.hash='#home'});
  
  const castContainer = document.querySelector('.cast-list')
  const mediaPicsContainer = document.querySelector('.media-list')
  const similarMediacontainer = document.querySelector('#similar-list-container')

  //setting up the start point to 0 on the pictures scroll/carousel
  const carousel = document.querySelectorAll('.carousel-scroll')
  window.addEventListener('load', () =>{
  carousel.forEach(element => element.scrollLeft=0)})

// NAVIGATION - VIEWS
location.hash = '#home'

window.addEventListener('hashchange',navigatorViews)

function navigatorViews(){
  console.log({location})
  const hash = location.hash
  if(hash.startsWith('#movie') || hash.startsWith('#tv')){
      console.log(`You're in media details page`)
      goToMediaDetails()
    } else if(hash.startsWith('#filters')){
      console.log(`You're in Filters page`)
      goToFilters()
    } else if(hash.startsWith('#saved')){
      console.log(`You're in saved stuff page`) 
    } else if(hash.startsWith('#movie')){
      console.log(`You're in movies page`)
    } else if (hash.startsWith('#ftv')){
      console.log(`You're in TV-Shows Page`)
      goToIndexTv()
    } else if (hash.startsWith('#search')){
      console.log(`You're in search view`)
      goToSearch()
    } else if(hash.startsWith('#index-movies')){
      goToIndexMovies()
    }
    else{
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
    indexView.classList.replace('disable-view','index-view')
    exitSearchIcon.classList.add('disable-view');
    searchIcon.classList.remove('disable-view');
    navView.classList.replace('disable-view','navigation')
    filtersPage.classList.replace('filters-page','disable-view')
    mediaDetails.classList.replace('media-details-page','disable-view')
    searchInput.value = '';
    carousel.forEach(element => element.scrollLeft=0)
    window.scrollTo(0,0)
    getTrendsList()
    getUpcomingMovies()
  }

  function goToFilters(){
    indexView.classList.add('disable-view');
    searchView.classList.add('disable-view');
    searchIcon.classList.add('disable-view');
    filtersPage.classList.replace('disable-view','filters-page')
    navView.classList.replace('navigation','disable-view')
    mediaDetails.classList.replace('media-details-page','disable-view')
    window.scrollTo(0,0)
  }

  function goToMediaDetails(){
    castContainer.innerHTML = ''
    mediaPicsContainer.innerHTML = ''
    similarMediacontainer.innerHTML = ''
    
    indexView.classList.replace('index-view','disable-view');
    searchView.classList.replace('navigation','disable-view');
    filtersPage.classList.replace('filters-page','disable-view')
    // savedView.classList.replace('saved-view','disabled-view')
    navView.classList.replace('navigation','disable-view')
    mediaDetails.classList.replace('disable-view','media-details-page')

    const [mediaHash,mediaId] = location.hash.split('=')
    const [_,mediaType] = mediaHash.split('#') //The destructuring assignment is used to assign these two elements to variables _ and mediaType. The underscore _ is used as a placeholder for the first element that we don't care about.
    getMediaDetails(mediaType,mediaId)
    getCast(mediaType,mediaId,castContainer)
    getMediaPics(mediaType,mediaId,mediaPicsContainer)
    getSimilar(mediaType,mediaId,similarMediacontainer)

    carousel.forEach(element => element.scrollLeft=0)
    window.scrollTo(0,0)
  }

  function goToIndexMovies(){
    getTrendsList('movie')
    carousel.forEach(element => element.scrollLeft=0)
    window.scrollTo(0,0)
  }

  function goToIndexTv(){
    getTrendsList('tv')
    carousel.forEach(element => element.scrollLeft=0)
    window.scrollTo(0,0)
  }