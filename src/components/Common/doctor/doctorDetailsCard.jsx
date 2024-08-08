import Image from "next/image";

const DoctorDetailsCard = ({
  data = [],
  icon,
  iconAlt = "",
  id = "",
  title
}) => {

  return (
    <div className="aboutDoctorDetailsWrapper" id={id}>
      <div className="d-flex doctorlanguageKnow">
        <Image src={icon} width={24} height={24} alt={iconAlt} />
        <div className="fs20m14fwb">{title}</div>
      </div>
      <div>
        {data?.map((item, idx) => {
          return (
            <div key={idx} className="flexAlignCenter languageKnownWrapper">
              <div className="pulletSymbol"></div>
              <div className="fs16m14fw600">{item}</div>
            </div>
          );
        })}
      </div>
    </div>

  )
}

export default DoctorDetailsCard;