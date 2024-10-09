import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import articles from './article-content';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList'

const ArticlePage = () => {

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: []})
    const articleId = useParams()
    console.log("article id is: ", articleId)

    
    useEffect(() => {
            const loadArticleInfo = async() => {
                const response = await axios.get(`/api/articles/${articleId.articleId}`)
                const receivedArticleInfo = response.data
                console.log("The receivedArticleInfo is: ", receivedArticleInfo)
                setArticleInfo(receivedArticleInfo) 
            }

        loadArticleInfo()        
    }, [])

    const article = articles.find(article => article.name === articleId.articleId);

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
        <h1>{article.title}</h1>
        <p>This is the content of the article, not yet sourced from a database.
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        </p>
        <p>This article has {articleInfo.upvotes} upvote(s).</p>
        <br />
        <CommentsList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;