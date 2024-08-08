import { useState } from "react";
import "react-multiple-select-dropdown-lite/dist/index.css";

const arrow = "/assets/arrow_lang.svg";

const HealthConditionField = ({ conditions, register, errors, setValue, getValues, trigger }) => {
  const [langtext, setLangText] = useState(getValues()?.health_conditions || []);
  const [AppliedLang, setAppliedLang] = useState(getValues()?.health_conditions);
  const [lang, setLang] = useState(false);
  const [langtextcolor, setLangTextColor] = useState(false);

  const selectLanguage = (name, id) => {
    let langSelected = langtext;
    if (!Array.isArray(langSelected)) {
      langSelected = [{ [`health_conditions.${id}`]: name, value: name }];
      setLangText(langSelected);
      return;
    }

    const index = langSelected.findIndex(
      (i) => i[`health_conditions.${id}`] === name
    );
    index !== -1
      ? langSelected.splice(index, 1)
      : langSelected.push({ [`health_conditions.${id}`]: name, value: name });
    if (langSelected?.length) {
      setLangText([...langSelected]);
    }
  };

  const ApplyLang = () => {
    setLang(false);
    setAppliedLang([...langtext]);
    setValue("health_conditions", langtext?.length ? [...langtext] : "")
    setLangTextColor(false)
    trigger()
  }

  const clearAllHealthConditions = () => {
    setLangText([])
  }

  return (
    <div className="col-12  healthConditionSection">
      <div
        className="position-relative"
        onClick={() => {
          setLang(!lang);
        }}
      >
        <input
          className="dynamic-languages border-0"
          type=""
          disabled={true}
          onChange={() => { }}
          placeholder="Select Health Condition"
          value={AppliedLang ? `${AppliedLang?.map((i) => i.value).slice(0, 4)
            .join(", ")}${AppliedLang.length - 4 >= 1
              ? ` and ${AppliedLang.length - 4} more` : ""}` : ""}
        />
        <div className="position-absolute inlineArrow">
          <img src={arrow} alt="arrow" />
        </div>
      </div>

      <div
        className="dynamic-languages-dropdown"
        style={{ display: lang ? "block" : "none" }}
      >
        {lang &&
          conditions && conditions?.map((el, list) => {
            return (
              <div
                key={list}
                className="dynamic-languages-dropdown-container flexCenter"
              >
                <div className="dynamic-languages-dropdown-input healthConditionCheckBox">
                  <input
                    className="dynamic-languages-dropdown-radio"
                    type="checkbox"
                    value={el.health_condition}

                    checked={langtext && langtext?.map((data) => data.value).includes(el.health_condition)}
                    // defaultChecked={sel}
                    onChange={(e) => selectLanguage(el.health_condition, el._id)}
                    onClick={() => setLangTextColor(true)}
                  />
                </div>
                <div className="dynamic-languages-dropdown-text">
                  {el.health_condition}
                </div>
              </div>
            );
          })}
        <div
          className="dynamic-languages-apply"
          style={{
            color: langtextcolor ? "#CB1B5B" : "",
          }}
        >
          <div className="d-flex">
            <button className="btn healthConditionFieldBtn flexCenter" onClick={() => clearAllHealthConditions()}>Clear all</button>
            <button className="btn healthConditionFieldBtn applyBtn flexCenter" onClick={() => ApplyLang()}>Apply</button>
          </div>
        </div>
      </div>
      {!AppliedLang?.length && errors.health_conditions && (
        <div className={`invalid-feedback d-block`}>
          Please provide a Health Conditions
        </div>
      )}
    </div>
  )
}

export default HealthConditionField;  