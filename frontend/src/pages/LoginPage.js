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
            const authenticated = await signInWithEmailAndPassword(getAuth(), email, password)
            console.log("Result of logging in: ", authenticated)
            navigate('/articles')
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