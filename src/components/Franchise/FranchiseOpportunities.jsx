import Image from "next/image"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import CallModel from "./CallModel";
import useIsDesktop from "../Hooks/useIsDesktop";

const FranchiseOpportunitiesImg = "/assets/franchise/franchise-opportunities.webp"
const FranchiseOpportunitiesMobImg = "/assets/franchise/franchise-mob-opportunities.webp"
const location = "/assets/franchise/location.svg"

const FranchiseOpportunities = () => {
    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])
    const [isOpportunities, setIsOpportunities] = useState(null)
    const [callModel, setCallModel] = useState(false)
    const [show, setShow] = useState(false)

    const isDesktop = useIsDesktop();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    useEffect(() => {
        getStateList()
    }, [])

    const getStateList = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APP_API_URL}frp-states/state-list`)
            .then((res) => {
                setStateList(res?.data);
            }).catch((err) => {
                console.log("StateListErr: ", err);
            });
    }

    const handleOptionChange = (e) => {
        const matchingState = stateList.find((state) => state.state === e.target.value);
        setCityList(matchingState?.cities)
    }

    const onSubmit = (fields) => {
        const selectedState = stateList.find((state) => state.state === fields.state);
        const selectedCity = selectedState?.cities.find((city) => city.city === fields.city);
        setShow(true)

        if (selectedState && selectedCity && selectedState.active && selectedCity.active) {
            setIsOpportunities(true)
        } else {
            setIsOpportunities(false)
        }
    }

    return (
        <>
            <div className="franchiseOpportunities">
                <div className="desktopContent">
                    <Image src={FranchiseOpportunitiesImg}
                        fill
                        alt="FranchiseOpportunitiesImg"
                        className="franchiseOpportunitiesImg"
                    />
                </div>
                <div className="mobContent">
                    <Image src={FranchiseOpportunitiesMobImg}
                        fill
                        alt="FranchiseOpportunitiesImg"
                        className="franchiseOpportunitiesImg"
                    />
                </div>
                <div className="container franchiseOpportunitiesFormContentWrapper">
                    <div className={`${show ? "bottomSpacing" : ""} franchiseOpportunitiesForm`} id="opportunities-form">
                        <div className="franchiseOpportunitiesTitle fs32m20fwb">Check for <span className="primaryColor fs32m20fw800">HealthSy Franchise Store</span> Opportunities Now!</div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="franchiseOpportunitesFieldWrapper position-relative">
                                <div className="franchiseOpportunitesStore">
                                    <select className="healthsyFranchiseOpportunities"
                                        {...register("state", { required: true })}
                                        onChange={(e) => handleOptionChange(e)}
                                    >
                                        <option value="">Select your state</option>
                                        {stateList.map((data, inx) => <option key={inx} value={data.state}>{data.state}</option>)}
                                    </select>
                                    {errors.state && (
                                        <div className={`invalid-feedback d-block`}>
                                            Please provide a State
                                        </div>
                                    )}
                                    <Image
                                        src={location}
                                        width={24}
                                        height={24}
                                        alt="location"
                                        className="stateLoaction"
                                    />
                                </div>
                                <div>
                                    <select className="healthsyFranchiseOpportunities"
                                        {...register("city", { required: true })}
                                    >
                                        <option value="">Select your city / town</option>
                                        {cityList?.map((data, inx) => <option key={inx} value={data.city}>{data.city}</option>)}
                                    </select>
                                    {errors.city && (
                                        <div className={`invalid-feedback d-block`}>
                                            Please provide a City
                                        </div>
                                    )}
                                    <Image
                                        src={location}
                                        width={24}
                                        height={24}
                                        alt="location"
                                        className={`${errors.city && "cityLocationIcon"} cityLoaction`}
                                    />
                                </div>
                            </div>
                            <div className="flexCenter text-center">
                                <button className="btn text-white fs20m16fwb franchiseOpportunitiesBtn bg-primary" type="submit">Search</button>
                            </div>
                        </form>
                        <div className={`${show ? "d-block" : "d-none"} opportunitiesSuccess`}>
                            {
                                isOpportunities ?
                                    <div className="fs16m14fw600 opportunityAvailable">
                                        There is opportunities available
                                        {isDesktop ?
                                            <span onClick={() => setCallModel(true)} className={`${isDesktop ? "ps-4" : "ps-3"} primaryColor cursor-pointer`}>Contact us </span>
                                            : <a href="tel: 07603-944039" className={`${isDesktop ? "ps-4" : "ps-3"} primaryColor cursor-pointer callModelNavigate`}>
                                                Contact us
                                            </a>
                                        }
                                    </div> :
                                    <div className="fs16m14fw600 opportunityUnavailable">
                                        There is no opportunities available
                                        {isDesktop ?
                                            <span onClick={() => setCallModel(true)} className={`${isDesktop ? "ps-4" : "ps-3"} primaryColor cursor-pointer`}>Contact us </span>
                                            : <a href="tel: 07603-944039" className={`${isDesktop ? "ps-4" : "ps-3"} primaryColor cursor-pointer callModelNavigate`}>
                                                Contact us
                                            </a>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <CallModel
                callModel={callModel}
                setCallModel={setCallModel}
            />
        </>
    )
}

export default FranchiseOpportunities;