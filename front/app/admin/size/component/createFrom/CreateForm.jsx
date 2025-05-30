"use client"
import React, { useEffect, useState } from 'react'
import "./CreateForm.css"
import validate from '../../validation'
import axiosInstance from '@/config/axiosConfig'
import showToast from '@/utils/toast'

export const CreateForm = ({ setCreateForm }) => {
    const [input, setInput] = useState({
        name: "",
        shoulder: "",
        chest: "",
        bust: "",
        under_bust: "",
        waist: "",
        hip: "",
        thigh: "",
        total_rise: "",
        calf: "",
        upper_arm: "",
        inseam: "",
        outseam: "",
        height: ""
    })

    const [error, setError] = useState({
        name: null,
        measure: null
    })

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleReset = () => {
        setCreateForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if (Object.values(errors).every(val => val === null)) {
            try {
                const finalName = input.name.trim()
                const data = {
                    name: finalName.toUpperCase(),
                    shoulder: input.shoulder,
                    chest: input.chest,
                    bust: input.bust,
                    under_bust: input.under_bust,
                    waist: input.waist,
                    hip: input.hip,
                    thigh: input.thigh,
                    total_rise: input.total_rise,
                    calf: input.calf,
                    upper_arm: input.upper_arm,
                    inseam: input.inseam,
                    outseam: input.outseam,
                    height: input.height
                }

                const response = await axiosInstance.post("/size/create", data)
                if (response.data.status) {
                    // alert(response.data.message)
                    showToast(true,response.data.message)
                    setCreateForm(false)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false,err.response?.data?.message || "Internal Server Error")
            }
        }
    }
    return (
        <div className="size-create">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Size Create Page</h1>
                <div className="size-create-input-div">
                    <div className="size-create-input">
                        <label htmlFor="name">Size Name</label>
                        <input type="text" name="name" value={input.name} placeholder="Enter The Dress Type Name" onChange={handleChange} />
                        {error.name && <p>{error.name}</p>}
                    </div>
                    <div className="size-create-input-grid">
                        <div>
                            <label htmlFor="shoulder">Shoulder</label>
                            <input type="number" name="shoulder" value={input.shoulder} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="chest">Chest</label>
                            <input type="number" name="chest" value={input.chest} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="bust">Bust</label>
                            <input type="number" name="bust" value={input.bust} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="under_bust">Under Bust</label>
                            <input type="number" name="under_bust" value={input.under_bust} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="waist">Waist</label>
                            <input type="number" name="waist" value={input.waist} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="hip">Hip</label>
                            <input type="number" name="hip" value={input.hip} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="thigh">Thigh</label>
                            <input type="number" name="thigh" value={input.thigh} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="total_rise">Total Rise</label>
                            <input type="number" name="total_rise" value={input.total_rise} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="calf">Calf</label>
                            <input type="number" name="calf" value={input.calf} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="upper_arm">Upper Arm</label>
                            <input type="number" name="upper_arm" value={input.upper_arm} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="inseam">Inseam</label>
                            <input type="number" name="inseam" value={input.inseam} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="outseam">Outseam</label>
                            <input type="number" name="outseam" value={input.outseam} onChange={handleChange} />
                        </div>
                        <div className="full-width">
                            <label htmlFor="height">Height</label>
                            <input type="number" name="height" value={input.height} onChange={handleChange} />
                        </div>
                        {error.measure && <p>{error.measure}</p>}
                    </div>
                </div>
                <div className="size-create-button-div">
                    <input type="submit" value="Create" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}
