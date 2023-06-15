import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function VerificationPage(){
    const [searchParams, setSearchParams] = useSearchParams()

    const getParams = () => {
        try {
            let token = searchParams.get('token')
            token = "Bearer " + token
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