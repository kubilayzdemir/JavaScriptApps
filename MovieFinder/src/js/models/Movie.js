import {api_key, base_url} from '../config'
export class Movie {
    constructor(id) {
        this.id = id;
    }
    async getMovie() {
        const response = await fetch(`${base_url}/api/movie/?id=${this.id}`)
        this.data = await response.json();
    }
}
