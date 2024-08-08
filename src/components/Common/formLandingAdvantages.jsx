import Image from "next/image";

const FormLandingAdvantages = ({
  title = "",
  desc = "",
  advantageArr = [],
}) => {
  return (
    <div className="container formLandingAdvantages">
      <div className="formAdvantageTitle text-center">{title}</div>
      <div className="formAdvantageDesc text-center">{desc}</div>
      <div className="row">
        {advantageArr.map((val, inx) => {
          return (
            <div className="col-4 formAdBox" key={inx}>
              <div className="formAdBoxContent">
                <div className="formAdImgWrapper flexCenter">
                  <Image
                    src={val.image}
                    width={val.imgWidth}
                    height={val.imgHeight}
                    alt={val.title}
                  />
                </div>
                <div className="">
                  <div className="formAdSubTitle">{val.title}</div>
                  <h2 className="formAdSubDesc">{val.desc}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormLandingAdvantages;
