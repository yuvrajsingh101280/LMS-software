import { useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Appcontext } from "../context/AppContext";
import axios from "axios";

const useSignin = () => {


    const { loading, setLoading } = useContext(Appcontext)
    const [error, setError] = useState(null)


    const login = async (credentials) => {



        setLoading(true)
        try {
            const res = await axiosInstance.post("/auth/login", credentials)
            return res.data
        } catch (error) {
            setError(error.response?.data?.message || "Login failed")

        } finally {

            setLoading(false)

        }


    }
    return { login, loading, error }

}
export default useSignin