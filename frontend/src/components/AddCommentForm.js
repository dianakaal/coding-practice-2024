import { useState } from 'react'
import axios from 'axios'
import useUser from '../hooks/useUser'

const AddCommentForm = ({articleName, onArticleUpdated}) => {
    const [name, setName] = useState('')
    const [commentText, setCommentText] = useState('')
    const { user } = useUser()

    const addComment = async () => {
        const token = user && await user.getIdToken()
        const headers = token ? { authToken: token } : {}
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        }, {
            headers,
        })
        const updatedArticle = response.data
        console.log("Updated article:",updatedArticle)
        onArticleUpdated(updatedArticle)
        setName('')
        setCommentText('')
    }

    return (
        <div id="add-comment-form">
            <h3>Please add a comment below, if you wish.</h3>
            { user && <p>You will be posting as { user.email }</p> }
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