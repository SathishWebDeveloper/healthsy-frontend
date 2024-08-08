const closeIcon = "/assets/home-sidebar-close.svg";

const AppLinkSuccess = ({ setLinkSentModal }) => {

    setTimeout(() => {
        setLinkSentModal(false);
    }, 4000);

    return (
        <div className="position-fixed w-100 appLinkSuccessWrapper">
            <div className=" appLinkSuccess container d-flex justify-content-between p-3">
                <div className="primaryColor fs16 sendLinkMsg">Message Sent Successfully. Find the App Download Link in the SMS!</div>
                <div className="cursor-pointer ps-4">
                    <img src={closeIcon} onClick={() => setLinkSentModal(false)}></img>
                </div>
            </div>
        </div>
    );
};

export default AppLinkSuccess;