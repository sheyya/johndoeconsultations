import React, { useEffect, useState } from "react"
import "../assets/css/styles.css"
import Button from "@material-ui/core/Button"
import "react-phone-input-2/lib/style.css"
import Head from "../components/Head/Head"
import HomeIcon from "@material-ui/icons/Home"
import "react-toastify/dist/ReactToastify.css"
import { navigate } from "gatsby"

/**
 * Functional component to display thank you page
 * @returns {JSX}
 */
const Thanks = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "-",
    phone: "-",
  })

  //Get data from localstorage
  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      if (typeof window !== "undefined") {
        const email = JSON.parse(localStorage.getItem("user")).email
        const phone = JSON.parse(localStorage.getItem("user")).phone
        const name = JSON.parse(localStorage.getItem("user")).name

        setFormData({ name, email, phone })
      }
    }
  }, [])

  return (
    <header className="thank">
      <Head />
      <div className="conatiner">
        <div
          className="jumbotron text-center"
          style={{ backgroundColor: "rgba(255, 198, 191, 0.856)" }}
        >
          <h1
            className="display-3"
            style={{ marginTop: "2em", marginBottom: "0em", fontWeight: "500" }}
          >
            Thank You!
          </h1>
          <h3 style={{ marginBottom: "2em" }}>{formData.name}</h3>
          <p style={{ fontSize: "19px", fontWeight: "500" }}>
            You will hear from us shortly at
          </p>
          <div className="row userdetail">
            <div>
              <p style={{ fontSize: "17px" }}>{formData.email}</p>
              <p style={{ fontSize: "17px" }}>{formData.phone}</p>
            </div>
            <Button
              className="site-btn login-btn"
              variant="contained"
              onClick={() => {
                localStorage.clear()
                navigate("/")
              }}
              style={{
                backgroundColor: "#1ABC9C",
                color: "#ffffff",
                marginTop: "20px",
              }}
              startIcon={<HomeIcon />}
            >
              Go to Home
            </Button>
          </div>
        </div>
        {/* </div>{" "}
         */}
      </div>
    </header>
  )
}

export default Thanks
