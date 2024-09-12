import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/actions/product'; // Assume you have a product action
import { categoriesData } from '../../static/categoriesData'; // Categories should be defined here

const CreateProduct = () => {
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mainCategory, setMainCategory] = useState("Electronics");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('mainCategory', mainCategory);
    formData.append('subCategory', subCategory);
    formData.append('subSubCategory', subSubCategory);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('image', image);

    dispatch(createProduct(formData));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Main Category</label>
          <select
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value)}
            required
          >
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        {mainCategory === "Electronics" && (
          <div>
            <label>Subcategory</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
            >
              <option value="">Choose a subcategory</option>
              <option value="Laptops & Computers">Laptops & Computers</option>
              <option value="Televisions">Televisions</option>
              <option value="Audios">Audios</option>
              <option value="Cameras">Cameras</option>
            </select>
          </div>
        )}

        {subCategory === "Laptops & Computers" && (
          <div>
            <label>Further Subcategory</label>
            <select
              value={subSubCategory}
              onChange={(e) => setSubSubCategory(e.target.value)}
              required
            >
              <option value="">Choose a further subcategory</option>
              <option value="Networking Products">Networking Products</option>
              <option value="Printers, Scanners & Accessories">Printers, Scanners & Accessories</option>
              <option value="Desktops & Monitors">Desktops & Monitors</option>
              <option value="Software">Software</option>
            </select>
          </div>
        )}

        <div>
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Discount</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div>
          <label>Product Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

// export default CreateProduct;

// Sample categoriesData Structure


// categoriesData.js

const categoriesData = [
    {
      mainCategory: 'Electronics',
      subCategories: [
        {
          subCategory: 'Laptops & Computers',
          subSubCategories: [
            'Networking Products',
            'Printers, Scanners & Accessories',
            'Desktops & Monitors',
            'Software',
          ],
        },
        {
          subCategory: 'Televisions',
          subSubCategories: [
            'LED Televisions',
            'Smart Televisions',
            '4K Ultra HD',
            'OLED',
          ],
        },
        {
          subCategory: 'Audios',
          subSubCategories: [
            'Home Theaters',
            'Soundbars',
            'Headphones',
            'Bluetooth Speakers',
          ],
        },
        {
          subCategory: 'Cameras',
          subSubCategories: [
            'Digital Cameras',
            'DSLR Cameras',
            'Action Cameras',
            'Camera Accessories',
          ],
        },
      ],
    },
    // You can add more main categories here
  ];
  
//   export default categoriesData;




// Usage in the Frontend (React)
// You can use this categoriesData in your product creation form to dynamically populate dropdowns for categories, subcategories, and sub-subcategories.

// Example of how you can use categoriesData to display in a form

// CreateProductForm.jsx

import React, { useState } from 'react';
// import categoriesData from './categoriesData';

const CreateProductForm = () => {
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategory, setSubSubCategory] = useState('');

  const handleMainCategoryChange = (e) => {
    setMainCategory(e.target.value);
    setSubCategory('');
    setSubSubCategory('');
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
    setSubSubCategory('');
  };

  return (
    <form>
      {/* Other form inputs like name, description, etc. */}

      {/* Main Category */}
      <div>
        <label>Main Category:</label>
        <select value={mainCategory} onChange={handleMainCategoryChange}>
          <option value="">Select Main Category</option>
          {categoriesData.map((category) => (
            <option key={category.mainCategory} value={category.mainCategory}>
              {category.mainCategory}
            </option>
          ))}
        </select>
      </div>

      {/* Sub Category */}
      {mainCategory && (
        <div>
          <label>Sub Category:</label>
          <select value={subCategory} onChange={handleSubCategoryChange}>
            <option value="">Select Sub Category</option>
            {categoriesData
              .find((cat) => cat.mainCategory === mainCategory)
              .subCategories.map((subCat) => (
                <option key={subCat.subCategory} value={subCat.subCategory}>
                  {subCat.subCategory}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Sub-Sub Category */}
      {subCategory && (
        <div>
          <label>Sub-Sub Category:</label>
          <select
            value={subSubCategory}
            onChange={(e) => setSubSubCategory(e.target.value)}
          >
            <option value="">Select Sub-Sub Category</option>
            {categoriesData
              .find((cat) => cat.mainCategory === mainCategory)
              .subCategories.find((subCat) => subCat.subCategory === subCategory)
              .subSubCategories.map((subSubCat) => (
                <option key={subSubCat} value={subSubCat}>
                  {subSubCat}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Submit Button */}
      <button type="submit">Create Product</button>
    </form>
  );
};

// export default CreateProductForm;

  
