import Header from "../components/layout/Header";
import Hero from '../components/route/hero/Hero'; 
import Categories from '../components/route/categories/Categories';
import BestDeals from '../components/route/bestDeals/BestDeals' 
import FeaturedProduct  from '../components/route/featuredProduct/FeaturedProduct' 
import Events from '../components/route/events/Events' 
import ProductSection from '../components/route/productSection/ProductSection'
// import Footer from '../components/layout/Footer'

const HomePage = () => {
  window.scrollTo(0,0)
  return (
    <div >
    
      <Header activeHeading ={1}/>
      <Hero />
      <Categories /> 
      <BestDeals /> 
      <Events /> 
      <FeaturedProduct /> 
      <ProductSection /> 
      {/* <Footer />  */}
    </div> 
  );
};

export default HomePage;
