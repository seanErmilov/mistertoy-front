import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ToySort({ sortBy, onSetSort }) {
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })
    const debouncedSetSortRef = useRef(utilService.debounce(onSetSort, 500))

    useEffect(() => {
        // Notify parent
        debouncedSetSortRef.current(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log('value :', value)
        console.log('field:', field)

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setSortByToEdit(prevSortBy => ({
            ...prevSortBy,
            [field]: value
        }))
    }

    return (
        <div className="sort-container">
            <select value={sortByToEdit.sort} name="sort" onChange={handleChange} id="sort">
                <option value="all">Sort By</option>
                <option value="toyName">Name</option>
                <option value="createdAt">Time</option>
                <option value="price">Price</option>
            </select>
        </div>
    )
}
