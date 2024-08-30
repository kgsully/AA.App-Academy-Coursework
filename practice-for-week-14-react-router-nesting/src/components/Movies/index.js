import { Route, Switch, NavLink } from 'react-router-dom';
import MovieDetails from '../MovieDetails'
function Movies(props) {
  const { movies } = props;
  console.log(movies);

  return (
    <div className='comp orange'>
      <h1>Movies Component</h1>
      <nav>
        <ul>
          {movies.map(item => {
            return (
              <li key={item.id}>
                <NavLink to={`/movies/${item.id}`}>{item.title}</NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
      <Switch>
        <Route path='/movies/:movieId'>
          <MovieDetails movies={movies}/>
        </Route>
      </Switch>
    </div>
  );
}

export default Movies;
