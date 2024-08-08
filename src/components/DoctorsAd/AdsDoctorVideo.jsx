import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Player from '@vimeo/player';

const playButton = "/assets/icons/play-button.svg";

const AdsDoctorVideo = ({ doctorAd = true, videoId = "" }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef(null);

    const handlePlayClick = () => {
        if (iframeRef.current) {
            const player = new Player(iframeRef.current);
            player.getPaused().then((paused) => {
                if (paused) {
                    player.play();
                    setIsPlaying(true);
                } else {
                    player.pause();
                    setIsPlaying(false);
                }
            });
        }
    };

    useEffect(() => {
        if (iframeRef.current) {
            const player = new Player(iframeRef.current);
            player.on("play", () => {
                setIsPlaying(true);
            });
            player.on("pause", () => {
                setIsPlaying(false);
            });
        }
    }, []);

    return (
        <div className="container adVideoSection">
            <div className="video-wrapper flexCenter">
                <iframe
                    ref={iframeRef}
                    src={`https://player.vimeo.com/video/${videoId}`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                >
                </iframe>
                <div className="play-button" onClick={handlePlayClick}>
                    {!isPlaying ?
                        <Image
                            src={playButton}
                            width={80}
                            height={80}
                            alt="play-button"
                            className="videoPlayBtn"
                        />
                        : null}
                </div>
            </div>
            {doctorAd && <div className="adLandingBannerRegisterBtn adLandingRegistration flexCenter">
                <a
                    href={`${process.env.NEXT_PUBLIC_WEB_URL}/ad-landing-page-partners-doctors/register`}
                >
                    <button className="btn fs16fwb primaryColor">Register Now</button>
                </a>
            </div>}
        </div>
    );
};

export default AdsDoctorVideo;