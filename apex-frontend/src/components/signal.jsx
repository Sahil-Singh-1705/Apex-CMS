"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Signal = (data) => {
  console.log(" data", data);
  return (
    <>

<section
  className="d-flex justify-content-center align-items-center text-white text-center"
  style={{
    backgroundImage: "url('images/dis.jpg')",
    height: "70vh",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    fontFamily: "sans-serif",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
  <h1 className="fw-bold display-4">Signals</h1>
</section>

      {/* // Blog posts section */}
      <section className="blog_section " style={{ marginTop: "25px" }}>
        <div className="container">
          <div className="row blog-shortcode ">
            {/* Map over blog posts */}
            {data &&
              data?.data.map((el) => {
      
                if (el?.published == "true" && el?.category_id == "signal") {
                return (
                   
                  <div className="col-md-6 col-lg-4 d-flex justify-content-center mb-4">
                  <div className="card border rounded  h-100">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/static/images/${el.thumbnail_image}`}
                      className="card-img-top  h-100 "
                      alt={el.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{el.title}</h5>
                      {/* <p className="card-text">
                        {el.excerpt.split(" ").slice(0, 30).join(" ") + "..."}
                      </p> */}
                      <Link
                        href={`/signal/${el.slug.replace(/\s+/g, "-")}`}
                        className="btn btn-primary d-inline-flex align-items-center gap-2"
                        style={{ backgroundColor: "#15154c" }}
                        aria-label="Read more about article"
                      >
                        Read more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-arrow-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.146 12.354a.5.5 0 0 1 0-.708L12.793 9H1.5a.5.5 0 0 1 0-1h11.293L10.146 4.354a.5.5 0 1 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708 0z"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                
                );
                }
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Signal;
 
