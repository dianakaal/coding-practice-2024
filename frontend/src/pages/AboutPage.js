const AboutPage = () => {
    return (
        <>
        <h1>A bit about what this project contains:</h1>
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
            <li>Deployment</li>
            <dd>- Configured with `app.yaml` for deployment to MongoDB Cloud</dd>
            <dd>- Sensitive credentials are managed outside of version control using environment-specific YAML files (e.g., `prod-env.yaml`)</dd>
        </ul>
        </>    
    );
}

export default AboutPage;