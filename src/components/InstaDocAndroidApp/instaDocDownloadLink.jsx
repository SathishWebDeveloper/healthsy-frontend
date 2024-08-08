import Image from "next/image"
const downloadIcon = "/assets/instadoc-android-app/download-circular-button.png"
const downloadAPK = "/assets/apk/instadoc.apk"

const InstaDocDownloadLink = () => {
    return (
        <>
            <div className="instaDocDownloadLinkSection">
                <div className="downloadLinkText">Connect with Patients now!</div>
                <div className="downloadLink">
                    <a class="btn btn-downloadLink bg-primary" href={downloadAPK} download>
                        <span className="pr16"> Download the app </span>
                        <span><Image src={downloadIcon} height={18} width={18} alt="Download Icon" /></span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default InstaDocDownloadLink