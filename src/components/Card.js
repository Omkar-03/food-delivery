import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
import { useNavigate } from 'react-router-dom'

export default function Card(props) {
    let dispatch = useDispatchCart()
    let data = useCart()
    let navigate = useNavigate()
    const priceRef = useRef()
    let options = props.options
    let priceOptions = Object.keys(options)

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleClick = () => {
        if (!localStorage.getItem("authToken")) {
            navigate("/login")
        }
    }
    const handleQty = (e) => {
        setQty(e.target.value);
    }
    const handleOptions = (e) => {
        setSize(e.target.value);
    }

    const handleAddToCart = async () => {
        let food = []

        for (const item of data) {
            if (item.id === props.foodItem._id && item.size === size) {
                food = item
            }
        }

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty, size: size })
                return
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img })
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img })
    }

    let finalPrice = qty * parseInt(options[size])

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (

        <div>
            <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "360px", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onClick={handleClick} onChange={handleQty}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onClick={handleClick} onChange={handleOptions}>
                            {
                                priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                        </select>
                        <div className='d-flex fs-5 h-100'>Price: ₹{finalPrice}/-</div>
                    </div>
                    <hr />
                    <button className={"btn btn-success justify-center ms-2"} onClick={handleAddToCart}> Add to Cart</button>
                </div>
            </div>
        </div >
    )
}
