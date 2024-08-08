import { memo } from "react";

const linkedinIcon = "/assets/aboutUs/linkedin-icon.png"

const AboutTeamMembers = ({ employee }) => {
	const getsrcValue = (value) => {
		if (typeof value === "string" && value.length)
			return process.env.NEXT_PUBLIC_APP_API_URL + "insider-images/" + value;
	};

	return (
		<>
			<div className="container aboutTeamMembersSection">
				<div className="aboutTeamMembersTitle text-center">
					<h3>Meet our fellow <span>Founding Members</span></h3>
					<p>Get to know some of our talented members behind HealthSy!</p>
				</div>
				<div className="row">
					{employee?.map((data) => {
						return (
							<div className="col-6 col-sm-6 col-md-3">
								<div className="teamimg-section">
									<img
										src={getsrcValue(data.insiderImage)}
										className="img-fluid team-img"
										alt="Bharathram" />
									<h6>{data.name}</h6>
									<div className="d-flex team-mob-align">
										<p>{data.designation}</p>
										<div className="ms-auto">
											<a href={data.linkedin} target="_blank">
												<img
													src={linkedinIcon}
													className="img-fluid li-icon"
													alt="linkedinIcon" />
											</a>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</>
	);
};

export default memo(AboutTeamMembers);