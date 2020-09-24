// model-view-controller

import Search from './models/Search';
import {elements,renderLoader,deleteLoader} from './base'
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import { Movie } from './models/Movie';
const state = {};

// search Controller
const searchController = async () => {
    const keyword = elements.searchInput.value

    if (keyword) {
        state.search = new Search(keyword)
        searchView.clearInput();
        searchView.clearResults();
        movieView.closeDetails();

        renderLoader(elements.movieListContainer)

        await state.search.getResults();
        searchView.displayResults(state.search.data,keyword)
        deleteLoader(elements.movieListContainer);
    }else{
    alert('You must enter keyword')
    }

}

elements.searchForm.addEventListener('submit',function(e){
    searchController();
    e.preventDefault();
     
})

// movie controller

const movieController = async () => {
    const id = window.location.hash.replace('#','');
    if(id) {
        state.movie = new Movie(id);
        
        renderLoader(elements.movieDetailsContainer)
        await state.movie.getMovie();
        movieView.displayMovie(state.movie.data);
        movieView.backToTop();
        deleteLoader(elements.movieDetailsContainer);
    }
}
window.addEventListener('hashchange',movieController)
elements.movieDetailsClose.addEventListener('click',movieView.closeDetails)