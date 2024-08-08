import { Fragment, useEffect, useState } from "react"

const dolo = "/assets/orderMedicine/dolo_65.webp"
const prescription = "/assets/orderMedicine/prescription.webp"
const review_and_pay = "/assets/orderMedicine/review_and_pay.webp"
const order_successfully = "/assets/orderMedicine/order_successfully.webp"

const mob_dolo = "/assets/orderMedicine/mob-dolo_65.webp"
const mob_prescription = "/assets/orderMedicine/mob-prescription.webp"
const mob_review_and_pay = "/assets/orderMedicine/mob-review_and_pay.webp"
const mob_order_successfully = "/assets/orderMedicine/mob-order_successfully.webp"

const OrderMedicineSteps = () => {

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 960px)");
        const listener = () => setIsDesktop(media.matches);
        listener();
        window.addEventListener("resize", listener);

        return () => window.removeEventListener("resize", listener);
    }, [isDesktop]);

    const OrderSteps = [
        {
            image: isDesktop ? dolo : mob_dolo,
            title: 'Search & Add',
            explanantion: 'Simply search for your required medicines and add to cart'
        },
        {
            image: isDesktop ? prescription : mob_prescription,
            title: 'Upload valid Prescription',
            explanantion: 'Upload valid prescription else get connected with a partnered doctor '
        },
        {
            image: isDesktop ? review_and_pay : mob_review_and_pay,
            title: 'Add Patient & Delivery Details and Pay',
            explanantion: 'Type patient and delivery details and proceed to pay using the most convenient method'
        },
        {
            image: isDesktop ? order_successfully : mob_order_successfully,
            title: 'Track your Order',
            explanantion: 'Once order is placed, track your order in real time from your app'
        },
    ]

    return (
        <div className="OrderMedicineStepsContainer">
            <div className="container pt-5">
                <div className="d-flex justify-content-center">
                    {/* <div className="OrderMedicineStepsTitle fs38m24fwb d-inline">
                        <span className="primaryColor"><h2 className="fs38m24fwb">Buy Medicines Online</h2></span> from HealthSy in a Quick and Safe Manner
                    </div> */}
                    <div className="d-flex justify-content-center">
                        <div className="OrderMedicineStepsTitle fs38m24fwb d-inline">
                            <h2 className="primaryColor fs38m24fwb d-inline"> Buy Medicines Online{" "}</h2> from HealthSy in a Quick and Safe Manner
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-wrap mt-4 dynamicOrderSteps">
                    {
                        OrderSteps.map((data, idx) => {
                            return (<Fragment key={idx}>
                                <div className="OrderMedicineStepsContentWrapper flexColumnJusBetween mt-4 " key={idx}>
                                    <div>
                                        <div className="OrderMedicineStepTexts flexCenter">
                                            STEP-{idx + 1}
                                        </div>
                                        <div className="orderMedicineStepsTitles mb-4">{data.title}</div>
                                        <div className="orderMedicineStepsExplanation mb-4">{data.explanantion}</div>
                                    </div>
                                    <img src={data.image} alt="dolo" className={`mt-3 w-100 ${idx === 3 && 'orderMedicineStepsExplanationImage'}`}></img>
                                </div>
                            </Fragment>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderMedicineSteps;