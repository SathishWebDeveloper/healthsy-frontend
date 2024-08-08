// import Footer from "../Layouts/Footer/Footer";
// import Header from "../Layouts/Header/Header";
import HealthCareProductsBanner from "./healthcareProductsBanner";
import ShopByCategories from "./shopByCategories";
import FAQ from "../Common/faq";
import HealthcareProductsStep from "./healthcareProductsSteps";
import HealthcareProductsTopBrands from "./healthcareProductsTopBrands";

const HealthcareProducts = () => {

  return (
    <div className="healthcareProductsContainer">
      {/* <Header /> */}
      <HealthCareProductsBanner />
      <ShopByCategories />
      <HealthcareProductsTopBrands />
      <HealthcareProductsStep />
      <FAQ
        pageName="home healthcare products"
        section="healthcare-products"
        className="healthcareProductsFaq"
      />
      {/* <Footer /> */}
    </div>
  );
};
export default HealthcareProducts;
