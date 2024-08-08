import Image from "next/image";

const access = "assets/franchise/access.svg";
const brand = "assets/franchise/brand.svg";
const easy = "assets/franchise/easy.svg";
const gain = "assets/franchise/gain.svg";
const dedicated = "assets/franchise/dedicated.svg";
const training = "assets/franchise/training.svg";
const instadoc = "assets/franchise/instadoc.svg";
const capital = "assets/franchise/capital.svg";

const advantagesIcons = [
    {
        image: access,
        title: "Access to existing Customers",
    },
    {
        image: brand,
        title: "Brand and visibility",
    },
    {
        image: easy,
        title: "Easy to use pharmacy panel",
    },
    {
        image: gain,
        title: "Gain from our digital marketing initiative",
    },
    {
        image: dedicated,
        title: "Dedicated partner success executive",
    },
    {
        image: training,
        title: "Training and guidance",
    },
    {
        image: instadoc,
        title: "InstaDoc feature at your franchise store",
    },
    {
        image: capital,
        title: "Working capital support and loans",
    },
]

const advantageFranchise = () => {
    return (
        <>
            <div className="container advantageFranchiseSection">
                <div className="advantageFranchiseTitle fs36m20fwb">Advantages of Owning a</div>
                <div className="advantageFranchiseDesc fs36m24fwb">“HealthSy Retail Pharmacy Franchise Store”</div>

                <div className="advantageBoxSection">
                    {
                        advantagesIcons.map((val, ind) => {
                            return (
                                <div className="advantageBoxContent" key={ind}>
                                    <div className="flexColumn">
                                        <Image
                                            src={val.image}
                                            width={48}
                                            height={48}
                                            alt={val.title}
                                            className="advImg"
                                        />
                                    </div>
                                    <div className="content">{val.title} </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default advantageFranchise;