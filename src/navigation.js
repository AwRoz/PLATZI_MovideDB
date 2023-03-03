// SEARCH BAR
  // Get the necessary DOM elements
  const indexView = document.querySelector('#index-view');
  const searchView = document.querySelector('#search-view');
  const searchIcon = document.querySelector('.search-icon');
  const exitSearchIcon = document.querySelector('.exit-search-icon');
  const searchInput = document.querySelector('#search-input');

  // Disable the index view and enable the search view when the search input is clicked
  function disableIndexView() {
    indexView.classList.add('disable-view');
    searchView.classList.remove('disable-view');
    searchView.classList.add('search-view');
    searchIcon.classList.add('disable-view');
    exitSearchIcon.classList.remove('disable-view');
  }

  // Close the search view and re-enable the index view when the exit search icon is clicked
  function closeSearchView() {
    searchView.classList.add('disable-view');
    indexView.classList.remove('disable-view');
    exitSearchIcon.classList.add('disable-view');
    searchIcon.classList.remove('disable-view');
    searchInput.value = '';
  }

  // Add event listeners to the search input and exit search icon
  searchInput.addEventListener('click', disableIndexView);
  exitSearchIcon.addEventListener('click', closeSearchView);
//


//setting up the start point to 0 on the pictures scroll/carousel
const carousel = document.querySelectorAll('.carousel-scroll')
window.addEventListener('load', () =>{
    carousel.forEach(element => element.scrollLeft=0)})


// NAVIGATION - VIEWS
function navigatorViews(){
  console.log({location})
  const hash = location.hash
  if(hash.startsWith('#movie-details')){
      console.log(`You're in Movie Details page`)
    } else if(hash.startsWith('#filters')){
      console.log(`You're in Filters page`)
    } else if(hash.startsWith('#saved')){
      console.log(`You're in saved stuff page`) 
    } else if(hash.startsWith('#movies')){
      console.log(`You're in movies page`)
    } else if (hash.startsWith('#tv-shows')){
      console.log(`You're in TV-Shows Page`)
    }
  }