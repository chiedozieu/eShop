import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from './productSlice'; // Adjust the import path as needed
import ProductCategory from './ProductCategory'; // Adjust the import path as needed



const ProductCategory = [
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
          fields: [
            { name: 'ram', label: 'RAM', type: 'select', options: ['4GB', '8GB', '16GB', '32GB'] },
            { name: 'storage', label: 'Storage', type: 'select', options: ['256GB SSD', '512GB SSD', '1TB HDD', '2TB HDD'] },
            { name: 'screenSize', label: 'Screen Size', type: 'select', options: ['13"', '14"', '15.6"', '17"'] },
            { name: 'processor', label: 'Processor', type: 'text' },
          ]
        },
        // Other electronics subcategories...
      ],
    },
    {
      mainCategory: 'Real Estate',
      subCategories: [
        {
          subCategory: 'Apartments',
          subSubCategories: ['For Rent', 'For Sale'],
          fields: [
            { name: 'bedrooms', label: 'Number of Bedrooms', type: 'number' },
            { name: 'bathrooms', label: 'Number of Bathrooms', type: 'number' },
            { name: 'area', label: 'Area (sq ft)', type: 'number' },
            { name: 'furnished', label: 'Furnished', type: 'checkbox' },
          ]
        },
        // Other real estate subcategories...
      ],
    },
    // Other main categories...
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
  const [dynamicFields, setDynamicFields] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { ...formData };
    dynamicFields.forEach(field => {
      productData[field.name] = formData[field.name];
    });
    dispatch(createProduct(productData));
  };

  useEffect(() => {
    if (formData.subCategory) {
      const category = ProductCategory.find(cat => cat.mainCategory === formData.mainCategory);
      const subCategory = category?.subCategories.find(sub => sub.subCategory === formData.subCategory);
      setDynamicFields(subCategory?.fields || []);
    } else {
      setDynamicFields([]);
    }
  }, [formData.mainCategory, formData.subCategory]);

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select {field.label}</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={field.name}
            checked={formData[field.name] || false}
            onChange={handleInputChange}
            className="mr-2"
          />
        );
      case 'number':
      case 'text':
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main category, subcategory, and sub-subcategory selects */}
        {/* ... (similar to previous version) ... */}
        
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
        
        {/* Dynamic fields */}
        {dynamicFields.map((field, index) => (
          <div key={index}>
            <label className="block mb-1">{field.label}</label>
            {renderField(field)}
          </div>
        ))}
        
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