import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { userVerification } from "../../API/userAPI"

export default function VerificationPage(){
    const [searchParams, setSearchParams] = useSearchParams()

    const verifiedAccount = async () => {
        try {
            let token = searchParams.get('token')
            await userVerification(token)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        verifiedAccount()
    }, [])
    return(
        <>
            <h1>Account has been verified</h1>
        </>
    )
}