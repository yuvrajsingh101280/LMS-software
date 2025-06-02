import { useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Appcontext } from "../context/AppContext";


const useUpdateRoleToEducator = () => {


    const { loading, setLoading } = useContext(Appcontext)
    const [error, setError] = useState(null)

    const updateRole = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/educator/update-role');

            setError(null);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'Failed to update role');
        } finally {
            setLoading(false);
        }
    };

    return {
        updateRole,
        loading,
        error,
    };


}
export default useUpdateRoleToEducator







