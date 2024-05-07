import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function MyOrder() {
    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        await fetch("https://food-delivery-app-jk8k.onrender.com/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })

    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                    {orderData !== null ? Array(orderData).map((data, index) => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item, index) => {
                                    return (
                                        item.map((arrayData, index) => {
                                            return (
                                                <div key={index}>
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>Qty: {arrayData.qty}</span>
                                                                        <span className='m-1'>Size: {arrayData.size}</span>
                                                                        <div className=' d-flex ms-2 h-100 w-20 fs-5' >
                                                                            Price: ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }) : <div className='p-4 m-4 fs-4 text-center rounded' style={{ height: "37rem", backgroundColor: 'wheat' }}>Nothing to Show Here !!!</div>
                        )
                    }) : ""}
                </div>
            </div>
            <Footer />
        </div>
    )
}
