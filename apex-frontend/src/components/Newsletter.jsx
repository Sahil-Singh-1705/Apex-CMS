import React from 'react'

const Newsletter = () => {
  return (
    <>
    <div
  data-vc-full-width="true"
  data-vc-full-width-init="true"
  className="vc_row wpb_row vc_row-fluid vc_custom_1666157198520 vc_row-has-fill bg-blue "
  
>
  <div className="wpb_column vc_column_container vc_col-sm-6">
    <div className="vc_column-inner">
      <div className="wpb_wrapper">
        <div className="wpb_raw_code wpb_content_element wpb_raw_html">
          <div className="wpb_wrapper">
            <section className=" ">
              <h2>Join Our Newsletter</h2>
              <p>
                Sign up here to get the latest news, updates and special offers.
              </p>
              <img
             
                alt=""
                data-src="wp-content/uploads/2022/10/img008.png"
                className=" ls-is-cached lazyloaded"
                // src="https://techysquad.com/wp-content/uploads/2022/10/img008.png"
              />
              
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="pad180px wpb_column vc_column_container vc_col-sm-6">
    <div className="vc_column-inner">
      <div className="wpb_wrapper">
        <div
          className="wpcf7 js"
          id="wpcf7-f421-p1147-o1"
          lang="en-US"
          dir="ltr"
        >
          <div className="screen-reader-response">
            <p role="status" aria-live="polite" aria-atomic="true" /> <ul />
          </div>
          <form
            action="/#wpcf7-f421-p1147-o1"
            method="post"
            className="wpcf7-form init"
            aria-label="Contact form"
            noValidate="novalidate"
            data-status="init"
          >
            <div style={{ display: "none" }}>
              <input type="hidden" name="_wpcf7" defaultValue={421} />
              <input type="hidden" name="_wpcf7_version" defaultValue="5.8.5" />
              <input type="hidden" name="_wpcf7_locale" defaultValue="en_US" />
              <input
                type="hidden"
                name="_wpcf7_unit_tag"
                defaultValue="wpcf7-f421-p1147-o1"
              />
              <input
                type="hidden"
                name="_wpcf7_container_post"
                defaultValue={1147}
              />
              <input
                type="hidden"
                name="_wpcf7_posted_data_hash"
                defaultValue=""
              />
              <input
                type="hidden"
                name="_wpcf7_recaptcha_response"
                defaultValue=""
              />
            </div>
            <div style={{ display: "flex" }} className=" homeNewsletter">
              <div
                style={{
                  paddingLeft: "0px !important",
                  paddingRight: "0px !important"
                }}
                className="col-md-6 col-12"
              >
                <p>
                  <label>
                    <span className="wpcf7-form-control-wrap" data-name="email">
                      <input
                        size={40}
                        className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email subscribeform"
                        aria-required="true"
                        aria-invalid="false"
                        placeholder="Email *"
                        defaultValue=""
                        type="email"
                        name="email"
                      />
                    </span>
                  </label>
                </p>
              </div>
              <div
                style={{
                  paddingLeft: "0px !important",
                  paddingRight: "0px !important"
                }}
                className="col-md-6 col-12"
              >
                <p>
                  <input
                    className="wpcf7-form-control wpcf7-submit has-spinner btn hiset hovgreen btn-danger"
                    type="submit"
                    defaultValue="Subscribe"
                  />
                  <span className="wpcf7-spinner" />
                </p>
              </div>
            </div>
            <div className="wpcf7-response-output" aria-hidden="true" />
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
    
  )
}

export default Newsletter