import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'number') value = +value
        if (type === 'checkbox') value = target.checked
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function handleLabelsChange({ target }) {
        const labels = target.value.split(',').map(label => label.trim())
        setToyToEdit((prevToy) => ({ ...prevToy, labels }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 1000
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy} >
                <label htmlFor="toyName">Name: </label>
                <input type="text"
                    name="toyName"
                    id="toyName"
                    placeholder="Enter toy name..."
                    value={toyToEdit.toyName}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price: </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />

                <label htmlFor="labels">Labels: </label>
                <input type="text"
                    name="labels"
                    id="labels"
                    placeholder="Enter labels, separated by commas"
                    value={toyToEdit.labels.join(', ')}
                    onChange={handleLabelsChange}
                />

                <label htmlFor="createdAt">Created At: </label>
                <input type="number"
                    name="createdAt"
                    id="createdAt"
                    placeholder="Enter creation timestamp"
                    value={toyToEdit.createdAt}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock: </label>
                <input type="checkbox"
                    name="inStock"
                    id="inStock"
                    checked={toyToEdit.inStock}
                    onChange={handleChange}
                />

                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}
