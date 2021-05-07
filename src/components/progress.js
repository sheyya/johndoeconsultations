import React from "react"


/**
 * Progress bar component in user dashboard
 * @param {object} props Passing progress bar color and completed value
 */
const ProgressBar = props => {
  const { bgcolor, completed } = props

  //Styles for container
  const containerStyles = {
    height: 20,
    width: "70%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 50,
  }

  //Styles for filler
  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    transition: "width 1s ease-in-out",
    borderRadius: "inherit",
    textAlign: "right",
    marginRight: "auto",
  }

  //Style for labels
  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  }

  //render progress bar
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  )
}

export default ProgressBar
