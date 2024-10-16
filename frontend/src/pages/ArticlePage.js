import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList'
import AddCommentForm from '../components/AddCommentForm';
import useAuthState from '../hooks/useAuthState'
import articles from './article-content';


const ArticlePage = () => {

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false})
    const { canUpvote } = articleInfo
    console.log("ArticleInfo from backend:",articleInfo)
    const articleId = useParams()
    const valueOfArticleId = articleId.articleId

    const { user, isAuthLoading } = useAuthState()

    useEffect(() => {
        const loadArticleInfo = async() => {
            const token = localStorage.getItem('authToken') // Retrieve the token from localStorage
            //console.log("Auth Token:", token)
            const headers = token ? { Authorization: `Bearer ${token}` } : {} // Set the Authorization header
            
            try {
                console.log("A!")
                const response = await axios.get(`/api/articles/${valueOfArticleId}`, { headers })
                // Check if response is valid
                if (!response.data) {
                    throw new Error('No data received from the server.');
                }
                console.log("Response after GET on this article: ", response)
                
                const receivedArticleInfo = response.data

                // Ensure canUpvote is set based on backend response
                receivedArticleInfo.canUpvote = receivedArticleInfo.canUpvote !== undefined ? receivedArticleInfo.canUpvote : false;

                console.log("The receivedArticleInfo is: ", receivedArticleInfo)
                setArticleInfo(receivedArticleInfo) 
            } catch (error) {
                console.log("There was an error fetching the article info!")
                console.error("Error fetching article info:", error)
            }
        }

        if (!isAuthLoading) {
            loadArticleInfo() 
        }  

    }, [isAuthLoading, user, valueOfArticleId])

    const addUpvote = async () => {
        if (!canUpvote) return; // Prevent action if user cannot upvote

        const token = localStorage.getItem('authToken')
        //console.log("Auth Token:", token)
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        try {
            const response = await axios.put(`/api/articles/${valueOfArticleId}/upvote`, null, { headers });
            const upvotedArticle = response.data;
            setArticleInfo(upvotedArticle);
        } catch (error) {
            console.error("Error upvoting article:", error);
            // TODO: display an error message to the user
        }
    }    

    const article = articles.find(article => article.name === valueOfArticleId);

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
        <h1>{article.title}</h1>
        <p>This is the content of the article, not yet sourced from a database.</p>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        <div className="upvotes-section">
            {console.log("The user is: ",user)}
            {console.log("can user upvote? ",canUpvote)}
            {
            user
                ? 
                <button onClick={addUpvote}>
                    {canUpvote ? <span>Please vote for me!</span> : <span>You already upvoted</span>}
                </button>
                : 
                <button>You need to login to be able to vote on an article!</button>
            }
            <br />
            <p>This article has {articleInfo.upvotes} upvote(s) already.</p>
        </div>

        <br />
        {user
            ? <AddCommentForm
            articleName={articleId.articleId}
            onArticleUpdated={updatedArticle => {setArticleInfo(updatedArticle)}}/>
            : <button>Please log in to add a comment</button>
        }
        <CommentsList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;