import { useContext, useState } from "react";

import axiosInstance from "../api/axiosInstance";
import { Appcontext } from "../context/AppContext";


const useSignup = () => {
    const { loading, setLoading } = useContext(Appcontext)
    const [error, setError] = useState(null)

    const signup = async (formData) => {

        setLoading(true)
        try {
            const res = await axiosInstance.post("/auth/signup", formData, {

                headers: {

                    "Content-Type": "multipart/form-data"

                }


            })
            return res.data
        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message || "signup failed")

        } finally {
            setLoading(false)


        }




    }



    return { signup, loading, error }



}
export default useSignup



