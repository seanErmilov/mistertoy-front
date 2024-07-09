import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ToySort({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedSetFilterRef = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        // Notify parent
        debouncedSetFilterRef.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="sort-container">
            <select value={filterByToEdit.sort} name="sort" onChange={handleChange} id="sort">
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="createdAt">Time</option>
                <option value="price">Price</option>
            </select>
        </div>
    )
}
