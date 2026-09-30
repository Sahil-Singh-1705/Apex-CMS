import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;

const Blog_home = (blog) => {
  console.log("blog", blog);
  return (
    <>
      <section
        className=" container blog_section   px-20"
        style={{ paddingBottom: "50px" }}
      >
        <div className="row  mb-10 blog-shortcode ">
          <section className="blog_section " style={{ marginTop: "25px" }}>
            <div className="container">
              <div className="row blog-shortcode ">
                {/* Map over blog posts */}
                {blog &&
                  blog?.blog.map((el) => {
                    if (
                      el?.published == "true" &&
                      el?.category_id == "Indicators"
                    ) {
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
                                href={`/indicators/${el.slug.replace(
                                  /\s+/g,
                                  "-"
                                )}`}
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
         
            <section class="bg-white  pt-3">
              <div class="container">
                <div class="text-center">
                  <h2 class="h3 h-md-2 pt-3 text-dark fw-bold">
                    Enhance Your Trading Strategy
                  </h2>
                  <p class="fs-5 pt-3 text-dark">
                    Gain insights and improve your trades with technical
                    indicators.
                  </p>
                </div>
                <div class="d-flex justify-content-center pt-4 pb-4">
                  <Link
                    href="#"
                    class=" nextjs-link btn btn-dark-custom px-4 py-2  fw-semibold text-white"
                    style={{backgroundColor: "#000029"}}
                  >
                    {" "}
                    Start Analyzing Now{" "}
                  </Link>
                </div>
              </div>
            </section>
          </div>
      
      </section>
    </>
  );
};

export default Blog_home;
