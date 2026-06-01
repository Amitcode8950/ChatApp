import { useEffect } from "react"
import { Server_URl } from "../main"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"

const getCurrentUser = () => {
    let dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let res = await axios.get(`${Server_URl}/api/user/current`, { withCredentials: true })
                dispatch(setUserData(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [])
}

export default getCurrentUser