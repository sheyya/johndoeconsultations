import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import DoneIcon from "@material-ui/icons/Done"
import { navigate } from "gatsby"
import PhoneInput from "react-phone-input-2"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Head from "../components/Head/Head"
import "react-phone-input-2/lib/style.css"
import axios from "axios"
import { Auth } from "aws-amplify"

/**
 * Register Component
 * @returns void
 * 
 */
const Register = () => {

  // State variable to store form data
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    phone: null,
    rawPhone: null
  })

  // State variable to store country code
  const [countryCode, setCountryCode] = useState({
    phoneCountry: null,
  })
  // State variable to store name,email,phone validity
  const [namevalid, setNamevalid] = useState(true)
  const [emailvalid, setEmailvalid] = useState(true)
  const [phonevalid, setPhonevalid] = useState(true)


  var name = formData.name
  var email = formData.email
  var phone = formData.phone
  var rawPhone = formData.rawPhone

  //get authenticated user details and store in state variable
  useEffect(() => {
    Auth.currentUserInfo().then((userInfo) => {
      if (userInfo !== null) {
        console.log(userInfo);

        setFormData({
          ...formData,
          email: userInfo.attributes['email'],
          phone: userInfo.attributes['phone_number'],
          name: userInfo.attributes['name']
        })
      }


    })
  }, [])

  //Validate typed text on phone and email
  const VALIDATORS = {
    NAME: input => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(input),
    EMAIL: input =>
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        input
      ),
    PHONE: input =>
      // eslint-disable-next-line no-useless-escape
      /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/.test(
        input
      ),
    DESCRIPTION: input => input && input.length >= 100,
  }

  //Function to check name validity
  const isName = () => {
    if (!VALIDATORS.NAME(name)) {
      setNamevalid(false)
    }
  }

  //Function to check email validity
  const isEmail = () => {
    if (!VALIDATORS.EMAIL(email)) {
      setEmailvalid(false)
    }
  }

  //Function to check phone validity
  const isPhone = () => {
    if (!VALIDATORS.PHONE(phone)) {
      setPhonevalid(false)
    }
  }

  const waittoast = () => {
    toast.success("Please wait!", {
      className: "custom-toast",
      draggable: "true",
      closeOnClick: "true",
      autoClose: 10000,
      position: toast.POSITION.TOP_CENTER,
    })
  }

  //Function to verify phone through external API
  const phoneVerifyAPI = () => {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `http://apilayer.net/api/validate?access_key=c1a8f64e980d26490daa4d1791393a44&number=` +
          rawPhone +
          `&country_code=` +
          countryCode.phoneCountry +
          `&format= 1`
        )
        .then(result => {
          resolve({ code: 200, message: result.data.message })
          console.log(result)
          if (result.data.valid) {
            setPhonevalid(true)
            emailVerifyAPI()
          } else {
            setPhonevalid(false)
            return false
          }
        })
        .catch(err => {
          console.log("Failed", err)
          setPhonevalid(false)
          reject({ code: 0, error: err })
          return false
        })
    })
  }

  //Function to verify email through external API
  const emailVerifyAPI = () => {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `http://apilayer.net/api/check?access_key=175b55900e88cdf8892de78c05094b7c&email=` +
          email +
          `&smtp=1&format=1`
        )
        .then(result => {
          resolve({ code: 200, message: result.data.message })
          console.log(result)
          if (result.data.smtp_check && result.data.mx_found) {
            setEmailvalid(true)
            if (isSignUpValid()) {
              console.log('valid');

              if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(formData))
                console.log('done');

              }
              navigate("/dashboard")
            }
          } else {
            setEmailvalid(false)
            return false
          }
        })
        .catch(err => {
          console.log("Failed", err)
          setEmailvalid(false)
          reject({ code: 0, error: err })
          return false
        })
    })
  }

  const isSignUpValid = () =>
    name &&
    email &&
    phone &&
    VALIDATORS.NAME(name) &&
    VALIDATORS.EMAIL(email) &&
    VALIDATORS.PHONE(phone)

  /**
   * Handle when user type phone number
   * @param {String} phone 
   * @param {String} value 
   * 
   */
  const handlePhoneChange = (phone, value) => {
    setFormData({
      ...formData,
      phone: phone,
      rawPhone: phone.toString().slice(value.dialCode.length),
    })
    setCountryCode({ phoneCountry: value.countryCode })
    setPhonevalid(true)
  }

  /**
   * Function to handle form value changes
   * @param {event} e Pass event changes to input boxes 
   */
  const formValueChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(formData)
    if (e.target.name === "name") {
      setNamevalid(true)
    }

    if (e.target.name === "email") {
      setEmailvalid(true)
    }

  }

  /**
   * Function to handle submit button
   * @param {event} event submit data event
   */
  const submitData = event => {
    event.preventDefault()
    isName()
    isEmail()
    isPhone()
    if (isSignUpValid()) {
      waittoast()
      phoneVerifyAPI()
    } else {
      return
    }
  }

  return (

    <div>
      <Head />
      <div className="container h-100">
        <div className=" h-100">
          <div className="col-lg-8 mx-auto">
            <ToastContainer
              style={{ color: "white", fontWeight: "500", textAlign: "center" }}
            />
            <div className="RegBox">
              <div className="Title">
                <h3>We will contact you shortly</h3>
              </div>
              <div className="form mx-auto">
                <form onSubmit={submitData}>
                  <div className="group-input">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      placeholder="John Doe"
                      onChange={formValueChange}
                      required
                    />
                  </div>
                  <p
                    style={{
                      display: !namevalid ? "block" : "none",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "red",
                      fontWeight: "500",
                      marginTop: "-15px",
                    }}
                  >
                    *Please enter a valid name*
                  </p>
                  <div className="group-input">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      value={email}
                      name="email"
                      pattern='/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
                      placeholder="johndoe@gmail.com"
                      required
                      onChange={formValueChange}
                    />
                  </div>
                  <p
                    style={{
                      display: !emailvalid ? "block" : "none",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "red",
                      fontWeight: "500",
                      marginTop: "-15px",
                    }}
                  >
                    *This doesn’t look like an email*
                  </p>
                  <div className="group-input">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <PhoneInput
                      placeholder="+12 123 456 7890"
                      country="us"
                      value={phone}
                      inputStyle={{ height: "50px", width: "100%" }}
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  <p
                    style={{
                      display: !phonevalid ? "block" : "none",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "red",
                      fontWeight: "500",
                      marginTop: "-15px",
                    }}
                  >
                    *This doesn’t look like a phone number*
                  </p>
                  <Button
                    type="submit"
                    className="site-btn login-btn"
                    variant="contained"
                    style={{ backgroundColor: "#EA745B", color: "#ffffff" }}
                    startIcon={<DoneIcon />}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </header>
  )
}

export default Register
