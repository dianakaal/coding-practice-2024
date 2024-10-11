import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const logIn = async () => { 
        try {
            // Authenticate with Firebase
            const userCredential = await signInWithEmailAndPassword(getAuth(), email, password)
            console.log("Result of logging in: ", userCredential)
            
            // Get the ID token for the authenticated user
            const idToken = await userCredential.user.getIdToken()
            console.log("ID Token of signed in user: ", idToken)

            // Send a request with the id token (for protected routes or any backend interaction)
            const response = await fetch('/articles', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            })
            
            if (response.ok) {
                navigate('/articles') // Navigate to the articles page
            } else {
                const errorMessage = await response.text(); // Get error message from server if any
                console.log('Error from backend: ', errorMessage);
                setError('Failed to fetch protected resource: ' + errorMessage);
            }
    
        } catch (e) {
            setError(e.message)
        }
    }
    



    return (
        <>
        <h1>Welcome earthling</h1>
        {error && <p className="error">{error}</p>}
        <input
           placeholder="your email address"
           value={email}
           onChange={e => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        <button onClick={logIn}>Log in</button>
        <Link to="/create-account" style={{ display: 'block', marginTop: '20px' }}>If you don't have an account, go ahead and create on here.</Link>
        </>
    )
}

export default LoginPage