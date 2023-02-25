const api = axios.create({
    baseURL: `https://api.themoviedb.org/3`,
    Headers:{
        'content-type':'application/json;charset=utf-8'
    },
    params:{
        'api_key':apiKey,
}})

const imgEndpoint = 'https://image.tmdb.org/t/p'
const imgSize = 'w300'


async function getTrendsList(){
    try{
        const {data} = await api(`/trending/all/day`)
        const trendList = data.results
        //DOM MAnipulation
        const trendPostersContainer = document.querySelector('.trending-posters-list')
        trendList.forEach(element => {
            const poster = document.createElement('a')
                  poster.setAttribute('href','#')
            const posterImg = document.createElement('img')
                  posterImg.setAttribute('src',`${imgEndpoint}/${imgSize}/${element.poster_path}`)
                  posterImg.setAttribute('alt','image poster')
                  posterImg.classList.add('movie-poster')
            poster.appendChild(posterImg)
            trendPostersContainer.appendChild(poster)
        });
    }catch(err){
        console.log(err)
    }finally{
        console.log('Promise Done!')
    }
}

getTrendsList()

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


