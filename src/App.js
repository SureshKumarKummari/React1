import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [foodItems, setFoodItems] = useState([]);
  const [electronicsItems, setElectronicsItems] = useState([]);
  const [skincareItems, setSkincareItems] = useState([]);

  useEffect(() => {
    setFoodItems(getAllProducts('FoodItems'));
    setElectronicsItems(getAllProducts('ElectronicsItems'));
    setSkincareItems(getAllProducts('SkincareItems'));
  }, []);

  function getAllProducts(category) {
    let items = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let product = JSON.parse(localStorage.getItem(key));
      if (product.productcategory === category) {
        items.push([product, key]);
      }
    }
    return items;
  }

  const removeItem = (key, category) => {
    localStorage.removeItem(key);
    if (category === 'ElectronicsItems') {
      setElectronicsItems((prev) => prev.filter((item) => item[1] !== key));
    } else if (category === 'FoodItems') {
      setFoodItems((prev) => prev.filter((item) => item[1] !== key));
    } else if (category === 'SkincareItems') {
      setSkincareItems((prev) => prev.filter((item) => item[1] !== key));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = localStorage.length + 1;
    const obj = {
      productid: e.target.elements.id.value,
      productname: e.target.elements.name.value,
      productprice: e.target.elements.price.value,
      productcategory: e.target.elements.category.value,
    };

    localStorage.setItem(key, JSON.stringify(obj));

    if (obj.productcategory === 'ElectronicsItems') {
      setElectronicsItems((prev) => [...prev, [obj, key]]);
    } else if (obj.productcategory === 'FoodItems') {
      setFoodItems((prev) => [...prev, [obj, key]]);
    } else if (obj.productcategory === 'SkincareItems') {
      setSkincareItems((prev) => [...prev, [obj, key]]);
    }
  };

  return (
    <div className="App">
      <h1>Add Products</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="productid">Product Id</label>
          <input type="number" id="productid" name="id" />
          <br />
          <label htmlFor="price">Product Price</label>
          <input type="number" id="price" name="price" />
          <br />
          <label htmlFor="productname">Product Name</label>
          <input type="text" id="productname" name="name" />
          <br />
          <label htmlFor="category">Choose a Category</label>
          <select id="category" name="category">
            <option value="ElectronicsItems">Electronics</option>
            <option value="SkincareItems">Skincare</option>
            <option value="FoodItems">Food</option>
          </select>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h2>Electronics Items</h2>
        <hr />
        {electronicsItems.map(([item, key]) => (
          <div key={key}>
              <p>{item.productname}  {item.productprice} {item.productcategory}  <button onClick={() => removeItem(key, 'ElectronicsItems')}>Delete Product</button></p>
          </div>
        ))}
      </div>

      <div>
        <h2>Food Items</h2>
        <hr />
        {foodItems.map(([item, key]) => (
          <div key={key}>
            <h3>
              <p>{item.productname}  {item.productprice}  {item.productcategory} <button onClick={() => removeItem(key, 'FoodItems')}>Delete Product</button></p>
            </h3>
          </div>
        ))}
      </div>

      <div>
        <h2>Skincare Items</h2>
        <hr />
        {skincareItems.map(([item, key]) => (
          <div key={key}>
            <h3>
              <p>{item.productname}  {item.productprice}  {item.productcategory}  <button onClick={() => removeItem(key, 'SkincareItems')}>Delete Product</button></p>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
