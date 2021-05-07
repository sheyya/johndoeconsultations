import Checkbox from "@material-ui/core/Checkbox"
import Radio from "@material-ui/core/Radio"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControl from "@material-ui/core/FormControl"
import React from "react"


/**
 * Question block component of the website
 * Passing necessary values to the question block question, answers and info to render.
 * show varible use to show radio buttons or checkboxes
 * check 1-6 store check box value status
 * disable 1-3 store whether to disable answers
 * @param {object} param0 
 */
const Qblock = ({
  question,
  answers,
  info,
  handleCheckbox,
  show,
  check1,
  check2,
  check3,
  check4,
  check5,
  check6,
  disable1,
  disable2,
  disable3,
}) => {

  var checkq = [check1, check2, check3, check4, check5, check6]
  var disableq = [disable1, disable2, disable3]

  var i = -1
  var j = 0
  const infoPrint = () => {

    if (info[1]) {
      return <h5 className="info-choose">{info[1]}</h5>
    }
  }
  var radioValue

  return (
    <div>
      <div className="qblockQ">
        <h2>{question}</h2>
        <h4 className="info">{info[0]}</h4>
        {infoPrint()}
      </div>
      <div className="answers">
        <FormControl component="fieldset">
          {!show && (
            <RadioGroup
              aria-label="role"
              name="role1"
              value={radioValue}
              onChange={e => handleCheckbox(e)}
            >
              {answers.map(answer => {
                var check = checkq[j]
                i += 1
                j += 1
                return (
                  <FormControlLabel
                    value={answers.slice(i, j)}
                    checked={check}
                    control={<Radio color="primary" />}
                    label={answers.slice(i, j)}
                    labelPlacement="end"
                  />
                )
              })}
            </RadioGroup>
          )}
          {show && (
            <FormGroup aria-label="position" root>
              {answers.map(answer => {
                var check = checkq[j]
                var disable = disableq[j]
                i += 1
                j += 1
                return (
                  <FormControlLabel
                    value={answers.slice(i, j)}
                    checked={check}
                    disabled={disable}
                    onChange={e => handleCheckbox(e)}
                    control={<Checkbox color="primary" />}
                    label={answers.slice(i, j)}
                    labelPlacement="end"
                  />
                )
              })}

            </FormGroup>
          )}
        </FormControl>
      </div>
    </div>
  )
}

export default Qblock
