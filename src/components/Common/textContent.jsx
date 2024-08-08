const TextContent = ({
    title= "", 
    firstContent = "", 
    secondContent = "",
    className="fs48m24fwb textHeading",
}) => {
    return(
        <div className= {`textContentSection container`}>
            <div className={`${className}`}>{title}</div>
            <p className="fs24m16 firstContent">{firstContent}</p>
            <p className="fs24m16">{secondContent}</p>
        </div>
    )
}

export default TextContent;