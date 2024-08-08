import Image from "next/image";
const stepsImage = "/assets/register_steps.webp";
const stepsMobImage = "/assets/register_steps_mob.webp";

const FormLandingSteps = ({
  title = "Simple & Hassle free registration",
  desc = "On-boarding process made simple",
  registerLink = "",
  getStartedLink = "",
}) => {
  return (
    <div id={getStartedLink} className="formLandingSteps bg-primary">
      <div className="container">
        <div className="formStepsTitle text-center text-white">{title}</div>
        <div className="formStepsDesc text-center text-white">{desc}</div>
        <div className="stepsImgWrapper">
          <Image
            src={stepsImage}
            fill
            quality={100}
            alt="Steps Image"
            className="desktopContent"
          />
          <Image
            src={stepsMobImage}
            fill
            quality={100}
            className="mobContent"
            alt="Steps Image"
          />
        </div>
        <div className="text-center">
          <div className="stepQn text-white">Are you interested to get onboarded ?</div>
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${registerLink}`}>
            <button className="formRegisterNowBtn">Register Now</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormLandingSteps;
