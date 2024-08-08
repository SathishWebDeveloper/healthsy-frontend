import { useState, useEffect } from "react";
import { RiAddLine } from "react-icons/ri";
import { BiMinus } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";

const FAQ = ({ pageName, section, className="", isStatic=false,staticData }) => {

  const [showAnswer, setShowAnswer] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [faqQuestionsAndAnswer, setFaqQuestionsAndAnswer] = useState(isStatic?staticData:[])
  const displayedArray = showAll ? faqQuestionsAndAnswer : faqQuestionsAndAnswer?.slice(0, 5);

  useEffect(() => {
    if (section)
      getFaqquestionAndAnswers()
  }, [section])

  const getFaqquestionAndAnswers = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}faq/list`, { section })
      .then((response) => {
        setFaqQuestionsAndAnswer(response?.data?.rows)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className={`${className} faqContainer`}>
      <div className="faqContentWrapper container ">
        <div className="faqOverView text-center pt-5 mb-0 pb-4">
          <div className="faqTitle text-start mb-4 d-flex pt-5  ">
            Frequently Asked Questions
            {/* <div>
              <img src={faqIcon} className="faqIcon" alt='FAQ icon'/>
            </div> */}
          </div>
          <div className="faqDesc text-start">
            Everything you need to know about {pageName} &
            how it works.
          </div>
        </div>
        <div className="questionsAndAnswer">
          {displayedArray && displayedArray.map((data, idx) => {
            return (
              <div
                key={idx}
                className="questionWrapper"
              >
                <div
                  key={idx}
                  onClick={() => setShowAnswer(showAnswer === idx ? '' : idx)}
                  className="d-flex cursor-pointer align-items-center justify-content-between "
                >
                  <div
                    className="faqQuestion fs22m16fw600"
                    style={showAnswer === idx ? { color: "#CB1B5B" } : {}}
                  >
                    {data.question}
                  </div>
                  <div className="ps-2">
                    {showAnswer !== idx ? (
                      <RiAddLine
                        color="#CB1B5B"
                        size={"24px"}
                        cursor="pointer"
                      />
                    ) : (
                      <BiMinus
                        color="#CB1B5B"
                        size={"24px"}
                        cursor="pointer"
                      />
                    )}
                  </div>
                </div>
                {showAnswer === idx && (
                  <div className="pt-3 faqAnswer">
                    {data.answer ? data.answer : "No Content For this"}
                  </div>
                )}
              </div>
            );
          })}
          {
            faqQuestionsAndAnswer?.length > 1 ?
              <div className="viewAll mt-5 " onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Hide' : 'View all'} <BsArrowRightShort color="#CB1B5B" size={"24px"} />
              </div>
              : null}
        </div>
      </div>
    </div>
  );
};

export default FAQ;