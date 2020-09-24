import { elements } from '../base'

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.movieList.innerHTML = ''
}

export const displayResults = (data,keyword) => {
    console.log(data)
    elements.movieListContainer.classList.add('d-block')
    if (data.total_results > 1) {
        elements.movieListHeader.innerText = `${data.total_results} movies founded for ${keyword} searcihng`
    }else {
        elements.movieListHeader.innerText = `${data.total_results} movie founded for ${keyword} searcihng`
    }
    data.results.forEach(movie => {
        const html = `
        <li class="media mb-3 ">
            <img class="mr-3" src="https://image.tmdb.org/t/p/w92${movie.poster_path}"  onerror="this.src='https://via.placeholder.com/92x138'" alt="${movie.title}">
            <div class="media-body">
                <h5 class="mt-0 mb-1">
                    <span class="badge badge-pill badge-dark">${movie.vote_average}</span>
                    <a href="#${movie.id}"> ${movie.title}</a>
                </h5>
                <p>${movie.overview}</p>
            </div>
        </li>
        `;
        elements.movieList.insertAdjacentHTML('beforeend', html)
    });
    
}