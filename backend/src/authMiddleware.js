import admin from 'firebase-admin' // Import Firebase Admin SDK

// Authentication middleware
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authToken; // Extract token from request headers

    const authToken = req.headers['authorization']?.split(' ')[1]; // Grab the token from the Authorization header

    if (authToken) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(authToken);
            req.user = { uid: decodedToken.uid }; // Attach the user ID to the request
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error("Error verifying token:", error)
            return res.status(401).json({ message: 'No token provided' }) // Unauthorized if token is invalid
        }
    } else {
        return res.sendStatus(401) // Unauthorized if no token is present
    }
}

export default authMiddleware // Export the middleware
