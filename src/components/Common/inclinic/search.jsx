

import apiCall from "../../../../src/api";
import { filteredData } from "../../../constants/filter";
import { MdOutlineChevronRight } from "react-icons/md";

export const handleLocationChange = (locationSearch, setCityOptions) => {
  (async () => {

    if (locationSearch.length > 2)
      try {
        const result = await apiCall(`doctor-cities/search`, "GET", {
          search: locationSearch,
          active: true
        })

        if (result?.data?.length) {
          const options = [];
          result.data.forEach((data) => {
            if (data?.locality) {
              options.push({
                value: data?.locality,
                type: 'locality',
                label: (
                  <div className="option-label align-items-start">
                    <span className="fs16">{data?.locality}</span>
                    <span className="label-right">{data?.city?.city}</span>
                  </div>
                ),
                slug: data.locality_slug,
              });
            } else {
              options.push({
                value: data?.city,
                type: 'city',
                label: (
                  <div className="option-label">
                    <span className="fs16">{data?.city}</span>
                    <span className="label-right">City</span>
                  </div>
                ),
                slug: data.slug_url,
              });
            }
          })
          setCityOptions(options)
        }
      } catch (err) {
        console.error(err);
      }
  })()
}

export const handleInputChange = (inputValue, setOptions, selectedCityOption ) => {
  (async () => {
    if (inputValue.length > 2) {
      try {
        const result = await apiCall(`partnered-doctor/inclinic-filter`, "POST", {
          search: inputValue,
          cityType: selectedCityOption?.type,
          citySlug: selectedCityOption?.slug
        })
        if (result?.data?.doctorRecords?.length) {
          const options = [];
          const doctorProfileOptions = [];
          result.data.doctorRecords.forEach((doctor) => {
            // doctor profile
            if (doctor?.doctor_name?.toLowerCase().includes(inputValue?.toLowerCase())) {
              doctorProfileOptions.push({
                value: doctor?.doctor_name,
                label: (
                  <div className="flexBetweenCenter">
                    <div className="doctor-option-label">
                      <span className="label-top fs16">{doctor?.doctor_name}</span>
                      <span className="fs12 specializationText">{doctor?.inclinic_primary_specialization?.inclinic_doctor_specialization}</span>
                    </div>
                    <MdOutlineChevronRight size={24} />
                  </div>
                ),
                // todo type need or not 
                slug: selectedCityOption?.type === "locality" ? `${doctor.city?.slug_url}/${doctor.clinic_location?.locality_slug}/${doctor.inclinic_primary_specialization?.inclinic_doctor_specialization_slug}/${doctor?.doctor_name_slug}` :
                 `${doctor.city?.slug_url}/${doctor.inclinic_primary_specialization?.inclinic_doctor_specialization_slug}/${doctor?.doctor_name_slug}`,
                // slug: `${doctor?.inclinic_primary_specialization?.doctorinclinic_doctor_specialization_slug}/${doctor.doctor_name_slug}`,
              });
            }
            // specialization
            if (doctor.inclinic_primary_specialization?.inclinic_doctor_specialization?.toLowerCase().includes(inputValue?.toLowerCase())) {
              options.push({
                value: doctor.inclinic_primary_specialization?.inclinic_doctor_specialization,
                type: 'specialization',
                label: (
                  <div className="option-label">
                    <span className="fs16">{doctor.inclinic_primary_specialization?.inclinic_doctor_specialization}</span>
                    <span className="label-right">Specialization</span>
                  </div>
                ),
                slug: selectedCityOption?.type === "locality" ? `${doctor.city?.slug_url}/${doctor.clinic_location?.locality_slug}/${doctor.
                  inclinic_primary_specialization
                  ?.inclinic_doctor_specialization_slug}?type=specialization` :
                  `${doctor.city?.slug_url}/${doctor.
                    inclinic_primary_specialization
                    ?.inclinic_doctor_specialization_slug}?type=specialization`,
              });
            }
            // Health Concern
            doctor.inclinic_health_concern?.forEach((hc) => {
              if (hc?.health_concern?.toLowerCase().includes(inputValue?.toLowerCase())) {
                options.push({
                  value: hc.health_concern,
                  type: 'health-concern',
                  label: (
                    <div className="option-label">
                      <span className="fs16">{hc.health_concern}</span>
                      <span className="label-right">Symptoms</span>
                    </div>
                  ),
                  // slug: hc.health_concern_slug,
                  slug: selectedCityOption?.type === "locality" ? `${doctor.city?.slug_url}/${doctor.clinic_location?.locality_slug}/${hc.health_concern_slug}?type=symptoms` :
                    `${doctor.city?.slug_url}/${hc.
                      health_concern_slug}?type=symptoms`,
                });
              }
            })

            return options;
          });

          const clinicProfileOptions = [];
          const clinicSpecialityOptions = [];
          const cliniServiceOptions = [];

          result.data.clinicProfileRecords.forEach((clinic) => {
            //  ClinicProfileOptions
            if (clinic?.clinic_name?.toLowerCase().includes(inputValue?.toLowerCase())) {
              clinicProfileOptions.push({
                value: clinic?.clinic_name,
                type: 'clinic-profile',
                label: (
                  <div className="flexBetweenCenter">
                    <div className="clinic-option-label">
                      <span className="label-top fs16">{clinic?.clinic_name}</span>
                      <span className="fs12 specializationText">{clinic?.clinic_location?.locality}</span>
                    </div>
                    <MdOutlineChevronRight size={24} />
                  </div>
                ),
                slug: `${clinic?.city?.slug_url}/${clinic.clinic_location.locality_slug}/${clinic.clinic_specialty_status.clinic_speciality_slug}/${clinic.clinic_name_slug}`,
              });
            }


            //  ClinicSpecialtyOptions
            if (clinic.clinic_specialty_status?.clinic_speciality?.toLowerCase().includes(inputValue?.toLowerCase())) {
              clinicSpecialityOptions.push({
                value: clinic.clinic_specialty_status.clinic_speciality,
                type: 'clinic-speciality',
                label: (
                  <div className="flexBetweenCenter">
                    <div className="clinic-option-label">
                      <span className="label-top fs16">{clinic.clinic_specialty_status.clinic_speciality}</span>
                    </div>
                    <MdOutlineChevronRight size={24} />
                  </div>
                ),
                // slug: clinic.inclinic_primary_specialization?.inclinic_doctor_specialization_slug,
              });
            }

            clinic?.services?.forEach((cs) => {
              if (cs?.service_name?.toLowerCase().includes(inputValue?.toLowerCase())) {
                cliniServiceOptions.push({
                  value: cs.service_name,
                  type: 'clinic-service',
                  label: (
                    <div className="option-label">
                      <span className="fs16">{cs.service_name}</span>
                      <span className="label-right">Symptoms</span>
                    </div>
                  ),
                  slug: cs.clinic_service_slug,
                });
              }
            })

            return options;
          });


          const filteredOptions = [
            ...filteredData([...options,

            // ...cliniServiceOptions
          ]),
            {
              label: "Doctors",
              slug: "data",
              backgroundColor: "#E9E9E9",
              options: filteredData(doctorProfileOptions)
            },
            // {
            //   label: "Clinics",
            //   slug: "data",
            //   backgroundColor: "#E9E9E9",
            //   options: filteredData(clinicProfileOptions)
            // },
            // {
            //   label: "Clinic Speciality",
            //   slug: "data",
            //   backgroundColor: "#E9E9E9",
            //   options: filteredData(clinicSpecialityOptions)
            // },
          ]
          setOptions(filteredOptions);
        }

      } catch (err) {
        console.error(err);
      }
    } else {
      setOptions([])
    }
  })()
};