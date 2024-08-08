//todo remove

const locationPin = "/assets/location-pin.webp"

const AddressSection = () => {

    return (
      <div className="addressSection container w-100 d-flex">
        <div className="w-50">
            <div className="addressTitle">
                We’re here for you. Write to us.
            </div>
        </div>
        <div className="w-50">
            <div className="flexBetween mb-4">
                <div className="indiaText">India</div>
                <img
                    src={locationPin}
                    className="locationPinImg"
                    alt="Contact Us Banner"
                />
            </div>
            <div>
                <div className="registeredOffice">Registered office: </div>
                <div className="axaoneTechnologies">Axaone Technologies Private Limited </div>
                <div className="addressTexts">
                43/2 & 43/3, Second Floor, Tulasi Damu Arrcade, Ganapathy, Coimbatore, Tamilnadu - 641006 CIN: U72900TZ2022PTC038197
                </div>
            </div>
        </div>    
      </div>
    );
  };
  
  export default AddressSection;
  