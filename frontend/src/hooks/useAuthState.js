import { useState, useEffect} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const useAuthState = () => {
    const [user, setUser] = useState(null)
    const [isAuthLoading, setIsAuthLoading ] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user)
            setIsAuthLoading(false)
        })

        //will be called when user is moved away from the DOM
        return unsubscribe
    }, [])

    return { user, isAuthLoading }

}

export default useAuthState