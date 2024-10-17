import { useState } from 'react'
import axios from 'axios'
import useAuthState from '../hooks/useAuthState'

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('')
    const [commentText, setCommentText] = useState('')
    const { user } = useAuthState()

    const addComment = async () => {
        const token = localStorage.getItem('authToken') // Retrieve the token from localStorage
        const headers = token ? { Authorization: `Bearer ${token}` } : {} // Set the Authorization header
        
        try {
            const response = await axios.post(`/api/articles/${articleName}/comments`, {
                postedBy: user.email || name, // TODO: make a user's name be available as well
                text: commentText,
            }, {
                headers,
            })

            const updatedArticle = response.data
            onArticleUpdated(updatedArticle)
            setName('')
            setCommentText('')
        } catch (error) {
            console.error("Error adding comment:", error)
            // TODO: display an error message to the user
        }
    }

    return (
        <div id="add-comment-form">
            <h3>Please add a comment below, if you wish.</h3>
            {user && <p>You will be posting as {user.email}</p>}
            <label>
                Text:
                <textarea 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4" 
                    cols="50" 
                />
            </label>
            <button onClick={addComment}>Add my comment now!</button>
        </div>
    )
}

export default AddCommentForm