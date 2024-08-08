const InputTextField = ({
    labelName = "",
    name = "",
    register,
    id = "",
    type = "text",
    errors,
    errorText = "",
    placeholder = "",
    isRequired = true,
    className = "",
    disable = false,
}) => {

    return (
        <>
            <label
                className="form-label"
                htmlFor={id}
            >
                {labelName} {isRequired ? <span className="star">*</span> : null}
            </label>
            <input
                className={`form-control ${className}`}
                type={type}
                name={name}
                id={id}
                {...register(name, { required: isRequired })}
                placeholder={placeholder}
                disabled={disable}
            />
            {errors[name] && (
                <div className={`invalid-feedback d-block`}>
                    {errorText}
                </div>
            )}
        </>
    )
}

export default InputTextField;