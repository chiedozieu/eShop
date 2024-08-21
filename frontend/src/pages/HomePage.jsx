import Header from "../components/layout/Header.jsx";
import Hero from '../components/route/hero/Hero.jsx'; 

const HomePage = () => {
  return (
    <div>
      <Header activeHeading ={1}/>
      <Hero />
    </div> 
  );
};

export default HomePage;
