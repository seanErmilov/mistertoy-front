import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels,

}
const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

function query(filterBy = {}) {
    console.log('filterBy :', filterBy)
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        toyName: 'Toy' + utilService.getRandomString(),
        price: utilService.getRandomIntInclusive(10, 100),
        createdAt: Date.now(),
        labels: getLabels().filter(() => Math.random() < 0.7),
        inStock: Math.random() < 0.7,
    }
}

function getDefaultFilter() {
    return { toyName: '', inStock: '', labels: [] }
}

function getLabels() {
    return [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
        'Battery Powered'
    ]
}




// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Toy Example', price: 50}).then(x => console.log(x))
