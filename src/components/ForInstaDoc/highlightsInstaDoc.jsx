import Image from "next/image";

const tick = "/assets/ticks.svg";
const instaDocHighlight = "/assets/instaDoc/insta-doc-highlight.webp"

const highlightsData = [
  "Manage your check-in and check-out metrics",
  "Doctor-friendly digital prescription generator",
  "Consult with patients online via audio, video and chat",
];

const HighlightsInstaDoc = () => {
  return (
    <div className="container highlightsInstaDoc">
      <div className="fs48m28fwb text-center highlightsInstaDocTitle">
        {<>Highlights of <h2 className="primaryColor fs48m28fwb d-inline">‘InstaDoc’</h2> App </>}
      </div>
      <div className="flexCenter highlightInstaDocContent">
        <Image
          src={instaDocHighlight}
          width={560}
          height={467}
          className="highlightsImage"
          alt="highlights"
        />
        <div className="highlightTextContent">
          {highlightsData.map((val, inx) => (
            <div className="d-flex align-items-center highlightList" key={inx}>
              <Image
                src={tick}
                alt="tick"
                width={22}
                height={22}
                className="tickImage"
              />
              <h2 className="highlightPoint fs30m16">{val}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightsInstaDoc;
