import { useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Appcontext } from "../context/AppContext";



const useLogout = () => {
    const { loading, setLoading } = useContext(Appcontext)
    const [error, setError] = useState(null)


    const logout = async () => {

        setLoading(true)


        try {

            await axiosInstance.post("/auth/logout")
            setError(null)


        } catch (error) {
            setError(err.response?.data?.message || 'Logout failed');

        } finally {
            setLoading(false)


        }




    }
    return { loading, error, logout }

}
export default useLogout