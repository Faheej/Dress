"use client"
import React, { useEffect } from 'react'
import "./AcceptForm.css"
import axiosInstance from '@/config/axiosConfig'
import showToast from '@/utils/toast'

export const AcceptForm = ({ id, setAcceptForm }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handleReset = () => {
        setAcceptForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/order_item/employee/accept/${id}`)
            if (response.data.status) {
                // alert(response.data.message)
                showToast(true,response.data.message)
                setAcceptForm(false)
            }
        } catch (err) {
            // alert(err.response?.data?.message || "Internal Server Error")
            showToast(false,err.response?.data?.message || "Internal Server Error")
            setAcceptForm(false)
        }
    }
    return (
        <div className="orderItem-accept-container">
            <div className="orderItem-accept-content">
                <h1>Accept Order</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className="orderItem-accept-text">
                        <p>Do you want to accept the order?</p>
                    </div>
                    <div className="orderItem-accept-button-div">
                        <button type="submit">Confirm</button>
                        <button type="reset">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
