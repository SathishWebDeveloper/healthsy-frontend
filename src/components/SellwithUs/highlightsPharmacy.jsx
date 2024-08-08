import Image from "next/image";

const tick = "/assets/ticks.svg";
const macWithMobile = "/assets/macWithMobile.webp";

const highlightsData = [
  "Manage your orders and returns at ease",
  "Reach out for support via call, chat or mail",
  "Manage your payments and settlements",
];

const HighlightsPharmacy = () => {
  return (
    <div className="container highlightsPharmacy">
      <div className="highlightPharmacyTitle text-center">
        <>Highlights of <h2 className="primaryColor fs36m24fwb d-inline">‘HealthSy for Pharmacies’</h2> App</>
      </div>
      <div className="d-flex highlightPharmacyContent py-5">
        <div className="highlightTextContent">
          {highlightsData.map((val, inx) => (
            <div className="d-flex align-items-center highlightList" key={inx}>
              <Image
                src={tick}
                alt="tick"
                width={15}
                height={10}
                className="tickImage"
              />
              <div className="highlightPoint">{val}</div>
            </div>
          ))}
        </div>
        <Image
          src={macWithMobile}
          width={660}
          height={465}
          className="highlightsImage"
          alt="highlights"
        />
      </div>
    </div>
  );
};

export default HighlightsPharmacy;
