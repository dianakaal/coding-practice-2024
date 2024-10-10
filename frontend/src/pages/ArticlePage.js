import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList'
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser'
import articles from './article-content';


const ArticlePage = () => {

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false})
    const { canUpvote } = articleInfo
    const articleId = useParams()
    //const articleId = articleIdObject.articleId
    console.log("article id is: ", articleId)

    const { user, isLoading } = useUser

    
    useEffect(() => {
            const loadArticleInfo = async() => {
                const token = user && await user.getIdToken()
                const headers = token ? { authToken: token } : {}
                const response = await axios.get(`/api/articles/${articleId.articleId}`, { headers })
                const receivedArticleInfo = response.data
                console.log("The receivedArticleInfo is: ", receivedArticleInfo)
                setArticleInfo(receivedArticleInfo) 
            }

        if (!isLoading) {
            loadArticleInfo() 
        }       
    }, [isLoading, user])

    const addUpvote = async () => {
        const token = user && await user.getIdToken()
        const headers = token ? { authToken: token } : {}
        const response = await axios.put(`/api/articles/${articleId.articleId}/upvote`, null, { headers })
        const upvotedArticle = response.data
        setArticleInfo(upvotedArticle)
    }    

    const article = articles.find(article => article.name === articleId.articleId);



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
            {user
                ? <button onClick={addUpvote}>
                    { canUpvote ?
                        <span>Please vote for me!</span>
                        :
                        <span>You already upvoted</span>
                    }
                </button>
                : <button>You have to login to be able to vote on an article!</button>
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