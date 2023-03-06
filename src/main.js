const api = axios.create({
    baseURL: `https://api.themoviedb.org/3`,
    Headers:{
        'content-type':'application/json;charset=utf-8'
    },
    params:{
        'api_key':apiKey,
}})
const apiImages = axios.create({
    baseURL: `https://api.themoviedb.org/3`,
    Headers:{
        'content-type':'application/json;charset=utf-8',
    },
    params:{
        'api_key':apiKey,
        'language':'en-US',
        'include_image_language':'en'
    }
})

const imgEndpoint = 'https://image.tmdb.org/t/p'
const imgSmall = 'w300'
const imgMedium = 'w500'
const imgLarge = 'w1280'
const imgOriginal = 'original'


async function getTrendsList(){
    try{
        const {data} = await api(`/trending/all/day`)
        const trendList = data.results
        console.log(trendList)
        //DOM MAnipulation
        insertFeatured(trendList)
        insertTrendList(trendList)
    }catch(err){
        console.log(err)
    }finally{
        console.log('Promise Done!')
    }
}

async function getGenres(mediaType, mediaGenres){
    const {data} = await api(`genre/${mediaType}/list`)
    const genresList = data.genres
    const filteredCategories = mediaGenres.map(id => genresList.find(category => category.id === id))
    
    const categoriesListElement = document.querySelector('.featured-categories-list')
    filteredCategories.forEach(category => {
        const categoryElement = document.createElement('li')
              categoryElement.classList.add('category-tag')
        const categoryLink = document.createElement('a')
              categoryLink.innerHTML = category.name
        
        categoryElement.appendChild(categoryLink)
        categoriesListElement.appendChild(categoryElement)
    })
}

async function getMediaTrailer(mediaType, mediaID){
    const {data} = await api(`/${mediaType}/${mediaID}/videos`)
    const mediaVideos = data.results
    console.log(mediaVideos)
    const trailer = mediaVideos.find(video => video.type === 'Trailer')
    const trailerKey = trailer.key
    return trailerKey
}

async function getUpcomingMovies(){
    const {data} = api(`/discover/movie`)
}
// async function getFeaturedImg(mediaType,mediaId){
//     try{
//         const mediaImages =  await apiImages(`/${mediaType}/${mediaId}/images`)
//         console.log(mediaImages)
//         const imgPath = mediaImages.data.posters[0].file_path
//         const imageElement = document.querySelector('.featured-movie-img')
//         const src = `${imgEndpoint}/${imgLarge}${imgPath}`
//         // console.log(src)
//         imageElement.setAttribute('src',src)
//     }catch(err){
//         console.log(err)
//     }
// }

getTrendsList()

async function insertFeatured(trendList){
    const featuredRandom = Math.round(Math.random() * (Object.keys(trendList).length - 1)) //getting only one media randomly for the featured content section
    const featuredSection = document.querySelector('.featured-movie')
    const imageElement = document.querySelector('.featured-movie-img')
    const trailer = document.querySelector('.featured-movie-trailer-link')

    imageElement.setAttribute('src',`${imgEndpoint}/${imgLarge}/${trendList[featuredRandom].backdrop_path}`)
    
    const mediaTitle = (trendList[featuredRandom].title) //movies contains their title on the attribute 'title', tv-shows on 'name'
                        ? trendList[featuredRandom].title  //movies doesn't contain 'name'
                        : trendList[featuredRandom].name //movies doesn't contain 'title', 
    const title = document.createElement('h2')
          title.classList.add('featured-movie-title')
          title.innerHTML = mediaTitle    
          //When the title is too long, it makes an unaesthetic wrap, so it's better to reduce the font size instead.
          if(mediaTitle.length > 25){
              title.classList.toggle('featured-movie-title__small')
          }

    const description = document.createElement('p')
          description.classList.add('featured-movie-description')
          description.innerHTML = trendList[featuredRandom].overview

    const genresContainer = document.createElement('ul')
          genresContainer.classList.add('featured-categories-list')

    featuredSection.appendChild(title)
    featuredSection.appendChild(description)
    featuredSection.appendChild(genresContainer)

    //getting featured movie genres ids and the mdeia_type (depending on the media_type the API endpoint is different)
    const mediaGenres = trendList[featuredRandom].genre_ids
    const mediaType = trendList[featuredRandom].media_type
    getGenres(mediaType, mediaGenres)

    //linking youtube trailer
    const mediaId = trendList[featuredRandom].id
    const trailerKey = await getMediaTrailer(mediaType, mediaId)
    trailer.setAttribute('href',`https://www.youtube.com/watch?v=${trailerKey}`)
}
    

function insertTrendList(trendList){
    const trendPostersContainer = document.querySelector('.trending-posters-list')
    trendList.forEach(element => {
        const poster = document.createElement('a')
              poster.setAttribute('href','#')
        const posterImg = document.createElement('img')
              posterImg.setAttribute('src',`${imgEndpoint}/${imgSmall}/${element.poster_path}`)
              posterImg.setAttribute('alt','image poster')
              posterImg.classList.add('movie-poster')
        poster.appendChild(posterImg)
        trendPostersContainer.appendChild(poster)
    });
}


// FUNCTION GETTRENDINGLIST USING FECH, ONLY FOR THE REFERENCE.
// const apiVersion = `3`
// const apiBase = `https://api.themoviedb.org/${apiVersion}`
// const trendingEdpint = 'trending'

// async function fetchData(apiUrl){
//     const res = await fetch(apiUrl)
//     return await res.json()
// } 
// async function getTrendsList(){
//     const postersContainer = document.querySelector('.trending-posters-list')
//     try{
//         const data = await fetchData(`${apiBase}/${trendingEdpint}/all/day?api_key=${apiKey}`)
//         const trendData = data.results
//         trendData.forEach(element => {
//             const poster = document.createElement('a')
//                   poster.setAttribute('href','#')
//             const posterImg = document.createElement('img')
//                   posterImg.classList.add('movie-poster')
//                   posterImg.setAttribute('alt','movie poster')
//                   posterImg.setAttribute('src',`${imgEndpoint}/${imgSize}/${element.poster_path}`)
//             poster.appendChild(posterImg)
//             postersContainer.appendChild(poster)
//         });
//     }catch(err){
//             console.log(err)
//         }
// }
// getTrendsList();


