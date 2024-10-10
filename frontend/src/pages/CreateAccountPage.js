import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const CreateAccountPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [confirmPassword, setConfirmPassword ] = useState('')

    const navigate = useNavigate()

    const createAccount = async () => {
        try {
            if (password !== confirmPassword ) {
                setError('Your passwords do not match')
                return
            }
        
            await createUserWithEmailAndPassword(getAuth(), email, password)
            navigate('/articles')
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <>
        <h1>Here you can create an account</h1>
        {error && <p className="error">{error}</p>}
        <input
           placeholder="your email address"
           value={email}
           onChange={e => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="well thought out password"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
        />
        <button onClick={createAccount}>Create your account</button>
        <Link to="/login" style={{ display: 'block', marginTop: '20px' }}>If you have an account, please click here.</Link>
        </>
    )
}

export default CreateAccountPage