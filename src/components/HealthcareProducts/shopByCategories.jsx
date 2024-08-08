const tick = "/assets/ticks.svg";
const beauty = "/assets/healthcareProducts/categories/beauty.webp";
const covidEssentials = "/assets/healthcareProducts/categories/covid-essentials.webp";
const diabeticsCare = "/assets/healthcareProducts/categories/diabetics-care.webp";
const fitnessSupplements = "/assets/healthcareProducts/categories/fitness_supplements.webp";
const healthcareDevices = "/assets/healthcareProducts/categories/healthcare-devices.webp";
const healthFoodDrinks = "/assets/healthcareProducts/categories/health-food-drinks.webp";
const homeOfficeEssentials = "/assets/healthcareProducts/categories/home-office-essentials.webp";
const personalCare = "/assets/healthcareProducts/categories/personal-care.webp";
const seniorCare = "/assets/healthcareProducts/categories/senior-care.webp";
const sexualWellness = "/assets/healthcareProducts/categories/sexual-wellness.webp";
const surgicals = "/assets/healthcareProducts/categories/surgicals.webp";
const WomenBabycare = "/assets/healthcareProducts/categories/women_and_babycare.webp";
const vitamins_minerals = "/assets/healthcareProducts/categories/vitamins_minerals.webp";
const ayushProducts = "/assets/healthcareProducts/categories/ayush-products.webp";

const ShopByCategories = () => {
  const categoriesImage = [
    {
      topImage: { src: WomenBabycare },
      bottomImage: { src: homeOfficeEssentials },
    },
    {
      topImage: { src: ayushProducts },
      bottomImage: { src: fitnessSupplements },
    },
    {
      topImage: { src: personalCare },
      bottomImage: { src: homeOfficeEssentials },
    },
    {
      topImage: { src: healthcareDevices },
      bottomImage: { src: vitamins_minerals },
    },
    {
      topImage: { src: healthFoodDrinks },
      bottomImage: { src: surgicals },
    },
    {
      topImage: { src: sexualWellness },
      bottomImage: { src: diabeticsCare },
    },
    {
      topImage: { src: seniorCare },
      bottomImage: { src: covidEssentials },
    },
    {
      topImage: { src: beauty },
      bottomImage: { src: WomenBabycare },
    },
  ];
  const descList = [
    { text: "15+ Categories" },
    { text: "30+ Sub-Categories" },
    { text: "Top Brands" },
  ];

  return (
    <div className="shopByCategoiesContainer d-flex">
      <div className=" container">
        <div className="shopByCategoiesContent">
          <div className="shopByCategoiesTitle">Shop by Categories</div>
          <div className="shopByCategoiesDesc mobContent d-none  ">
            “Partnered Doctor Network Programme”
          </div>
          <ul className="shopByCategoiesList desktopContent">
            {descList.map((val, inx) => {
              return (
                <li key={inx}>
                  <img src={tick} alt="tick" className="features-ticks" />
                  <span className="ShopByCategoriesDesc">{val?.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="shopByCategoriesImageSection">
        <div className="image-container d-flex ">
          {[...categoriesImage, ...categoriesImage, ...categoriesImage, ...categoriesImage, ...categoriesImage].map((data, inx) => {
            return (
              <div className="flexColumn productGridBoxes" key={inx}>
                <img src={data.topImage.src} alt="Shop Categories product 1" />
                <img
                  src={data.bottomImage.src}
                  alt="Shop Categories product 2"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategories;
