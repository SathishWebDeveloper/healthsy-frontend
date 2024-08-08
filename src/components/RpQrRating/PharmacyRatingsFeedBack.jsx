import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "moment";
import { useRouter } from "next/router";

const PharmacyRatingsFeedBack = () => {

    const router = useRouter()

    const [ratingList, setRatingList] = useState();
    const [ratings, setRatings] = useState([]);
    const [displayedFeedbacks, setDisplayedFeedbacks] = useState(8);

    const [selectedOption, setSelectedOption] = useState('today'); // State to hold selected option

    useEffect(() => {
        getRatingList()
    }, [selectedOption])

    const queryParams = {
        pharmacy_id: router.query.id,
        duration: selectedOption
    };

    const getRatingList = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APP_API_URL}rating-form/rating-form-list`, {
                params: queryParams
            })
            .then((response) => {
                setRatingList(response?.data?.rows);
            })
            .catch((error) => {
                console.error('Error fetching rating list:', error);
            });
    }

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };

    useEffect(() => {
        countRatings();
    }, [ratingList]);

    // Counting the ratings
    const countRatings = () => {
        const ratingCounts = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        };

        ratingList?.forEach((item) => {
            ratingCounts[item.rating] += 1;
        });

        setRatings(ratingCounts);
    };

    const ratingArr = [
        {
            rating: 1,
            count: ratings[1],
        },
        {
            rating: 2,
            count: ratings[2],
        },
        {
            rating: 3,
            count: ratings[3],
        },
        {
            rating: 4,
            count: ratings[4],
        },
        {
            rating: 5,
            count: ratings[5],
        },

    ]

    const StoreRatings = () => {

        const handleWidth = () => {
            if (selectedOption === "Today") {
                return "200px"
            } else if (selectedOption === "Yesterday") {
                return "150px"
            } else if (selectedOption === "This Week") {
                return "120px"
            } else if (selectedOption === "This Month") {
                return "120px"
            }
            return `140px`
        }

        return (
            <div className="storeRatingsWrapper">
                <div className="flexBetweenCenter">
                    <div className="fs36m19fwb">Store Ratings</div>
                    <select
                        className="ratingPeriod ps-3"
                        value={selectedOption}
                        style={{ width: handleWidth() }}
                        onChange={handleSelectChange}
                    >
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="thisWeek">This Week</option>
                        <option value="thisMonth">This Month</option>
                    </select>
                </div>
                <div className="totalRatingWrapper">
                    <div className="fs32m24fw800">{ratingList?.length}</div>
                    <div className="fs18m14">Total Ratings given by customer</div>
                </div>
                <div>
                    {ratingArr.map((data, inx) => {
                        return (
                            <div key={inx} className="flexAlignCenter">
                                <div>{data.rating}</div>
                                <span className="ratingChatStar px-2">&#9733;</span>
                                <div className="position-relative ratingLineWrapper">
                                    <div className="ratingBar position-absolute" style={{ width: `${(data.count / ratingList?.length) * 100}%` }}></div>
                                    <div className="ratingLine d-block"></div>
                                </div>

                                <div className="ms-4">{data.count}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const getsrcValue = (value) => {

        if (typeof value === "string" && value.length)
            return process.env.NEXT_PUBLIC_APP_API_URL + "pharmacy-rating-images/" + value;
    };

    return (
        <>
            <div className="container pharmacyRatingsFeedBack d-flex">
                <div className="feedBacksWrapper">
                    <div className="fs36m19fwb feedBackTitle">Feedbacks</div>
                    {ratingList?.slice(0, displayedFeedbacks).map((data, inx) => {
                        return (
                            <div className="feedBackWrapper" key={inx}>
                                <div className="d-flex justify-content-end fs15m11 feedbackDateTime desktopContent">
                                    <span className="pe-1">{Moment(data.createdAt).format("MMMM DD, YYYY")}</span> |
                                    <span className="ps-1">{Moment(data.createdAt).format("LT")}</span>
                                </div>
                                <span className="fs24m13fw600m500 userName">{data.name}</span>
                                <div className="starRating">
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={`${index <= data.rating ? 'on' : 'off'} p-0`}
                                            >
                                                <span className="raingStar">
                                                    {index <= data.rating ? "\u2605" : "\u2606"}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="feedBack fs18m15fw500">{data.feedback}</div>
                                {data.images && data.images.length ? (
                                    <div className="logoImgWrapper">
                                        {data.images.map((img, inx) =>
                                            <img
                                                src={getsrcValue(img)}
                                                key={inx}
                                                height={80}
                                                width={80}
                                                className="me-3"
                                                alt="pharmacy-logo"
                                            />
                                        )}
                                    </div>) : null}
                                <div className="d-flex justify-content-between fs15m11 feedbackDateTime mobContent mt-2">
                                    <span>{Moment(data.createdAt).format("MMMM DD, YYYY")}</span>
                                    <span>{Moment(data.createdAt).format("LT")}</span>
                                </div>
                            </div>
                        );
                    })}
                    <div className="flexCenter">
                        {displayedFeedbacks < ratingList?.length && (
                            <button onClick={() => setDisplayedFeedbacks(displayedFeedbacks + 8)} className="viewMoreBtn fs20m15fwb">View more</button>
                        )}
                    </div>
                </div>
                <StoreRatings />
            </div>
        </>
    )
}

export default PharmacyRatingsFeedBack;