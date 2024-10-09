import { useState } from 'react'
import { Link} from 'react-router-dom'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

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
            placeholder="well thought out password"
            value={email}
            onChange={e => setPassword(e.target.value)}
        />
        <button>Log in</button>
        <Link to="/create-account">If you don't have an account, go ahead and create on here.</Link>
        </>
    )
}

export default LoginPage