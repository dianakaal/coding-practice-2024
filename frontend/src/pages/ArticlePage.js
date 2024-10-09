import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: []})
    
    useEffect(() => {
       setArticleInfo({ upvotes: Math.ceil(Math.random() * 10), comments: ["One comment."]}) 
    }, [])

    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId);

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
        <h1>{article.title}</h1>
        <p>This article has {articleInfo.upvotes} upvote(s).</p>
        <br />
        <p>The article has this comment: {articleInfo.comments[0]}</p>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        </>
    );
}

export default ArticlePage;