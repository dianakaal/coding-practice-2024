import admin from 'firebase-admin' // Import Firebase Admin SDK

// Authentication middleware
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authToken; // Extract token from request headers
    console.log("From authMiddleware the token was:", token)

    const authToken = req.headers['authorization']?.split(' ')[1]; // Grab the token from the Authorization header
    console.log("From authMiddleware the authToken was:", authToken)

    console.log("Request.headers was: ", req.headers)

    if (authToken) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(authToken);
            req.user = { uid: decodedToken.uid }; // Attach the user ID to the request
            console.log("From authMiddleware the req.user was: ", req.user)
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.log("From authMiddleware there was an error verifying the auth token.")
            console.error("Error verifying token:", error)
            return res.status(401).json({ message: 'No token provided' }) // Unauthorized if token is invalid
        }
    } else {
        console.log("No token provided")
        return res.sendStatus(401) // Unauthorized if no token is present
    }
}

export default authMiddleware // Export the middleware
