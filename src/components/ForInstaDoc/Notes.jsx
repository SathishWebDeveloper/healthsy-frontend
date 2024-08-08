const Note = () => {
    return (
        <div className="NoteSection container">
            <div className="text-left NoteWrapper flexCenter">
                <span className="primaryColor fs24m18fwb">Note</span>
            </div>
            <div className="fs20m16fw500 firstNote">Doctors from <b>‘General Physician’</b> specialisation can only get onboarded for InstaDoc App currently. Doctors from other specialisations can refer to this page. <a className="ClickHere p-0" href="/for-doctors">Click here</a></div>
            <div className="fs20m16fw500 secondNote">InstaDoc is built for providing medical advices to patients through our partnered doctors from <b>9 PM - 9 AM</b>. It is strictly not for emergency use. </div>
        </div>
    )
}

export default Note;