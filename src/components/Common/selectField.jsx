import { useMemo } from "react";

const SelectField = ({
	labelName = "",
	name = "",
	register,
	id = "",
	errors,
	errorText = "",
	isRequired = true,
	defaultValue = "",
	options = [],
	defaultOption = "",
	className = "",
	isOptionObject = false,
	selectedDataId = ""
}) => {

	const memoizedOptions = useMemo(() => {
		return isOptionObject
			? options.filter(({ active = null, value }) => active === null || active || selectedDataId === value)
			: options
	}, [options])

	return (
		<>
			<label
				className="form-label title mb-2"
				htmlFor={id}
			>
				{labelName} {isRequired ? <span className="star">*</span> : null}
			</label>
			<select
				{...register(name, { required: isRequired })}
				className={`${className} form-control`}
				style={{ height: "50px" }}
				defaultValue={defaultValue}
			>
				<option value="" disabled pri-specialization="true">
					Select {defaultOption}
				</option>
				{memoizedOptions.map((data, idx) => {
					return (
						<option key={idx} value={isOptionObject ? data?.value : data}>
							{isOptionObject ? data?.label : data}
						</option>
					);
				})}
			</select>
			{errors[name] && (
				<div className={`invalid-feedback d-block`}>
					{errorText}
				</div>
			)}
		</>
	)
}

export default SelectField;