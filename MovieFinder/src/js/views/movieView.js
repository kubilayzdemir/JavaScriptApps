import { elements } from '../base'

export const backToTop = () => {
    window.scrollTo({top:0, behavior : 'smooth'});
}

export const closeDetails = () => {
    elements.movieDetailsContainer.classList.remove('d-block')
}

export const displayMovie = movie => {

    var html = '<div class="row">';
    var genres = "";
    movie.genres.forEach(genre => {
        genres += `<span class ="badge badge-dark ml-1">${genre.name}</span>`
    });
    html += `
    <div class="col-md-4" >
        <img class="mr-3 img-fluid"  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"onerror="this.src='https://via.placeholder.com/500x750'" alt="${movie.title}">
    </div>
        <div class="col-md-8">
            <div>
                <h5 class="ml-2" >${movie.original_title}</h5>
                 <p class="ml-1" > ${genres} <span class="badge badge-dark"> <i class="fas fa-star"></i> ${movie.vote_average}</span></p>
                <hr>
                <p class="ml-1" >${movie.overview}</p>  
            </div>
        </div>   
    `;

    html += '</div>'
    elements.movieDetailsContainer.classList.add('d-block')
    elements.movieDetails.innerHTML = html
}