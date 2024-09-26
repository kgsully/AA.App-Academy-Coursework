// import articles from '../data/data.json';

const LOAD_ARTICLES = 'article/loadArticles';
const ADD_ARTICLE = 'article/addArticle';

export const loadArticles = (articles) => {
  return {
    type: LOAD_ARTICLES,
    articles
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    article
  };
};

// thunk action creators
export const fetchArticles = () => async (dispatch) => {
  const fetchedArticles = await fetch('/api/articles');
  const articles = await fetchedArticles.json();
  console.log(articles);
  dispatch(loadArticles(articles));
}

export const writeArticle = (article) => async (dispatch) => {
  const response = fetch('/api/articles', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(article)
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(addArticle(data));
    return data;
  }

}

const initialState = { entries: [], isLoading: true };

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return { ...state, entries: [...action.articles] };
    case ADD_ARTICLE:
      return { ...state, entries: [...state.entries, action.article] };
    default:
      return state;
  }
};

export default articleReducer;
