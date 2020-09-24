import {api_key, base_url} from '../config'

export default class Search {
    constructor(keyword){
        this.keyword = keyword;
    }
    async getResults() {
        const response = await fetch(`${base_url}/api/search/movie?keyword=${this.keyword}`)//,  {mode: 'no-cors'})
        this.data = await response.json()
    }
}