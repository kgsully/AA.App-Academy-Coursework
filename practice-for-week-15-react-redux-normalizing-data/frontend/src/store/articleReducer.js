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

export const fetchArticles = () => async (dispatch) => {
  const response = await fetch('/api/articles');
  const articles = await response.json();
  dispatch(loadArticles(articles));
};

export const writeArticle = (payload) => async (dispatch) => {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const article = await response.json();
    dispatch(addArticle(article));
    return article;
  }
};

// const initialState = { entries: [], isLoading: true };
const initialState = { entries: {}, isLoading: true };

const articleReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case LOAD_ARTICLES:
      // return { ...state, entries: [...action.articles] };
      // Refactor to normalize the data
      newState.entries = {...state.entries}
      action.articles.forEach((article) => {
        return newState.entries[article.id] = article
      })
      return newState;
    case ADD_ARTICLE:
      // return { ...state, entries: [...state.entries, action.article] };
      // Refactor to normalize the data
      newState.entries[action.article.id] = action.article;
      return newState;
    default:
      return state;
  }
};

export default articleReducer;
