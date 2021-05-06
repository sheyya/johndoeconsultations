import React from "react"
import Button from "@material-ui/core/Button"
import "../assets/css/styles.css"
import Head from "../components/Head/Head"
import Footer from "../components/footer"
import Landimg from "../assets/img/landimg.svg"
import BgCurve from "../assets/img/bgCurveL.svg"
import { Link } from "gatsby"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

const Home = () => (
  <div>
    <Head />
    <img src={BgCurve} id="bg" alt="" />
    <header className="masthead">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-lg-7 my-auto">
            <div className="header-content mx-auto">
              <h1 className="mb-5 text-bold">
                The top{" "}
                <div style={{ color: "#FF715D", display: "inline" }}>THREE</div>{" "}
                problems that can be solved are,
              </h1>
              <div className="bullet-section">
                <div className="bullet-text">
                  <div className="icon">
                    <CheckCircleIcon style={{ color: "#FF715D" }} />
                  </div>
                  High employee absent rate
                </div>

                <div className="bullet-text">
                  <div className="icon">
                    <CheckCircleIcon style={{ color: "#FF715D" }} />
                  </div>
                  Low employee morale and motivation
                </div>

                <div className="bullet-text">
                  <div className="icon">
                    <CheckCircleIcon style={{ color: "#FF715D" }} />
                  </div>
                  Employees high stress level
                </div>
              </div>
              <br />
              <p className="my-3">
                See how your company compares with industry best practices,
              </p>
              <div className="link my-4">
                <Link to="/questions" className="font-weight-bold text-light">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#EA745B", color: "#ffffff" }}
                    startIcon={<KeyboardArrowRightIcon />}
                  >
                    Answer the Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-5 my-auto">
            <img src={Landimg} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "5em" }}>
        <Footer />
      </div>
    </header>
  </div>
)

export default Home
