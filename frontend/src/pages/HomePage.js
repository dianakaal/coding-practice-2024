const HomePage = () => {
    return (
        <>
        <h1>Welcome!</h1>
        <p>This is a practice project</p>
        <br/>
        <p>This project includes:</p>
        <ul>
            <li>Frontend</li>
            <dd>- A React application</dd>
            <li>Backend</li>
            <dd>- A server built with Node.js and Express</dd>
            <dd>- Firebase Authentication used for securing routes</dd>
            <dd>- Custom `authMiddleware` verifies JWT tokens from the client</dd>
            <li>Persistence of Data</li>
            <dd>- Some data is stored locally within the project</dd>
            <dd>- Other data is persisted in MongoDB</dd>
            <li>Authentication</li>
            <dd>- User session tokens are stored in local storage on the frontend</dd>
            <dd>- Tokens are sent in the `Authorization` header for protected route requests</dd>
            <dd>- The `authMiddleware` on the backend verifies tokens and ensures secure access</dd>
        </ul>
        </>
    );
}

export default HomePage;

/*
Frontend application using React 

Server with Node.js and Express

Persistence of data is with MongoDB

Authentication is done with Firebase */