import { useHistory } from 'react-router-dom';

const Unmounted = () => {
  // Error #2 - Have to declare 'history' variable and assign it to useHistory()
  const history = useHistory();

  return (
    <div className='unmounted'>
      <h1>Welcome</h1>
      {/* Error #3 - originally 'history.pus', changed to 'history.push' */}
      <button onClick={() => history.push('/mount')}>Login</button>
    </div>
  );
};

export default Unmounted;
