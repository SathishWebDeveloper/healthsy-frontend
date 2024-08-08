import React from "react";
import Accordion from "react-bootstrap/Accordion";

function AccordionFaq({ faqs = [] }) {

  return (
    <>
      <Accordion defaultActiveKey="0">
        {faqs?.map((item, index) => {
          return (
            <Accordion.Item key={item.id} eventKey={`${index}`}>
              <Accordion.Header>
                  <h2 className="fs16fwb">
                    {item.question}
                  </h2>
                  </Accordion.Header>
              <Accordion.Body>
              <div 
                className="fs16"
                dangerouslySetInnerHTML={{ __html: item.answer }}
                ></div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
}

export default AccordionFaq;

