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


async function getTrendsList(mediaType){
    try{
        const media = (mediaType)?mediaType:'all'
        const {data} = await api(`/trending/${media}/day`)
        const trendList = data.results
        console.log(trendList)
        //DOM MAnipulation
        insertFeatured(trendList)
        const trendingListContainer = document.querySelector('.trending-posters-list')
        fillPostersList(trendList,trendingListContainer)
    }catch(err){
        console.log(err)
    }finally{
        console.log('Promise Done!')
    }
}

async function getGenres(mediaType, mediaGenres, container){
    const {data} = await api(`genre/${mediaType}/list`)
    const genresList = data.genres
    const filteredCategories = mediaGenres.map(id => genresList.find(category => category.id === id))
    
    container.innerHTML = '' //avoid acumulating tags
    filteredCategories.forEach(category => {
        const categoryElement = document.createElement('li')
              categoryElement.classList.add('category-tag')
        const categoryLink = document.createElement('a')
              categoryLink.innerHTML = category.name
        
        categoryElement.appendChild(categoryLink)
        container.appendChild(categoryElement)
    })
}

async function getMediaTrailer(mediaType, mediaID){
    const {data} = await api(`/${mediaType}/${mediaID}/videos`)
    const mediaVideos = data.results
    const trailer = mediaVideos.find(video => video.type === 'Trailer')
    const trailerKey = trailer.key
    return trailerKey
}

async function getUpcomingMovies(){
    const currentDate = new Date(); // Get the current date
    const currentYear = currentDate.getFullYear(); // Get the year component of the current date and store it in a variable
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');// Get the month component of the current date and convert it to a string with two digits (e.g. '01' for January)
    const currentDay = String(currentDate.getDate()).padStart(2, '0');// Get the day component of the current date and convert it to a string with two digits (e.g. '01' for the first day of the month)
    const dateString = `${currentYear}-${currentMonth}-${currentDay}`;// Construct the date string in the format 'YYYY-MM-DD' using template literals

    const {data} = await api(`/discover/movie`,{
        params:{
            'page':'1',
            'primary_release_date.gte':dateString
        }
    })
    const upcomingMovies = data.results
    const upcomingMoviesContainer = document.querySelector('#upcomingSection')
    fillPostersList(upcomingMovies,upcomingMoviesContainer)
}

async function insertFeatured(trendList){
    const featuredRandom = Math.round(Math.random() * (Object.keys(trendList).length - 1)) //getting only one media randomly for the featured content section
    const featuredSection = document.querySelector('.featured-movie')
          featuredSection.innerHTML = ''
          
    const featuredBgContainer = document.createElement('div')
          featuredBgContainer.classList.add('featured-movie-img-container')
    const imageElement = document.createElement('img')
          imageElement.setAttribute('src',`${imgEndpoint}/${imgLarge}/${trendList[featuredRandom].backdrop_path}`)
          imageElement.classList.add('featured-movie-img')
    const trailer = document.createElement('a')
          trailer.classList.add('featured-movie-trailer-link')
    const trailerBtn = document.createElement('span')
          trailerBtn.classList.add('play-btn')
    const gradient = document.createElement('span')
          gradient.classList.add('img-gradient-bottom')

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
          title.addEventListener('click',()=>{location.hash=`#${trendList[featuredRandom].media_type}=${trendList[featuredRandom].id}`})

    const description = document.createElement('p')
          description.classList.add('featured-movie-description')
          description.innerHTML = trendList[featuredRandom].overview

    const genresContainer = document.createElement('ul')
          genresContainer.classList.add('featured-categories-list')

    trailer.appendChild(trailerBtn)
    featuredBgContainer.appendChild(imageElement)
    featuredBgContainer.appendChild(trailer)
    featuredBgContainer.appendChild(gradient)
    featuredSection.appendChild(featuredBgContainer)
    featuredSection.appendChild(title)
    featuredSection.appendChild(description)
    featuredSection.appendChild(genresContainer)

    //getting featured movie genres ids and the mdeia_type (depending on the media_type the API endpoint is different)
    const mediaGenres = trendList[featuredRandom].genre_ids
    const mediaType = trendList[featuredRandom].media_type
    const categoriesListContainer = document.querySelector('.featured-categories-list')
    getGenres(mediaType, mediaGenres, categoriesListContainer)

    //linking youtube trailer
    const mediaId = trendList[featuredRandom].id
    const trailerKey = await getMediaTrailer(mediaType, mediaId)
    trailer.setAttribute('href',`https://www.youtube.com/watch?v=${trailerKey}`)
}
    
function fillPostersList(list,container){
    container.innerHTML = ''
    list.forEach(element => {
        const poster = document.createElement('a')
                if(element.media_type){
                    poster.addEventListener('click',()=>{location.hash=`#${element.media_type}=${element.id}`})
                }else{
                    poster.addEventListener('click',()=>{location.hash=`#movie=${element.id}`})
                }
        const posterImg = document.createElement('img')
              if(element.poster_path){
                  posterImg.setAttribute('src',`${imgEndpoint}/${imgSmall}/${element.poster_path}`)
                  posterImg.setAttribute('alt','image poster')
                  posterImg.classList.add('movie-poster')
                  poster.appendChild(posterImg)
              }else{
                console.warn(`Movie poster nor found for id: ${element.id} poster not displayed`)
              }
        container.appendChild(poster)
    })
}

async function getMediaDetails(mediaType,mediaId){
    try{
        const {data} = await api(`/${mediaType}/${mediaId}`)
        const mediaTitle = (data.title) //movies contains their title on the attribute 'title', tv-shows on 'name'
                            ? data.title  //movies doesn't contain 'name'
                            : data.name 
        const mediaDescription =  data.overview

        //obtaining html elements
        const titleElement = document.querySelector('.media-details-title')
        const descriptionElement = document.querySelector('.media-details-description')
        const posterElement = document.querySelector('#media-details-poster')
        const bgElement = document.querySelector('.media-details-bg')
        const dataElement = document.querySelector('#data')
        const webElement = document.querySelector('#web')

        //inserting data
        titleElement.innerHTML = mediaTitle
        descriptionElement.innerHTML = data.overview
        posterElement.setAttribute('src',`${imgEndpoint}/${imgSmall}${data.poster_path}`)
        bgElement.style.setProperty('background-image',`url(${imgEndpoint}/${imgMedium}${data.backdrop_path})`)
        const length = (mediaType == 'movie')?data.runtime+' Mins':data.seasons.length+' Seasons'
        const release = (mediaType == 'movie')?data.release_date:data.first_air_date
        const releaseYear = new Date(release).getFullYear()
        dataElement.innerHTML = `${length} | ${releaseYear} | <span class="rating">${data.vote_average.toFixed(1)}/10</span>`

        webElement.setAttribute('href',data.homepage)
        const [_,webName] = data.homepage.split('//')
        webElement.innerHTML = `<span>Web: </span>${webName}`

        const tagsContainer = document.querySelector('.media-details-tags-list')
        const mediaGenresList = data.genres.map(genre => genre.id)
        getGenres(mediaType,mediaGenresList,tagsContainer)


    }catch(err){
        throw new Error('Error obteniendo data para media Details: '+ err)
    }
        
}

async function getCast(mediaType,mediaId,castContainer){
    try{
        const {data} = await api(`/${mediaType}/${mediaId}/credits`)
        const cast = data.cast
        // const castContainer = document.querySelector('.cast-list')
        cast.forEach(character => {
            if (character.profile_path != null){
                const realName = document.createElement('span')
                      realName.classList.add('cast-real-name')
                      realName.innerHTML = character.original_name
                const name = document.createElement('h6')
                      name.classList.add('cast-acting-name')
                      name.innerHTML = character.character
                const picture = document.createElement('img')
                      picture.setAttribute('alt','cast picture')
                      picture.setAttribute('src',`${imgEndpoint}/${imgSmall}${character.profile_path}`)
                      picture.classList.add('cast-picture')
                const characterCard = document.createElement('a')
                      characterCard.classList.add('cast-card')
                      characterCard.appendChild(picture)
                      characterCard.appendChild(realName)      
                      characterCard.appendChild(name)
                const cardContainer = document.createElement('li')
                      cardContainer.classList.add('card-container')
                      cardContainer.appendChild(characterCard)
    
                castContainer.appendChild(characterCard)
            }
            else{
                console.warn(`cast member with id: ${character.id} doesn't have profile picture, Cast member NOT displayed`)
            }
        })
    }catch(err){
        console.log(`Error en api 'cast': ${err}`)
    }


}

async function getMediaPics(mediaType,mediaId,container){
    try{
        const {data} =  await apiImages(`/${mediaType}/${mediaId}/images`)
        const backdropPics = data.backdrops
        const posters = data.posters

            backdropPics.forEach(image =>{
                const imgLi = document.createElement('li')
                      imgLi.classList.add('media-img')
                const img = document.createElement('img')
                      img.setAttribute('atl','movie image')
                      img.setAttribute('src',`${imgEndpoint}/${imgLarge}${image.file_path}`)
                imgLi.appendChild(img)

                container.appendChild(imgLi)
            })
        // }else{
            posters.forEach(image =>{
                const imgLi = document.createElement('li')
                      imgLi.classList.add('media-img')
                const img = document.createElement('img')
                      img.setAttribute('atl','movie image')
                      img.setAttribute('src',`${imgEndpoint}/${imgLarge}${image.file_path}`)
                imgLi.appendChild(img)
                container.appendChild(imgLi)
            })

    }catch(err){
        console.log(err)
    }
}

async function getSimilar(mediaType,mediaId,container){
    const {data} = await api(`/${mediaType}/${mediaId}/similar`)
    const similarList = data.results
    if (similarList.length >0){
        fillPostersList(similarList,container)
    }else{
        const similarContainer = document.querySelector('#similar-section')
        similarContainer.innerHTML = ''
    }
}

getTrendsList()
getUpcomingMovies()

// FUNCTION GETTRENDINGLIST USING FECH, ONLY FOR REFERENCE.
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


