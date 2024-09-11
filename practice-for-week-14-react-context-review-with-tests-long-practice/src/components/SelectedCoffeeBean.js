import { useCoffee } from '../context/CoffeeContext';

const SelectedCoffeeBean = () => {

  const { coffeeBean } = useCoffee();
  console.log(coffeeBean);

  return (
    <div className="selected-coffee">
      <h2>Current Selection: {coffeeBean.name}</h2>
    </div>
  );
}

export default SelectedCoffeeBean;
