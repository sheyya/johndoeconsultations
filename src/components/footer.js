import React from "react"
import "../assets/css/styles.css"
import { Link } from "gatsby"

const footer = () => {
  return (
    <>
      <footer
        className="text-dark text-center text-lg-start"
        style={{ backgroundColor: "#ffbab3" }}
      >
        {/* // Grid container  */}
        <div className="container p-4">
          {/* //Grid row */}
          <div className="row footerlinks col-lg-9 mx-auto">
            {/* //Grid column */}
            <div className="col-lg-3 col-md-3 mb-4 mb-md-0">
              <p className="text-uppercase">
                <Link to="/bio" className="text-dark">
                  Biography
                </Link>
              </p>
            </div>

            <div
              style={{
                fontWeight: "500",
              }}
              className="col-lg-3 col-md-3 mb-4 mb-md-0"
            >
              <p className="text-uppercase">
                <Link to="/pricing" className="text-dark">
                  Pricing
                </Link>
              </p>
            </div>
            <div
              style={{
                fontWeight: "500",
              }}
              className="col-lg-3 col-md-3 mb-4 mb-md-0"
            >
              <p className="text-uppercase">
                <Link to="/termsofservice" className="text-dark">
                  Terms of Service
                </Link>
              </p>
            </div>
            <div
              style={{
                fontWeight: "500",
              }}
              className="col-lg-3 col-md-3 mb-4 mb-md-0"
            >
              <p className="text-uppercase">
                <Link to="/privacypolicy" className="text-dark">
                  Privacy and Policy
                </Link>
              </p>
            </div>
          </div>
          {/* //Grid row */}
        </div>
        {/* // Grid container  */}

        <div className="container p-4">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 mx-auto">
            <h5 className="text-uppercase">CIS Project</h5>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default footer
