
import { useState } from "react";
import "react-multiple-select-dropdown-lite/dist/index.css";

const arrow = "/assets/arrow_lang.svg";

const LanguageField = ({
  language,
  register,
  errors,
  setValue,
  getValues,
  trigger,
  labelTxt = "Languages Known",
  registerContent = "languages_known",
  placeholder = "Select your known languages",
  multiSelectClassName = "dynamic-languages",
  multiSelectWrapperClassName = "col-md-6",
  labelClassName = "",
  validation = "known Languages",
  arrowPosition = "inlineArrow",
  lastField = false,
}) => {
  const [langtext, setLangText] = useState(getValues()?.[registerContent]);
  const [AppliedLang, setAppliedLang] = useState(getValues()?.[registerContent]);
  const [lang, setLang] = useState(false);
  const [langtextcolor, setLangTextColor] = useState(false);

  const selectLanguage = (name, id) => {
    let langSelected = langtext;
    if (!Array.isArray(langSelected)) {
      langSelected = [{ [`${registerContent}.${id}`]: name, value: name }];
      setLangText(langSelected);
      return;
    }

    const index = langSelected.findIndex(
      (i) => i[`${registerContent}.${id}`] === name
    );
    index !== -1
      ? langSelected.splice(index, 1)
      : langSelected.push({ [`${registerContent}.${id}`]: name, value: name });
    if (langSelected?.length) {
      setLangText([...langSelected]);
    }
  };

  const ApplyLang = () => {
    setLang(false);
    setAppliedLang([...langtext]);
    setValue(registerContent, langtext?.length ? [...langtext] : "")
    setLangTextColor(false)
    lastField && trigger()
  }

  return (
    <div className={`col-12 ${multiSelectWrapperClassName} mb-40 position-relative`}>
      <label className={`form-label ${labelClassName}`}>
        {labelTxt} <span className="star">*</span>
      </label>
      <div
        className="position-relative"
        onClick={() => {
          setLang(!lang);
        }}
      >
        <input
          className={`${multiSelectClassName} border-0 form-control`}
          type=""
          // disabled={true}
          onChange={() => { }}
          placeholder={placeholder}
          value={AppliedLang ? `${AppliedLang?.map((i) => i.value).slice(0, 4)
            .join(", ")}${AppliedLang.length - 4 >= 1
              ? ` and ${AppliedLang.length - 4} more` : ""}` : ""}
        />
        <div className={`position-absolute ${arrowPosition}`}>
          <img src={arrow} alt="arrow" />
        </div>
      </div>

      <div
        className="dynamic-languages-dropdown"
        style={{ display: lang ? "block" : "none" }}
      >
        {lang &&
          language.map((el) => {
            if (el.active === true) {
              return (
                <div
                  key={el._id}
                  className="dynamic-languages-dropdown-container"
                >
                  <div className="dynamic-languages-dropdown-text">
                    {el.type}
                  </div>
                  <div className="dynamic-languages-dropdown-input checkbox-wrapper">
                    <input
                      className="dynamic-languages-dropdown-radio"
                      type="checkbox"
                      value={el.type}

                      checked={langtext && langtext?.map((data) => data.value).includes(el.type)}
                      // defaultChecked={sel}
                      onChange={(e) => selectLanguage(el.type, el._id)}
                      onClick={() => setLangTextColor(true)}
                    />
                  </div>
                </div>
              );
            }
          })}
        <div
          className="dynamic-languages-apply"
          style={{
            color: langtextcolor ? "#CB1B5B" : "",
          }}
        >
          <div
            onClick={() => ApplyLang()}
          >
            Apply
          </div>
        </div>
      </div>
      {!AppliedLang?.length && errors[registerContent] && (
        <div className={`invalid-feedback d-block`}>
          Please provide a {validation}
        </div>
      )}
    </div>
  )
}

export default LanguageField