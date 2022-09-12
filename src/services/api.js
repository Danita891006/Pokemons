import axios from 'axios'

export default {
    getPokemons(limit, page) {
        return axios.get('https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+page)
    },
    getDetalle(url) {
        return axios.get(url)
    }
}