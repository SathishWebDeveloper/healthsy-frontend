import Image from "next/image"

const Physiotherpy = ({
    PhysioDetails = [],
    title = "",
    desc = "",
    className = "fs48m24fwb",
    physioHealthCare = "physioHealthSection" }) => {
    return (
        <div className={`${physioHealthCare} container`}>
            <div>
                <div className={`${className} text-justify`}>{title}</div>
                <p className="physioDesc fs24m16">{desc}</p>
            </div>
            {
                PhysioDetails.map((data, inx) => {
                    return (
                        <div className="physioContents d-flex" key={inx}>
                            <div className="physioImage flexCenter">
                                <Image src={data.Image} width={50} height={50} className="physioImg" alt="Physiotherapy" />
                            </div>
                            <div className="d-flex flex-column">
                                <div className="physioTitle fs24m16fwb">{data.title}</div>
                                <div className="physioDescription fs20m16">{data.desc}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Physiotherpy