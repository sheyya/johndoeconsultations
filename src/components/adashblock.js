import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import HelpIcon from "@material-ui/icons/Help"
import React from "react"

//Component to get correct/wrong answers and set value for the progress bar in dashboard
//passing answers, correct answer, and function to calculate progress value
const Adashblock = ({ answers, correctA, completed }) => {
  var Icon
  var sid = correctA.indexOf(answers)
  var eid = sid + 1
  var crr = correctA.slice(sid, eid)
  if (answers === crr.toString()) {
    Icon = "correct"
    //since there are 7 correct answers each answer getting 14 marks
    completed && completed(14)
  } else {
    Icon = "incorrect"
  }


  const icondisplay = () => {
    if (Icon === "correct") {
      return <CheckCircleIcon style={{ color: "#1abc9c" }} />
    }
    if (Icon === "incorrect") {
      return <ErrorIcon style={{ color: "#f1c40f" }} />
    }
  }
  return (
    <div
      className="answers"
    >
      <div className="icon my-auto">{icondisplay()}</div>
      <p className="my-auto" style={{ fontSize: "13px", fontWeight: "400" }}>
        {answers}
      </p>
    </div>
  )
}

export default Adashblock
