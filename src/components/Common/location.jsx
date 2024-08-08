
import { Controller } from "react-hook-form";
import Autocomplete from "react-google-autocomplete";

const Location = ({
    control,
    errors,
    register,
    className = "newlocation",
    newLocation,
    placeholder = "Type your City / Town",
    errMsg = "Please provide a valid location",
    setNewLocation = () => { },
    registerContent="location"
}) => {
    return (<>
        <Controller
            control={control}
            name={registerContent}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
                <Autocomplete
                    apiKey={"AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc"}
                    value={field.value}
                    onChange={(event) => {
                        field.onChange(event.target.value)
                        if (newLocation) {
                            setNewLocation("")
                        }
                    }
                    }
                    onPlaceSelected={(place) => {
                        field.onChange(place ? place.formatted_address : "")
                        setNewLocation(place.formatted_address)
                    }}
                    types={["address"]}
                    className={`form-control ${className}`}
                    // value={register("location").value}
                    defaultValue={register(registerContent).value || ""} // Set the default value from register
                    placeholder={placeholder}
                    componentrestrictions={{ country: "us" }}
                    preventdefault="true"
                />
            )}
        />
        {errors[registerContent] && (
            <div className={`invalid-feedback d-block`}>
                {errMsg}
            </div>
        )}
    </>)

}

export default Location