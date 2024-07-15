import React, { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { toyService } from "../services/toy.service.js"
import { ToySort } from "./ToySort.jsx"


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [selectedLabels, setSelectedLabels] = useState([])

    const labels = toyService.getLabels()
    // Debounce the onSetFilter function using useRef
    const onSetFilterDebounced = useRef(utilService.debounce(onSetFilter, 300))

    // Update the filter when filterByToEdit changes
    useEffectUpdate(() => {
        onSetFilterDebounced.current(filterByToEdit)
    }, [filterByToEdit])

    // Handle changes in input fields
    function handleChange({ target }) {
        let { value, name: field, type } = target

        // Adjust value based on input type
        value = type === "number" ? +value : value

        // Update the filter stateF
        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            [field]: value,
        }))
    }
    // Handle multi-select label filtering
    function handleLabelChange(event) {
        const selectedLabels = Array.from(event.target.selectedOptions, option => option.value)
        setSelectedLabels(selectedLabels)
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            labels: selectedLabels
        }))
    }
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form>
                <label htmlFor="toyName">Toy Name:</label>
                <input
                    type="text"
                    id="toyName"
                    name="toyName"
                    placeholder="By name"
                    value={filterByToEdit.toyName}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">Stock Status:</label>
                <select
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value={true}>In Stock</option>
                    <option value={false}>Not In Stock</option>
                </select>

                <label htmlFor="labels">Labels:</label>
                <div className="selected-labels">
                    {selectedLabels.length > 0 && (
                        <div>
                            Selected Labels:
                            {selectedLabels.map((label, index) => (
                                <span key={index} className="selected-label">{label}</span>
                            ))}
                        </div>
                    )}
                </div>
                <select
                    id="labels"
                    name="labels"
                    multiple
                    value={selectedLabels}
                    onChange={handleLabelChange}
                >
                    {labels.map((label, index) => (
                        <option key={index} value={label}>{label}</option>
                    ))}
                </select>

            </form>
        </section>
    )
}
