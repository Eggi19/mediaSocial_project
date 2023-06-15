import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function VerificationPage(){
    const [searchParams, setSearchParams] = useSearchParams()

    const getParams = () => {
        try {
            const token = searchParams.get('token')
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getParams()
    }, [])
    return(
        <>
            <h1>test</h1>
        </>
    )
}