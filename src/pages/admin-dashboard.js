import React, { useEffect, useState } from "react"
import "../assets/css/styles.css"
import Navigate from "../components/headernav"
import Button from "@material-ui/core/Button"
import { withAuthenticator } from "aws-amplify-react"
import { Auth } from "aws-amplify"
import Chart from "react-apexcharts";
import { Modal, Row, Col } from 'react-bootstrap'
import Adashblock from "../components/adashblock"


const adminDash = () => {

  //Correct answers for questions
  let q1A = ["We are not concerned about employees leaving"]
  let q2A = ["They are sharing information perfectly"]
  let q3A = [
    "By enforcing vacations where the employee can’t communicate with the company",
    "By moving employees to a different location where employee can communicate with company",
  ]
  let q4A = [
    "We train and motivate employees to share information",
    "We have processes and systems to share information",
    "We make knowledge sharing a part of the annual/quarterly evaluation process",
  ]

  //state variable to store and set user data from dynamoDB API call
  const [Arraydata, setArraydata] = useState([])
  //state variable to store and set bar chart data
  const [chartData, setChartData] = useState([])
  //state variable to store and set pie chart data
  const [PieData, setPieData] = useState([])
  //state variable to store and set average score
  const [AverageScore, setAverageScore] = useState([])
  //state variable to store and set total clients
  const [TotalClient, setTotalClient] = useState(0)
  //state variable to show/hide modal
  const [show, setShow] = useState(false);
  //state variable to store data for modal
  const [modalData, setModalData] = useState({
    dataName: '', //state property to hold name
    dataEmail: '', //state property to hold email
    dataPhone: '', //state property to hold phone
    dataQuestions: [], //state property to hold questions
    dataAnswers: [] //state property to hold answers
  })

  //functions to handle show/hide modal and pass values to it
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true)
    setModalData({
      dataName: data.name,
      dataEmail: data.email,
      dataPhone: data.phone,
      dataQuestions: data.config.questions
    })
    console.log(modalData);

  };

  //state variable to store options for bar chart
  const [bLifetimeBarChart, setBLifetimeBarChart] = useState({
    series: [{
      data: []
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['<1', '1 - 5', '5 - 10', '> 10'],
      }
    },
  })

  //state variable to store options for pie chart
  const [bLifetimePieChart, setBLifetimePieChart] = useState({
    options: {
      labels: ['CEO / Owner / Investor', 'Manager', 'Non Managerial Employee', 'Student']
    },
    series: [],

  })

  //get the current user details when page loads from amplify
  useEffect(() => {
    (async () => {
      //get current user object
      const user = await Auth.currentAuthenticatedUser();

      // Returns an array of groups
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
      //check whearther the authinticated user is an "Admin"
      if (groups == "Admin") {
        setAdmin(true)
      }
    })();
  }, [])


  //state variable to store and set Admin status
  var [isAdmin, setAdmin] = useState(false)

  //function to call API and get data if the user is an Admin
  useEffect(() => {
    if (isAdmin || !isAdmin || isAdmin == undefined) {
      const axios = require("axios")

      //API call to dynamoDB and get data
      axios
        .get(
          "https://63n876u8g1.execute-api.ap-south-1.amazonaws.com/dev/userdata/"
        )
        .then(response => {
          //store response data on arraydata2
          var arraydata2 = response.data
          //get total client count
          var totClient = arraydata2.length
          //get average score
          var avgtot = 0
          arraydata2.map(data => {
            avgtot += data.config.score
          })
          var avgScore = avgtot / totClient

          //set average, total clients and user data
          setAverageScore(avgScore.toFixed(1))
          setTotalClient(totClient)
          setArraydata(arraydata2)
          console.log(arraydata2);

          //set data for bar chart
          var chartData2 = arraydata2.reduce((acc, current) => {
            if (current.config.questions.q6 == "Less than 1 Year") {
              acc[0]++
            }
            if (current.config.questions.q6 == "1 Year - 5 Years") {
              acc[1]++
            }
            if (current.config.questions.q6 == "5 Years - 10 Years") {
              acc[2]++
            }
            if (current.config.questions.q6 == "More Than 10 Years") {
              acc[3]++
            }
            return acc;
          }, [0, 0, 0, 0])
          setChartData(chartData2);

          //set data for pie chart
          var PieData2 = arraydata2.reduce((acc, current) => {
            if (current.config.questions.q7 == "CEO / Owner / Investor") {
              acc[0]++
            }
            if (current.config.questions.q7 == "Manager") {
              acc[1]++
            }
            if (current.config.questions.q7 == "Non Managerial Employee") {
              acc[2]++
            }
            if (current.config.questions.q7 == "Student") {
              acc[3]++
            }
            return acc;
          }, [0, 0, 0, 0])
          setPieData(PieData2);
          console.log(PieData);
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [isAdmin])


  //If user is not admin show an message
  if (!isAdmin) {
    return (
      <header>
        <div className="container h-100">
          <div className=" h-100">

            <h2
              className="pricingTitle"
              style={{
                textAlign: "center",
                marginTop: "2em",
                marginLeft: "10px",
                color: "red"
              }}
            >
              You Don't Have access to this page!
            </h2>
          </div></div></header>
    );
  } else {

    //if user is admin render the admin dashboard
    return (
      <>
        <Navigate />
        <header>
          <div className="container h-100">
            <div className=" h-100">

              <h2
                className="pricingTitle"
                style={{
                  textAlign: "left",
                  marginTop: "2em",
                  marginLeft: "10px",
                }}
              >
                Hello!
            </h2>
              <Modal dialogClassName="modal-90w" show={show} onHide={handleClose} centered >

                <Modal.Header closeButton>
                  <Modal.Title>More Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <br />
                  <Row style={{ textAlign: "center", marginLeft: "10em", marginRight: "10em" }}>
                    <Col xs={6} md={4}>
                      <h5>Name</h5><br />
                      <p>{modalData.dataName}</p>
                    </Col>
                    <Col xs={6} md={4}>
                      <h5>Email</h5><br />
                      <p><a href={"mailto:" + modalData.dataEmail}>{modalData.dataEmail}</a></p>
                    </Col>
                    <Col xs={6} md={4}>
                      <h5>Phone</h5><br />
                      <p><a href={"tel:" + modalData.dataPhone}>{modalData.dataPhone}</a></p>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <Row style={{ textAlign: "center" }}>
                    <Col xs={6} md={6} className="modalqsection">
                      <div className="qSection" style={{ width: "100%" }}>
                        <div className="questionBlock2">
                          <h4>
                            When an employee leaves what is/are the biggest concern/s?
                    </h4>
                        </div>
                        <div className="answerBlock">
                          {modalData.dataQuestions.q1 &&
                            modalData.dataQuestions.q1.map((object, index) => (
                              <Adashblock
                                answers={object}
                                index={index}
                                correctA={q1A}

                              />
                            ))}
                        </div>
                      </div>
                    </Col> <Col xs={6} md={6} className="modalqsection">
                      <div className="qSection" style={{ width: "100%" }}>
                        <div className="questionBlock2">
                          <h4>What prevents employees from sharing information?</h4>
                        </div>
                        <div className="answerBlock">
                          {modalData.dataQuestions.q2 &&
                            modalData.dataQuestions.q2.map((object, index) => (
                              <Adashblock
                                answers={object}
                                index={index}
                                correctA={q2A}

                              />
                            ))}
                        </div>
                      </div>
                    </Col> <Col xs={6} md={6} className="modalqsection">
                      <div className="qSection" style={{ width: "100%" }}>
                        <div className="questionBlock2">
                          <h4>
                            How do you test how the company will function in the
                            absence of the key employee?
                    </h4>
                        </div>
                        <div className="answerBlock">
                          {modalData.dataQuestions.q3 &&
                            modalData.dataQuestions.q3.map((object, index) => (
                              <Adashblock
                                answers={object}
                                index={index}
                                correctA={q3A}

                              />
                            ))}
                        </div>
                      </div></Col> <Col xs={6} md={6} className="modalqsection">
                      <div className="qSection" style={{ width: "100%" }}>
                        <div className="questionBlock2">
                          <h4>
                            What is being done by the company to ensure that knowledge
                            about company processes are shared?
                    </h4>
                        </div>
                        <div className="answerBlock">
                          {modalData.dataQuestions.q4 &&
                            modalData.dataQuestions.q4.map((object, index) => (
                              <Adashblock
                                answers={object}
                                index={index}
                                correctA={q4A}
                              />
                            ))}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Modal.Body>

                <Modal.Footer>

                  <Button variant="secondary" onClick={handleClose}>Close</Button>

                </Modal.Footer>

              </Modal>
              <main className="main-content bgc-grey-100">
                <div id="mainContent">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-2">
                        <div style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }} className="databox">
                          <h2>{TotalClient}</h2>
                          <p>Total Clients</p>
                        </div>
                        <div style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }} className="databox">
                          <h2>{AverageScore}%</h2>
                          <p>Average Score</p>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="databox">
                          <h5>Business Lifetime(Years)</h5>
                          <div className="mixed-chart">
                            <Chart
                              options={bLifetimeBarChart.options}
                              series={[{ data: chartData }]}
                              type="bar"
                              width="100%"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="databox">
                          <h5>Job Roles</h5>
                          <Chart options={bLifetimePieChart.options} series={PieData} labels={bLifetimePieChart.labels} type="donut" width="100%" />
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: "4em" }} className="row">
                      <div className="col-md-12">
                        <div className="bgc-white bd bdrs-3 p-20 mB-20">
                          <table
                            id="dataTable"
                            className="table table-striped table-bordered"
                            cellspacing="0"
                            width="100%"
                          >
                            <thead className="thead">
                              <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Score</th>
                                <th>Details</th>
                              </tr>
                            </thead>

                            <tbody>
                              {Arraydata.map(data => {
                                return (
                                  <tr>
                                    <td>{data.name}</td>
                                    <td><a href={"emailto:" + data.email}>{data.email}</a></td>
                                    <td><a href={"tel:" + data.phone}>{data.phone}</a></td>
                                    <td>{data.config.score}%</td>
                                    <td>
                                      <Button onClick={() => handleShow(data)}>More Details</Button>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </header>
      </>
    )
  }
}
export default withAuthenticator(adminDash, {
  usernameAttributes: 'email',
  signUpConfig: {
    signUpFields: [{ key: 'name', label: 'Name', required: true }]
  }
})
