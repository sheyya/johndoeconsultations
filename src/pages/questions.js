import React, { useEffect, useState } from "react"
import "../assets/css/styles.css"
import Button from "@material-ui/core/Button"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import Qblock from "../components/qblock"
import { makeStyles } from "@material-ui/core/styles"
import QUp from "../images/qUp.svg"
import { ToastContainer, toast } from "react-toastify"
import QDown from "../images/qDown.svg"
import Head from "../components/Head/Head"
import "react-toastify/dist/ReactToastify.css"
import { navigate } from "gatsby"
import { Auth } from "aws-amplify"
import JSONData from "../../content/data.json"
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace"
import '@aws-amplify/ui/dist/style.css'
import { withAuthenticator } from "aws-amplify-react"

//add material ui styles
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))


const Questions = () => {

  //function to navigate users to admin dashboard if the authenticated user is an admin
  (async () => {
    const user = await Auth.currentAuthenticatedUser();

    // Returns an array of groups
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];

    //navigate to dashboard if user is in admin group
    if (groups == "Admin") {
      navigate("/admin-dashboard")
    }
  })();

  //state variable to store and set questions set stored in JSON file
  const [quiz, setQuiz] = useState([])

  //state varible use to keep track of the questions page
  const [sid, setSid] = useState(0)
  const [eid, setEid] = useState(1)

  //state variable to store the value of button
  const [btnName, setBtn] = useState("Next")

  //state varible to set and store the answers selected by user for each question
  const [q1answer, setq1Answer] = useState([])
  const [q2answer, setq2Answer] = useState([])
  const [q3answer, setq3Answer] = useState([])
  const [q4answer, setq4Answer] = useState([])
  const [q5answer, setq5Answer] = useState([])
  const [q6answer, setq6Answer] = useState([])
  const [q7answer, setq7Answer] = useState([])


  //temporory state variable to store if user select "None of the above" answers
  const [temp, setTemp] = useState(false)
  //temporory state variable to store if user select "We don’t test this" answers
  const [temp1, setTemp1] = useState(false)

  //state variable to check wheather user select an answer or not
  const [checkedq1, setCheckedq1] = useState(false)
  const [checkedq2, setCheckedq2] = useState(false)
  const [checkedq3, setCheckedq3] = useState(false)
  const [checkedq4, setCheckedq4] = useState(false)
  const [checkedq5, setCheckedq5] = useState(false)
  const [checkedq6, setCheckedq6] = useState(false)

  //state variable to store value of disabled answers
  const [disableq1, setdisableq1] = useState(false)
  const [disableq2, setdisableq2] = useState(false)
  const [disableq3, setdisableq3] = useState(false)

  //states to store checked value temporary
  const [q1chk1, setq1Chk1] = useState(false)
  const [q1chk2, setq1Chk2] = useState(false)
  const [q1chk3, setq1Chk3] = useState(false)
  const [q1chk4, setq1Chk4] = useState(false)
  const [q1chk5, setq1Chk5] = useState(false)
  const [q1chk6, setq1Chk6] = useState(false)

  const [q2chk1, setq2Chk1] = useState(false)
  const [q2chk2, setq2Chk2] = useState(false)
  const [q2chk3, setq2Chk3] = useState(false)
  const [q2chk4, setq2Chk4] = useState(false)
  const [q2chk5, setq2Chk5] = useState(false)

  const [q3chk1, setq3Chk1] = useState(false)
  const [q3chk2, setq3Chk2] = useState(false)
  const [q3chk3, setq3Chk3] = useState(false)

  const [q4chk1, setq4Chk1] = useState(false)
  const [q4chk2, setq4Chk2] = useState(false)
  const [q4chk3, setq4Chk3] = useState(false)
  const [q4chk4, setq4Chk4] = useState(false)

  const [q5chk1, setq5Chk1] = useState(false)
  const [q5chk2, setq5Chk2] = useState(false)
  const [q5chk3, setq5Chk3] = useState(false)
  const [q5chk4, setq5Chk4] = useState(false)

  const [q6chk1, setq6Chk1] = useState(false)
  const [q6chk2, setq6Chk2] = useState(false)
  const [q6chk3, setq6Chk3] = useState(false)
  const [q6chk4, setq6Chk4] = useState(false)

  const [q7chk1, setq7Chk1] = useState(false)
  const [q7chk2, setq7Chk2] = useState(false)
  const [q7chk3, setq7Chk3] = useState(false)
  const [q7chk4, setq7Chk4] = useState(false)


  //function to handle checkbox value on checking and unchecking answers
  const handleCheckbox = e => {
    if (sid < 4) {
      if (e.target.value === quiz.slice(sid, eid)[0].answers[0]) {
        setCheckedq1(old => !old)
      }
      if (e.target.value === quiz.slice(sid, eid)[0].answers[1]) {
        setCheckedq2(old => !old)
      }
      if (e.target.value === quiz.slice(sid, eid)[0].answers[2]) {
        setCheckedq3(old => !old)
      }
      if (e.target.value === quiz.slice(sid, eid)[0].answers[3]) {
        setCheckedq4(old => !old)
      }
      if (e.target.value === quiz.slice(sid, eid)[0].answers[4]) {
        setCheckedq5(old => !old)
      }
      if (e.target.value === quiz.slice(sid, eid)[0].answers[5]) {
        setCheckedq6(old => !old)
      }
    } else if (sid == 4) {
      setq5Answer(e.target.value)
      if (e.target.value === "Well-integrated") {
        setCheckedq1(old => !old)
        setCheckedq2(false)
        setCheckedq3(false)
        setCheckedq4(false)
      }
      if (e.target.value === "Somewhat integrated") {
        setCheckedq1(false)
        setCheckedq2(old => !old)
        setCheckedq3(false)
        setCheckedq4(false)
      }
      if (e.target.value === "Barely integrated") {
        setCheckedq1(false)
        setCheckedq2(false)
        setCheckedq3(old => !old)
        setCheckedq4(false)
      }
      if (e.target.value === "Not Sure") {
        setCheckedq1(false)
        setCheckedq2(false)
        setCheckedq3(false)
        setCheckedq4(old => !old)
      }
    } else if (sid == 5) {
      setq6Answer(e.target.value)
      if (e.target.value === "Less than 1 Year") {
        setCheckedq1(old => !old)
        setCheckedq2(false)
        setCheckedq3(false)
        setCheckedq4(false)
      }
      if (e.target.value === "1 Year - 5 Years") {
        setCheckedq1(false)
        setCheckedq2(old => !old)
        setCheckedq3(false)
        setCheckedq4(false)
      }
      if (e.target.value === "5 Years - 10 Years") {
        setCheckedq1(false)
        setCheckedq2(false)
        setCheckedq3(old => !old)
        setCheckedq4(false)
      }
      if (e.target.value === "More Than 10 Years") {
        setCheckedq1(false)
        setCheckedq2(false)
        setCheckedq3(false)
        setCheckedq4(old => !old)
      }
    } else if (sid == 6) {
      setq7Answer(e.target.value)
      if (e.target.value === "CEO / Owner / Investor") {
        setCheckedq1(old => !old)
        setCheckedq2(false)
        setCheckedq3(false)
        setCheckedq4(false)
      }
      if (e.target.value === "Manager") {
        setCheckedq1(false)
        setCheckedq2(old => !old)
        setCheckedq3(false)
        setCheckedq4(false)
      }
      if (e.target.value === "Non Managerial Employee") {
        setCheckedq1(false)
        setCheckedq2(false)
        setCheckedq3(old => !old)
        setCheckedq4(false)
      }
      if (e.target.value === "Student") {
        setCheckedq1(false)
        setCheckedq2(false)
        setCheckedq3(false)
        setCheckedq4(old => !old)
      }
    }
    let data
    //store answers for question 1
    if (sid === 0) {
      data = q1answer
      if (e.target.checked) {
        if (data.indexOf(e.target.value) === -1) {
          data.push(e.target.value)
        }
        setq1Answer(data)
      } else if (q1answer != null) {
        //remove answer from answers array if its unchecked
        setq1Answer(q1answer.filter(item => item !== e.target.value))
      }
    }
    //store answers for question 2
    if (sid === 1) {
      data = q2answer
      if (e.target.checked) {
        if (data.indexOf(e.target.value) === -1) {
          data.push(e.target.value)
        }
        setq2Answer(data)
      } else if (q2answer != null) {
        //remove answer from answers array if its unchecked
        setq2Answer(q2answer.filter(item => item !== e.target.value))
      }
    }
    //store answers for question 3
    if (sid === 2) {
      data = q3answer
      if (e.target.checked) {
        if (data.indexOf(e.target.value) === -1) {
          //remove other checked answers if user select "We don’t test this" option
          if (e.target.value === "We don’t test this") {
            setCheckedq1(false)
            setCheckedq2(false)
            setdisableq1(true)
            setdisableq2(true)
            setTemp1(true)
            data = []
            data.push(e.target.value)
          } else {
            data.push(e.target.value)
          }
        }
        setq3Answer(data)
        console.log(q3answer)
      } else if (q3answer != null) {
        //enable other checked answers if user unselect "We don’t test this" option
        if (q3answer[0] === "We don’t test this") {
          setdisableq1(false)
          setdisableq2(false)
          setTemp1(false)
        }
        //remove answer from answers array if its unchecked
        setq3Answer(q3answer.filter(item => item !== e.target.value))
      }
    }
    //store answers for question 4
    if (sid === 3) {
      data = q4answer
      if (e.target.checked) {
        if (data.indexOf(e.target.value) === -1) {
          //remove other checked answers if user select "None of the above" option
          if (e.target.value === "None of the above") {
            setCheckedq1(false)
            setCheckedq2(false)
            setCheckedq3(false)
            setdisableq1(true)
            setdisableq2(true)
            setdisableq3(true)
            setTemp(true)
            data = []
            data.push(e.target.value)
          } else {
            data.push(e.target.value)
          }
        }
        setq4Answer(data)
      } else if (q4answer != null) {
        //enable other checked answers if user unselect "None of the above" option
        if (q4answer[0] === "None of the above") {
          setdisableq1(false)
          setdisableq2(false)
          setdisableq3(false)
          setTemp(false)
        }
        //remove answer from answers array if its unchecked
        setq4Answer(q4answer.filter(item => item !== e.target.value))
      }
    }
  }

  //function to handle next button
  const nxtBtnClick = () => {
    let adata
    if (
      !checkedq1 &&
      !checkedq2 &&
      !checkedq3 &&
      !checkedq4 &&
      !checkedq5 &&
      !checkedq6
    ) {
      // toast "Please Select an answer" if user doesn't select an answer
      warntoast()
    } else {
      //store answers to adata variable for each question
      if (sid === 0) {
        setq1Chk1(checkedq1)
        setq1Chk2(checkedq2)
        setq1Chk3(checkedq3)
        setq1Chk4(checkedq4)
        setq1Chk5(checkedq5)
        setq1Chk6(checkedq6)
        adata = q1answer
      }
      if (sid === 1) {
        console.log('test3');
        setq2Chk1(checkedq1)
        setq2Chk2(checkedq2)
        setq2Chk3(checkedq3)
        setq2Chk4(checkedq4)
        setq2Chk5(checkedq5)
        adata = q2answer
      }
      if (sid === 2) {
        console.log('test4');
        setq3Chk1(checkedq1)
        setq3Chk2(checkedq2)
        setq3Chk3(checkedq3)
        adata = q3answer
        setdisableq1(false)
        setdisableq2(false)
      }
      if (sid === 3) {
        setq4Chk1(checkedq1)
        setq4Chk2(checkedq2)
        setq4Chk3(checkedq3)
        setq4Chk4(checkedq4)
        adata = q4answer
        setdisableq1(false)
        setdisableq2(false)
        setdisableq3(false)
      }
      if (sid === 4) {
        setq5Chk1(checkedq1)
        setq5Chk2(checkedq2)
        setq5Chk3(checkedq3)
        setq5Chk4(checkedq4)
        adata = q5answer
      }
      if (sid === 5) {
        setq6Chk1(checkedq1)
        setq6Chk2(checkedq2)
        setq6Chk3(checkedq3)
        setq6Chk4(checkedq4)
        adata = q6answer
        console.log(adata);

      }
      if (sid === 6) {
        setq7Chk1(checkedq1)
        setq7Chk2(checkedq2)
        setq7Chk3(checkedq3)
        setq7Chk4(checkedq4)
        adata = q7answer
        console.log(adata);

      }

      //get the current question number
      var data = sid
      var datan = data + 1

      if (typeof window !== "undefined") {

        //store answers for each question on localstorage
        localStorage.setItem(datan, adata)
      } else {
        //////console.log("we are running on the server")
      }

      //increment sid and eid values to keep track of question pages
      if (sid < 6 && eid < 7) {
        setEid(eid + 1)
        setSid(sid + 1)
      }
      //change next button text to finish if this is last question
      if (sid === 5) {
        setBtn("Finish")
      }
      //navigate to register page when click on finish button
      if (sid === 6) {
        navigate("/register")
      }

      //store currently selected answers state to variable in order to keep them selected when going back
      //and forth through questions
      if (datan + 1 === 1) {
        if (q1chk1 || q1chk2 || q1chk3 || q1chk4 || q1chk5 || q1chk6) {
          setCheckedq1(q1chk1)
          setCheckedq2(q1chk2)
          setCheckedq3(q1chk3)
          setCheckedq4(q1chk4)
          setCheckedq5(q1chk5)
          setCheckedq6(q1chk6)
        } else {
          setCheckedq1(false)
          setCheckedq2(false)
          setCheckedq3(false)
          setCheckedq4(false)
          setCheckedq5(false)
          setCheckedq6(false)
        }
      }

      if (datan + 1 === 2) {
        if (q2chk1 || q2chk2 || q2chk3 || q2chk4 || q2chk5) {
          setCheckedq1(q2chk1)
          setCheckedq2(q2chk2)
          setCheckedq3(q2chk3)
          setCheckedq4(q2chk4)
          setCheckedq5(q2chk5)
        } else {
          setCheckedq1(false)
          setCheckedq2(false)
          setCheckedq3(false)
          setCheckedq4(false)
          setCheckedq5(false)
          setCheckedq6(false)
        }
      }
      if (datan + 1 === 3) {
        if (q3chk1 || q3chk2 || q3chk3) {
          setCheckedq1(q3chk1)
          setCheckedq2(q3chk2)
          setCheckedq3(q3chk3)
          if (temp1) {
            setdisableq1(true)
            setdisableq2(true)
          }
          if (q3chk3) {
            setdisableq1(true)
            setdisableq2(true)
          }
        } else {
          setCheckedq1(false)
          setCheckedq2(false)
          setCheckedq3(false)
          setCheckedq4(false)
          setCheckedq5(false)
          setCheckedq6(false)
        }
      }
      if (datan + 1 === 4) {
        if (q4chk1 || q4chk2 || q4chk3 || q4chk4) {
          setCheckedq1(q4chk1)
          setCheckedq2(q4chk2)
          setCheckedq3(q4chk3)
          setCheckedq4(q4chk4)
          if (temp) {
            setdisableq1(true)
            setdisableq2(true)
            setdisableq3(true)
          }
          if (q4chk4) {
            setdisableq1(true)
            setdisableq2(true)
            setdisableq3(true)
          }
        } else {
          setCheckedq1(false)
          setCheckedq2(false)
          setCheckedq3(false)
          setCheckedq4(false)
          setCheckedq5(false)
          setCheckedq6(false)
        }
      }
      if (datan + 1 === 5) {
        if (q5chk1 || q5chk2 || q5chk3 || q5chk4) {
          setCheckedq1(q5chk1)
          setCheckedq2(q5chk2)
          setCheckedq3(q5chk3)
          setCheckedq4(q5chk4)
        } else {
          setCheckedq1(false)
          setCheckedq2(false)
          setCheckedq3(false)
          setCheckedq4(false)
          setCheckedq5(false)
          setCheckedq6(false)
        }
      }
      if (datan + 1 === 6) {
        if (q6chk1 || q6chk2 || q6chk3 || q6chk4) {
          setCheckedq1(q6chk1)
          setCheckedq2(q6chk2)
          setCheckedq3(q6chk3)
          setCheckedq4(q6chk4)
        } else {
          setCheckedq1(false)
          setCheckedq2(false)
          setCheckedq3(false)
          setCheckedq4(false)
          setCheckedq5(false)
          setCheckedq6(false)
        }
      }
      if (datan + 1 === 7) {
        if (q7chk1 || q7chk2 || q7chk3 || q7chk4) {
          setCheckedq1(q7chk1)
          setCheckedq2(q7chk2)
          setCheckedq3(q7chk3)
          setCheckedq4(q7chk4)
        } else {
          setCheckedq1(false)
          setCheckedq2(false)
          setCheckedq3(false)
          setCheckedq4(false)
          setCheckedq5(false)
          setCheckedq6(false)
        }
      }
    }
  }

  //function to toast warning message
  const warntoast = () => {
    toast.warn("Please select an answer!", {
      className: "custom-toast",
      draggable: "true",
      closeOnClick: "true",

      position: toast.POSITION.TOP_CENTER,
    })
  }

  //function to get json file with questions on first load
  useEffect(() => {
    getquiz()

  }, [])
  const getquiz = async () => {
    setQuiz(JSONData)
  }

  //implement material ui styles
  const classes = useStyles()

  return (
    <div>
      <Head />
      <img src={QUp} id="bgu" alt="" />
      <img src={QDown} id="bgd" alt="" />

      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100">
            <ToastContainer
              style={{ color: "black", fontWeight: "500", textAlign: "center" }}
            />
            <div className="col-lg-12 my-auto">
              {quiz.slice(sid, eid).map(quiz => (
                <Qblock
                  question={quiz.question}
                  answers={quiz.answers}
                  info={quiz.info}
                  handleCheckbox={handleCheckbox}
                  check1={checkedq1}
                  check2={checkedq2}
                  check3={checkedq3}
                  check4={checkedq4}
                  check5={checkedq5}
                  check6={checkedq6}
                  disable1={disableq1}
                  disable2={disableq2}
                  disable3={disableq3}
                />
              ))}
              <div className="nxtButton" style={{ marginBottom: "20px" }}>
                <Button
                  variant="contained"
                  className={classes.margin}
                  disableElevation
                  style={{ backgroundColor: "#EA745Bt", color: "#000000" }}
                  startIcon={<KeyboardBackspaceIcon />}
                  onClick={() => {
                    if (sid === 1) {
                      setCheckedq1(q1chk1)
                      setCheckedq2(q1chk2)
                      setCheckedq3(q1chk3)
                      setCheckedq4(q1chk4)
                      setCheckedq5(q1chk5)
                      setCheckedq6(q1chk6)
                    }
                    if (sid === 2) {
                      setCheckedq1(q2chk1)
                      setCheckedq2(q2chk2)
                      setCheckedq3(q2chk3)
                      setCheckedq4(q2chk4)
                      setCheckedq5(q2chk5)
                      setdisableq1(false)
                      setdisableq2(false)
                    }
                    if (sid === 3) {
                      setdisableq1(false)
                      setdisableq2(false)
                      setdisableq3(false)
                      setCheckedq1(q3chk1)
                      setCheckedq2(q3chk2)
                      setCheckedq3(q3chk3)
                      if (temp1) {
                        setdisableq1(true)
                        setdisableq2(true)
                      }
                      if (q3chk3) {
                        setdisableq1(true)
                        setdisableq2(true)
                      }
                    }
                    if (sid === 4) {
                      setCheckedq1(q4chk1)
                      setCheckedq2(q4chk2)
                      setCheckedq3(q4chk3)
                      setCheckedq4(q4chk4)
                      if (temp) {
                        setdisableq1(true)
                        setdisableq2(true)
                        setdisableq3(true)
                      }
                      if (q4chk4) {
                        setdisableq1(true)
                        setdisableq2(true)
                        setdisableq3(true)
                      }
                    }
                    if (sid === 5) {
                      setCheckedq1(q5chk1)
                      setCheckedq2(q5chk2)
                      setCheckedq3(q5chk3)
                      setCheckedq4(q5chk4)
                    }
                    if (sid === 6) {
                      setCheckedq1(q6chk1)
                      setCheckedq2(q6chk2)
                      setCheckedq3(q6chk3)
                      setCheckedq4(q6chk4)
                    }
                    if (sid === 7) {
                      setCheckedq1(q7chk1)
                      setCheckedq2(q7chk2)
                      setCheckedq3(q7chk3)
                      setCheckedq4(q7chk4)
                    }
                    console.log(sid);

                    if (sid < 7 && eid < 8) {
                      setEid(eid - 1)
                      setSid(sid - 1)
                    }
                    if (sid === 0) {
                      navigate("/")
                    }
                    if (sid < 7) {

                      setBtn("Next")
                    }

                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#EA745B", color: "#ffffff" }}
                  startIcon={<KeyboardArrowRightIcon />}
                  onClick={() => {
                    nxtBtnClick()
                    ////////console.log(eid, sid)
                  }}
                >
                  {btnName}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default withAuthenticator(Questions, {
  usernameAttributes: 'email',
  signUpConfig: {
    signUpFields: [{ key: 'name', label: 'Name', required: true }]
  }
})
