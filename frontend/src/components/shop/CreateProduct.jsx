
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { PiUploadSimpleThin } from "react-icons/pi";
import { createProduct } from "../../redux/actions/product";
import {toast} from 'react-toastify'

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stock, setStock] = useState(1);


  const handleImageChange = (e) => {
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleImageRemove = (indexToRemove) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    dispatch(createProduct(newForm));
    
    if(success){
      toast.success('Product created successfully')
      navigate('/dashboard');
    }
    if(error){
      toast.error(error)
      window.location.reload();
     }
  };

  return (
    <div className="md:w-[50%] w-[90%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="font-Poppins text-center text-[30px]">Create Product</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div className="productName">
          <label htmlFor="" className="pb-2">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter product name..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div className="productDescription">
          <label htmlFor="" className="pb-2">
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            type="text"
            required
            cols="30"
            rows="8"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full px-3 pt-2 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter product description..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <br />
        <div className="productTags ">
          <label htmlFor="" className="pb-2">
            Category<span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full border h-[36px] rounded-[5px]"
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i, index) => (
                <option key={index}>{i.title}</option>
              ))}
          </select>
        </div>
        <br />
        <div className="tags">
          <label htmlFor="" className="pb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter product tags..."
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <br />
        <div className="OriginalPrice">
          <label htmlFor="" className="pb-2">
            Original Price
          </label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter product price..."
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        <br />
        <div className="productDescription">
          <label htmlFor="" className="pb-2">
            Price (With Discount)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter product price with discount..."
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>
        <br />
        <div className="productDescription">
          <label htmlFor="" className="pb-2">
            Product Stock
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Please specify the available quantity..."
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <br />
        <div className="productDescription">
          <label htmlFor="upload" className="pb-2 flex gap-4 items-center">
            <p>
              Upload Image <span className="text-red-500">*</span>
            </p>
            <PiUploadSimpleThin size={25} className="cursor-pointer" />
          </label>

          <input
            type="file"
            id="upload"
            multiple
            hidden
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap ">
            {images &&
              images.map((image, index) => (
                <div key={index} className="relative m-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="w-[120px] h-[120px] object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  >
                    x
                  </button>
                </div>
              ))}
          </div>
          <br />
          <div className="submitButton">
            <input
              type="submit"
              value="Create"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer hover:bg-teal-500 hover:text-white"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;






 

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { categoriesData } from "../../static/categoriesData";

// const CreateProduct = () => {
//   const { seller } = useSelector((state) => state.seller);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [images, setImages] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubcategory] = useState("");
//   const [tags, setTags] = useState("");
//   const [discountPrice, setDiscountPrice] = useState();
//   const [originalPrice, setOriginalPrice] = useState();
//   const [stock, setStock] = useState();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your form submission logic here
//   };

//   const selectedCategory = categoriesData.find((cat) => cat.title === category);

//   return (
//     <div className="md:w-[50%] w-[90%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
//       <h5 className="font-Poppins text-center text-[30px]">Create Product</h5>
//       {/* create product form */}
//       <form onSubmit={handleSubmit}>
//         <br />
//         <div className="productName">
//           <label htmlFor="" className="pb-2">
//             Name<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={name}
//             className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Enter product name..."
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <br />
//         <div className="productDescription">
//           <label htmlFor="" className="pb-2">
//             Description<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="description"
//             value={description}
//             className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Enter product description..."
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <br />
//         <div className="productCategory">
//           <label htmlFor="" className="pb-2">
//             Category<span className="text-red-500">*</span>
//           </label>
//           <select
//             name="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="mt-2 w-full border h-[36px] rounded-[5px]"
//           >
//             <option value="">Choose a category</option>
//             {categoriesData.map((cat) => (
//               <option key={cat.title} value={cat.title}>
//                 {cat.title}
//               </option>
//             ))}
//           </select>
//         </div>
//         {selectedCategory && selectedCategory.subcategories.length > 0 && (
//           <div className="productSubcategory">
//             <label htmlFor="" className="pb-2">
//               Subcategory<span className="text-red-500">*</span>
//             </label>
//             <select
//               name="subcategory"
//               value={subcategory}
//               onChange={(e) => setSubcategory(e.target.value)}
//               className="mt-2 w-full border h-[36px] rounded-[5px]"
//             >
//               <option value="">Choose a subcategory</option>
//               {selectedCategory.subcategories.map((subcat) => (
//                 <option key={subcat} value={subcat}>
//                   {subcat}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default CreateProduct;