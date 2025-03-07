import { toyService } from "../../services/toy.service.js"

//* Toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

export const SET_SORT_BY = 'SET_SORT_BY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

export const ADD_LABEL = 'ADD_LABEL'


const initialState = {
    toys: [],
    // isCartShown: false,
    shoppingCart: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    sortBy: '',
    lastToys: [],
    labels: toyService.getLabels()
}


export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Toys
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                lastToys
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, action.toy]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }

        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.lastToys]
            }
        case ADD_LABEL:
            return {
                ...state,
                labels: [...state.labels, action.label]
            }


        //* Shopping cart
        // case TOGGLE_CART_IS_SHOWN:
        //     return { ...state, isCartShown: !state.isCartShown }

        // case ADD_TOY_TO_CART:
        //     return {
        //         ...state,
        //         shoppingCart: [...state.shoppingCart, action.toy]
        //     }

        // case REMOVE_TOY_FROM_CART:
        //     const shoppingCart = state.shoppingCart.filter(toy => toy._id !== action.toyId)
        //     return { ...state, shoppingCart }

        // case CLEAR_CART:
        //     return { ...state, shoppingCart: [] }

        //*filter
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: { ...state.sortBy, ...action.sortBy }
            }
        //loader
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        default:
            return state
    }
}
