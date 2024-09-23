import './SingleArticle.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleArticle = () => { // use {articles} in the parameter to receive it if passed from the ArticleList component
  const { id } = useParams();
  const articles = useSelector((state) => state.articleState.entries);  // use the useSelector hook to pull the article data directly from the reducer
  const article = articles[articles.findIndex((article) => article.id === id)]; // find the article with the id from the param
  // alternate code functionality with destructuring -
  // const { title, imageUrl, body } = articles.find(article => article.id === id);
  console.log(article);

  return (
    <div className='singleArticle'>
      {/* <h1>Why Am I At Home</h1> */}
      <h1>{article.title}</h1>
      <img
        // src='https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Frobcain%2Ffiles%2F2017%2F10%2FKevin-Home-Alone.jpg'
        src={article.imageUrl}
        // alt='home'
        alt='home'
      />
      <p>
        {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex esse
        laboriosam officia accusantium veritatis fugiat exercitationem vero
        autem nihil aliquid ullam recusandae, quis odit odio voluptates
        explicabo nobis! Consequuntur, aliquam? */}
        {article.body}
      </p>
    </div>
  );
};

export default SingleArticle;
