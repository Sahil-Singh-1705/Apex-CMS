import React from 'react'

const Office = () => {
  return (
    <div>
      <section className="bg-lightGray ptb-80">
    <div className="container-fluid">
      <div className="text-center mb-lg-5 mb-5">
        <div className="titelLine">
          <h3>Our Offices</h3>
        </div>
        <p>Find us at the following locations</p>
      </div>
      <div className="row d-flex align-items-stretch">
        <aside className="col-lg-4">
          <div className="addressBox">
            <h4>Dubai</h4>
            <ul className="contactList">
              {/* <li>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 35 43"
                          style="enable-background:new 0 0 35 43;" xml:space="preserve">
                          <path class="st0" d="M17.5,0C12.9,0,8.4,1.8,5.1,4.9S0,12.2,0,16.6c0,3.6,1.2,7.1,3.5,10c0,0,0.5,0.6,0.6,0.7l13.4,15l13.4-15
  c0.1-0.1,0.5-0.7,0.5-0.7l0,0c2.3-2.9,3.5-6.4,3.5-10c0-4.4-1.9-8.6-5.1-11.7S22.1,0,17.5,0z M17.5,22.7c-1.3,0-2.5-0.4-3.5-1
  c-1-0.7-1.9-1.6-2.3-2.7c-0.5-1.1-0.6-2.3-0.4-3.5c0.2-1.2,0.9-2.2,1.7-3.1c0.9-0.8,2-1.4,3.3-1.7c1.2-0.2,2.5-0.1,3.7,0.3
  c1.2,0.5,2.2,1.2,2.9,2.2c0.7,1,1.1,2.2,1.1,3.4c0,1.6-0.7,3.1-1.9,4.3C20.8,22,19.2,22.7,17.5,22.7z"></path>
                      </svg>
                      71-75 Shelton Street, Covent Garden, London, WC2H 9JQ
                  </li> */}
              <li>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 30 36"
                  style={{ enableBackground: "new 0 0 30 36" }}
                  xmlSpace="preserve"
                >
                  <path
                    className="st0"
                    d="M24.7,35.7C6.1,29.8-3.9,14.9,1.5,1.4c0.3-0.9,1.6-1.3,2.8-0.9L10,2.4c1.1,0.3,1.8,1.2,1.6,2
  c-0.4,2-0.3,4,0.1,6.1l0.1,0.4c0.1,0.3,0,0.6-0.2,0.8c-0.2,0.2-0.5,0.4-0.8,0.4c-2.1,0.4-3.6,2-2.8,3.9c1,2.4,2.6,4.7,4.6,6.8
  c1.6,1.7,4.4,2,6.1,1.1c0.3-0.1,0.7-0.2,1-0.2c0.4,0,0.7,0.2,1,0.4l0.4,0.3c2,1.5,4.3,2.9,6.8,4c1,0.5,1.6,1.4,1.2,2.2l-1.7,4.2
  c-0.1,0.2-0.2,0.4-0.4,0.6c-0.2,0.2-0.4,0.3-0.7,0.4c-0.3,0.1-0.5,0.1-0.8,0.1C25.3,35.9,25,35.8,24.7,35.7L24.7,35.7z"
                  ></path>
                </svg>
                <a href="https://api.whatsapp.com/send?phone=971556349271">
                  {" "}
                  +971 55 6349271
                </a>
              </li>
              <li>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 30 36"
                  style={{ enableBackground: "new 0 0 30 36" }}
                  xmlSpace="preserve"
                >
                  <path
                    className="st0"
                    d="M24.7,35.7C6.1,29.8-3.9,14.9,1.5,1.4c0.3-0.9,1.6-1.3,2.8-0.9L10,2.4c1.1,0.3,1.8,1.2,1.6,2
  c-0.4,2-0.3,4,0.1,6.1l0.1,0.4c0.1,0.3,0,0.6-0.2,0.8c-0.2,0.2-0.5,0.4-0.8,0.4c-2.1,0.4-3.6,2-2.8,3.9c1,2.4,2.6,4.7,4.6,6.8
  c1.6,1.7,4.4,2,6.1,1.1c0.3-0.1,0.7-0.2,1-0.2c0.4,0,0.7,0.2,1,0.4l0.4,0.3c2,1.5,4.3,2.9,6.8,4c1,0.5,1.6,1.4,1.2,2.2l-1.7,4.2
  c-0.1,0.2-0.2,0.4-0.4,0.6c-0.2,0.2-0.4,0.3-0.7,0.4c-0.3,0.1-0.5,0.1-0.8,0.1C25.3,35.9,25,35.8,24.7,35.7L24.7,35.7z"
                  ></path>
                </svg>
                <a href="https://api.whatsapp.com/send?phone=971507866593">
                  {" "}
                  +971 50 7866593
                </a>
              </li>
              <li>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 34 26"
                  style={{ enableBackground: "new 0 0 34 26" }}
                  xmlSpace="preserve"
                >
                  <path
                    className="st0"
                    d="M32.8,0H1.2C0.5,0,0,0.5,0,1.1v22.9c0,0.6,0.5,1.1,1.2,1.1h31.6c0.7,0,1.2-0.5,1.2-1.1V1.1
  C34,0.5,33.5,0,32.8,0z M29.7,3.9l-12,8.8c-0.3,0.2-0.7,0.2-1,0l-12-8.8c0,0-0.1-0.1-0.1-0.1c0-0.1,0-0.1,0-0.2
  c0-0.1,0.1-0.1,0.1-0.1c0,0,0.1,0,0.2,0h24.6c0.1,0,0.1,0,0.2,0c0,0,0.1,0.1,0.1,0.1s0,0.1,0,0.2C29.8,3.8,29.8,3.9,29.7,3.9z"
                  />
                </svg>
                <a href="mailto:crm@tecysquad.com"> crm@techysquad.com</a>
              </li>
            </ul>
          </div>
        </aside>
        <aside className="col-lg-4">
          <div className="addressBox">
            <h4>UK</h4>
            <ul className="contactList">
              <li>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 35 43"
                  style={{ enableBackground: "new 0 0 35 43" }}
                  xmlSpace="preserve"
                >
                  <path
                    className="st0"
                    d="M17.5,0C12.9,0,8.4,1.8,5.1,4.9S0,12.2,0,16.6c0,3.6,1.2,7.1,3.5,10c0,0,0.5,0.6,0.6,0.7l13.4,15l13.4-15
  c0.1-0.1,0.5-0.7,0.5-0.7l0,0c2.3-2.9,3.5-6.4,3.5-10c0-4.4-1.9-8.6-5.1-11.7S22.1,0,17.5,0z M17.5,22.7c-1.3,0-2.5-0.4-3.5-1
  c-1-0.7-1.9-1.6-2.3-2.7c-0.5-1.1-0.6-2.3-0.4-3.5c0.2-1.2,0.9-2.2,1.7-3.1c0.9-0.8,2-1.4,3.3-1.7c1.2-0.2,2.5-0.1,3.7,0.3
  c1.2,0.5,2.2,1.2,2.9,2.2c0.7,1,1.1,2.2,1.1,3.4c0,1.6-0.7,3.1-1.9,4.3C20.8,22,19.2,22.7,17.5,22.7z"
                  />
                </svg>
                71-75 Shelton Street, Covent Garden, London, WC2H 9JQ
              </li>
              <li>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 30 36"
                  style={{ enableBackground: "new 0 0 30 36" }}
                  xmlSpace="preserve"
                >
                  <path
                    className="st0"
                    d="M24.7,35.7C6.1,29.8-3.9,14.9,1.5,1.4c0.3-0.9,1.6-1.3,2.8-0.9L10,2.4c1.1,0.3,1.8,1.2,1.6,2
  c-0.4,2-0.3,4,0.1,6.1l0.1,0.4c0.1,0.3,0,0.6-0.2,0.8c-0.2,0.2-0.5,0.4-0.8,0.4c-2.1,0.4-3.6,2-2.8,3.9c1,2.4,2.6,4.7,4.6,6.8
  c1.6,1.7,4.4,2,6.1,1.1c0.3-0.1,0.7-0.2,1-0.2c0.4,0,0.7,0.2,1,0.4l0.4,0.3c2,1.5,4.3,2.9,6.8,4c1,0.5,1.6,1.4,1.2,2.2l-1.7,4.2
  c-0.1,0.2-0.2,0.4-0.4,0.6c-0.2,0.2-0.4,0.3-0.7,0.4c-0.3,0.1-0.5,0.1-0.8,0.1C25.3,35.9,25,35.8,24.7,35.7L24.7,35.7z"
                  ></path>
                </svg>
                <a href="https://api.whatsapp.com/send?phone=442032871474">
                  {" "}
                  +44 20 3287 1474
                </a>
              </li>
              <li>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 34 26"
                  style={{ enableBackground: "new 0 0 34 26" }}
                  xmlSpace="preserve"
                >
                  <path
                    className="st0"
                    d="M32.8,0H1.2C0.5,0,0,0.5,0,1.1v22.9c0,0.6,0.5,1.1,1.2,1.1h31.6c0.7,0,1.2-0.5,1.2-1.1V1.1
  C34,0.5,33.5,0,32.8,0z M29.7,3.9l-12,8.8c-0.3,0.2-0.7,0.2-1,0l-12-8.8c0,0-0.1-0.1-0.1-0.1c0-0.1,0-0.1,0-0.2
  c0-0.1,0.1-0.1,0.1-0.1c0,0,0.1,0,0.2,0h24.6c0.1,0,0.1,0,0.2,0c0,0,0.1,0.1,0.1,0.1s0,0.1,0,0.2C29.8,3.8,29.8,3.9,29.7,3.9z"
                  />
                </svg>
                <a href="mailto:contact@tecysquad.com"> contact@techysquad.com</a>
              </li>
            </ul>
          </div>
        </aside>
        <aside className="col-lg-4">
          <div className="addressBox">
            <h4>India</h4>
            <ul className="contactList">
              <li>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 30 36"
                  style={{ enableBackground: "new 0 0 30 36" }}
                  xmlSpace="preserve"
                >
                  <path
                    className="st0"
                    d="M24.7,35.7C6.1,29.8-3.9,14.9,1.5,1.4c0.3-0.9,1.6-1.3,2.8-0.9L10,2.4c1.1,0.3,1.8,1.2,1.6,2
  c-0.4,2-0.3,4,0.1,6.1l0.1,0.4c0.1,0.3,0,0.6-0.2,0.8c-0.2,0.2-0.5,0.4-0.8,0.4c-2.1,0.4-3.6,2-2.8,3.9c1,2.4,2.6,4.7,4.6,6.8
  c1.6,1.7,4.4,2,6.1,1.1c0.3-0.1,0.7-0.2,1-0.2c0.4,0,0.7,0.2,1,0.4l0.4,0.3c2,1.5,4.3,2.9,6.8,4c1,0.5,1.6,1.4,1.2,2.2l-1.7,4.2
  c-0.1,0.2-0.2,0.4-0.4,0.6c-0.2,0.2-0.4,0.3-0.7,0.4c-0.3,0.1-0.5,0.1-0.8,0.1C25.3,35.9,25,35.8,24.7,35.7L24.7,35.7z"
                  ></path>
                </svg>
                <a href="https://api.whatsapp.com/send?phone=7203845111">
                  {" "}
                  +91 7203 845111
                </a>
              </li>
              <li></li>
              <li>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 34 26"
                  style={{ enableBackground: "new 0 0 34 26" }}
                  xmlSpace="preserve"
                >
                  <path
                    className="st0"
                    d="M32.8,0H1.2C0.5,0,0,0.5,0,1.1v22.9c0,0.6,0.5,1.1,1.2,1.1h31.6c0.7,0,1.2-0.5,1.2-1.1V1.1
  C34,0.5,33.5,0,32.8,0z M29.7,3.9l-12,8.8c-0.3,0.2-0.7,0.2-1,0l-12-8.8c0,0-0.1-0.1-0.1-0.1c0-0.1,0-0.1,0-0.2
  c0-0.1,0.1-0.1,0.1-0.1c0,0,0.1,0,0.2,0h24.6c0.1,0,0.1,0,0.2,0c0,0,0.1,0.1,0.1,0.1s0,0.1,0,0.2C29.8,3.8,29.8,3.9,29.7,3.9z"
                  />
                </svg>
                <a href="mailto:crm@tecysquad.com"> crm@techysquad.com</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Office