import { React, useEffect, useState } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function ProductView({ products }) {

  // TODO: Replace with state variable
  // const sideOpen = true;
  // Added state variable for setting the side panel open or closed
  // BONUS - Set initial value of state variable based upon local storage
  const [ sideOpen, setSideOpen ] = useState(localStorage.getItem('sideOpen') === 'false' ? false : true);

  // Added state variable for selected product
  const [ selectedProduct, setSelectedProduct ] = useState(null);

  // Add useEffect hook to automatically open the side panel if a product is selected
  useEffect((sideOpen) => {
    // console.log(`useEffect Triggered - Debug - selectedProduct: ${selectedProduct}`);
    // Have to use qualifier for selectedProduct because closing the side panel will trigger the
    // useEffect to clear the selectedProduct, which will trigger this useEffect due to selectedProduct state variable
    // changing value, and without a qualifier for a truthy selectedProduct, it will cause setSideOpen to true again
    if(!sideOpen && selectedProduct) setSideOpen(true);
  }, [selectedProduct]);

  // Add useEffect hook to automatically clear the selected product if side panel is closed.
  useEffect(() => {
    // console.log(`useEffect Triggered - Debug - sideOpen: ${sideOpen} / selectedProduct: ${selectedProduct}`);
    // BONUS - Store the value of sideOpen state variable to local storage
    localStorage.setItem('sideOpen', sideOpen);
    if(!sideOpen) setSelectedProduct();
  }, [sideOpen]);

  console.log('Product View Render or Re-Render');

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              //  Original onClick event handler logic
              // onClick={() => console.log('SELECT PRODUCT', item)}
              onClick={() => setSelectedProduct(item)}
              // Added isSelected prop to pass to ProductListItem to highlight selected item in the product view
              // need the qualifier for selectedProduct being true, otherwise with no product selected,
              // it errors out due to no .id key being found on a null value
              isSelected={selectedProduct && selectedProduct.id === item.id}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
              //  Original onClick event handler logic
              //  onClick={() => console.log('TOGGLE SIDE PANEL')}
               onClick={() => setSideOpen((prevSideOpen) => !prevSideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        {/* added prop 'product' and set = to state variable selectedProduct */}
        <ProductDetails visible={sideOpen} product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductView;
