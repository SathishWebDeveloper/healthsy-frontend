import Image from "next/image";

const ServiceAdvantages = ({ advantageArr = [], descH2Tag = false }) => {
  return (
    <div className="container serviceAdvantages">
      <div className="row">
        {advantageArr.map((val, inx) => {
          return (
            <div className="col-4 serviceAdBox" key={inx}>
              <div className="serviceAdBoxContent">
                <div className="serviceAdImgWrapper flexCenter">
                  <Image
                    src={val.image}
                    width={40}
                    height={40}
                    alt="Advantage image"
                    className="serviceAdvantageImg"
                  />
                </div>
                {/* {
                  !descH2Tag ? <div className="serviceAdDesc">{val.desc}</div>
                    : */}
                <h2 className="serviceAdDesc">{val.desc}</h2>
                {/* // }  */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceAdvantages;
