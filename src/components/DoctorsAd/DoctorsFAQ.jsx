import { useState } from "react";
import { TfiAngleDown } from "react-icons/tfi";

const DoctorsFAQ = ({
    FaqArr = [],
    Classname = "",
    wrapperClassName = "",
}) => {
    const [showAnswer, setShowAnswer] = useState(null);

    const toggleAnswer = (idx) => {
        setShowAnswer(showAnswer === idx ? null : idx);
    };

    return (
        <>
            <div className={`container doctorsFaqSection ${wrapperClassName}`}>
                <div className="text-center">
                    <div className={`${Classname} fs36m24fwb`}>Frequently Asked Questions</div>
                    <div className="fs18m16fw500 doctorsAdFaqSubTitle">(FAQ’s)</div>
                </div>
                <div>
                    <div className="questionsAndAnswer">
                        {FaqArr.map((data, idx) => {
                            return (
                                <div key={idx} className="doctorsAdFaqWrapper">
                                    <div
                                        onClick={() => toggleAnswer(idx)}
                                        className="d-flex cursor-pointer align-items-center justify-content-between"
                                    >
                                        <div
                                            className="fs20m16fwb"
                                            style={showAnswer === idx ? { color: "#CB1B5B" } : {}}
                                        >
                                            {data.qus}
                                        </div>
                                        <div className="ps-2">
                                            <TfiAngleDown
                                                className={`doctorsAdFaqIcon ${showAnswer === idx ? 'rotate' : ''}`}
                                            />
                                        </div>
                                    </div>
                                    {showAnswer === idx && (
                                        <div className="doctorAdFaqAns fs16m14">
                                            {data.list && data.ans ? (
                                                <ul className="p-0">
                                                    {data.ans.split('\n').map((point, pointIdx) => (
                                                        <li key={pointIdx} className="list-unstyled">{point}</li>
                                                    ))}
                                                </ul>
                                            ) : data.ans ? data.ans : (
                                                "No Content For this"
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorsFAQ;