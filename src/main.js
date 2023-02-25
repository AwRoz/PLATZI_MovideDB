const apiVersion = `3`
const apiBase = `https://api.themoviedb.org/${apiVersion}`
const trendingEdpint = 'trending'
const imgEndpoint = 'https://image.tmdb.org/t/p'
const imgSize = 'w300'

async function fetchData(apiUrl){
    const res = await fetch(apiUrl)
    return await res.json()
} 
//Function using fetch
async function getTrendsList(){
    const postersContainer = document.querySelector('.trending-posters-list')
    try{
        const data = await fetchData(`${apiBase}/${trendingEdpint}/all/day?api_key=${apiKey}`)
        const trendData = data.results
        trendData.forEach(element => {
            const poster = document.createElement('a')
                  poster.setAttribute('href','#')
            const posterImg = document.createElement('img')
                  posterImg.classList.add('movie-poster')
                  posterImg.setAttribute('alt','movie poster')
                  posterImg.setAttribute('src',`${imgEndpoint}/${imgSize}/${element.poster_path}`)
            poster.appendChild(posterImg)
            postersContainer.appendChild(poster)
        });
    }catch(err){
            console.log(err)
        }
}

//function using axios
async function getRecentList(){
    const data = await fetchData(`${apiBase}/`)
}

getTrendsList();


