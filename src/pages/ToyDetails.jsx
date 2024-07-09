import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                Navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    console.log('toy :', toy)
    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>🎁</p>
            {toy.inStock ? <p>available</p> : <p>unavailable</p>}
            <p>created {utilService.timeAgo(toy.createdAt)}</p>
            <p>labels {toy.labels}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p>
        </section>
    )
}
