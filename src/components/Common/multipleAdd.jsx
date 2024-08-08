
import Image from "next/image";
import React from "react";
const addImage = "/assets/add_img.svg"

const MultipleAdd = ({
    register,
    errors,
    organisation,
    setOrganisation,
    name = ""
}) => {
    const addorganisation = () => {
        setOrganisation([
            ...organisation,
            {
                [`organisation${organisation.length}`]: "",
                id: organisation.length,
            },
        ]);
    };

    const onUpdateOrganisation = (evt, id) => {
        const list = [...organisation];
        const index = list.findIndex((item) => item.id === id);
        if (index === -1) return false;

        list[index][evt.target.name] = evt.target.value;
        setOrganisation(list);
    };

    const removeOrganisation = (id) => {
        const list = [...organisation];
        if (list.length === 1) return false;

        const index = list.findIndex((item) => item.id === id);
        if (index === -1) return false;

        list.splice(index, 1);
        setOrganisation(list);
    };

    return (
        <div className="col-9 degreeFieldLabel">
            <div className="d-flex justify-content-between">
                <label className="form-label">
                    Organisation Worked In{" "}
                </label>{" "}
                <span
                    onClick={() => addorganisation()}
                    className="addPlusIcon text-end primaryColor"
                    style={{
                        marginLeft: "0px",
                        cursor: "pointer",
                    }}
                >
                    {/* <img src={addIcon} className='mob-plus-icon' alt="Add"></img> */}
                    <Image src={addImage} width={16} height={16} alt={addImage} className="addDoctorPlusImg me-2" />
                    Add More
                </span>
            </div>
            <div
                style={{
                    // marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "24px",
                }}
            >
                {organisation.map((item, idx) => (
                    <div
                        key={`input-education-${item.id}`}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            columnGap: "24px",
                        }}
                    >
                        <div
                            style={{ flexGrow: "1", flexShrink: "0" }}
                        >
                            <input
                                type="text"
                                style={{ width: "100%" }}
                                {...register(`${name}${item.id}`, {
                                    required: false,
                                })}
                                placeholder="Type here"
                                defaultValue={item.value || null}
                                onInput={(evt) =>
                                    onUpdateOrganisation(evt, item.id)
                                }
                                className="form-control healthsynergyFormInput"
                            // autoFocus
                            />
                            {errors[`ogranisation${item.id}`] && (
                                <div
                                    className={`invalid-feedback d-block`}
                                >
                                    Please provide a ogranisation
                                </div>
                            )}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                columnGap: "12px",
                            }}
                        >
                            {organisation.length > 1 ? (
                                <span
                                    onClick={() => removeOrganisation(item.id)}
                                    className="plus-icon"
                                    style={{
                                        marginLeft: "0px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            height: "2px",
                                            width: "50%",
                                            backgroundColor: "#fff",
                                        }}
                                    ></span>
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MultipleAdd