import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from './productSlice'; // Adjust the import path as needed

const ProductCategory = [
  // Electronics
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
  // Vehicles
  {
    mainCategory: "Vehicles",
    subCategories: [
      {
        subCategory: "Cars",
        subSubCategories: [
          "Sedans",
          "Hatchbacks",
          "SUVs",
          "Trucks",
          "Coupes",
          "Convertibles"
        ]
      },
      {
        subCategory: "Motorcycles & Bicycles",
        subSubCategories: [
          "Cruisers",
          "Bicycles",
          "Sport Bikes",
          "Touring Bikes",
          "Off-Road Bikes",
          "Scooters"
        ]
      },
      {
        subCategory: "Commercial Vehicles",
        subSubCategories: [
          "Buses",
          "Trucks",
          "Vans",
          "Trailers",
          "Tankers",
          "Construction Equipment"
        ]
      },
      {
        subCategory: "Auto Parts & Accessories",
        subSubCategories: [
          "Engine Parts",
          "Transmission Parts",
          "Brake Systems",
          "Electrical Systems",
          "Exterior Accessories",
          "Other Parts"
        ]
      }
    ]
  },
];

const ProductCreatePage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);
  const [formData, setFormData] = useState({
    mainCategory: '',
    subCategory: '',
    subSubCategory: '',
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(formData));
  };

  const selectedMainCategory = ProductCategory.find(cat => cat.mainCategory === formData.mainCategory);
  const selectedSubCategory = selectedMainCategory?.subCategories.find(subCat => subCat.subCategory === formData.subCategory);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label className="block mb-1">Main Category</label>
          <select
            name="mainCategory"
            value={formData.mainCategory}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Main Category</option>
            {ProductCategory.map((category, index) => (
              <option key={index} value={category.mainCategory}>
                {category.mainCategory}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-1">Sub Category</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            disabled={!formData.mainCategory}
          >
            <option value="">Select Sub Category</option>
            {selectedMainCategory?.subCategories.map((subCategory, index) => (
              <option key={index} value={subCategory.subCategory}>
                {subCategory.subCategory}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Sub-Sub Category</label>
          <select
            name="subSubCategory"
            value={formData.subSubCategory}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            disabled={!formData.subCategory}
          >
            <option value="">Select Sub-Sub Category</option>
            {selectedSubCategory?.subSubCategories.map((subSubCategory, index) => (
              <option key={index} value={subSubCategory}>
                {subSubCategory}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductCreatePage;