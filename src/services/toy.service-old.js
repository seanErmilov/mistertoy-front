import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


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

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.name) filterBy.name = ''
            if (!filterBy) filterBy.inStock = ''
            if (!filterBy.labels) filterBy.labels = []
            const regExp = new RegExp(filterBy.name, 'i')

            toys = toys.filter(toy =>
                regExp.test(toy.name) &&
                (!filterBy.inStock || toy.inStock.toString() === filterBy.inStock) &&
                filterBy.labels.every(label => toy.labels.includes(label))
            )

            if (filterBy.sort) {
                if (filterBy.sort === 'name') {
                    toys = toys.sort((a, b) => a.name.localeCompare(b.name));
                } else if (filterBy.sort === 'price') {
                    toys = toys.sort((a, b) => a.price - b.price);
                } else {
                    toys = toys.sort((a, b) => a.createdAt - b.createdAt);
                }
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: 'Toy' + utilService.getRandomString(),
        price: utilService.getRandomIntInclusive(10, 100),
        createdAt: Date.now(),
        labels: getLabels().filter(() => Math.random() < 0.7),
        inStock: Math.random() < 0.7,
    }
}

function getDefaultFilter() {
    return { name: '', inStock: '', labels: [], sort: '' }
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
