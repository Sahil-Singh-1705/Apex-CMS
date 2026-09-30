"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Webinar = (data) => {
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
  <h1 className="fw-bold display-4">Webinar</h1>
</section>
<section class="mx-2 mt-5 ">
    <div class="overflow-auto p-lg-5">
        <div class="container px-0">
            <div class="table-responsive">
                <table class="table table-bordered text-center custom-table">
                    
                    <thead class="bg-primary text-white text-lg">
                        <tr>
                            <th class="py-3 px-3 bg-primary-custom text-white">Sr.No</th>
                            <th class="py-3 px-3 bg-primary-custom text-white fs-5">Title</th>
                            <th class="py-3 px-3 bg-primary-custom text-white fs-5">Date</th>
                            <th class="py-3 px-3 bg-primary-custom text-white fs-5">Start Time</th>
                            <th class="py-3 px-3 bg-primary-custom text-white fs-5">Length of Time</th>
                            <th class="py-3 px-3 bg-primary-custom text-white fs-5">Register</th>
                        </tr>
                    </thead>
 
                    <tbody class="text-dark">
                        <tr>
                            <td class="py-3 px-4 fw-semibold bg-dark text-white">1</td>
                            <td class="py-3 px-4 border border-gray">Ichimokou Principals</td>
                            <td class="py-3 px-4 border border-gray">Soon</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray"><a href="#" class="text-primary">Register</a></td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 fw-semibold bg-dark text-white">2</td>
                            <td class="py-3 px-4 border border-gray">Future of Blockchain</td>
                            <td class="py-3 px-4 border border-gray">Soon</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray"><a href="#" class="text-primary">Register</a></td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 fw-semibold bg-dark text-white">3</td>
                            <td class="py-3 px-4 border border-gray">Bitcoin for Beginners</td>
                            <td class="py-3 px-4 border border-gray">Soon</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray"><a href="#" class="text-primary">Register</a></td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 fw-semibold bg-dark text-white">4</td>
                            <td class="py-3 px-4 border border-gray">The Future of ETH</td>
                            <td class="py-3 px-4 border border-gray">Soon</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray"><a href="#" class="text-primary">Register</a></td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 fw-semibold bg-dark text-white">5</td>
                            <td class="py-3 px-4 border border-gray">DeFi Rules</td>
                            <td class="py-3 px-4 border border-gray">Soon</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray"><a href="#" class="text-primary">Register</a></td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 fw-semibold bg-dark text-white">6</td>
                            <td class="py-3 px-4 border border-gray">Secrets of Crypto Trading</td>
                            <td class="py-3 px-4 border border-gray">Soon</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray">-</td>
                            <td class="py-3 px-4 border border-gray"><a href="#" class="text-primary">Register</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
      {/* // Blog posts section */}
      <section className="blog_section" style={{ marginTop: "25px" }}>
  <div className="container">
    <div className="row blog-shortcode">
      {data &&
        data?.data.map((el) => {
          if (el?.published === "true" && el?.category_id === "webinar") {
            return (
              <div className="col-md-6 col-lg-4 d-flex justify-content-center mb-4" key={el.slug}>
                <div className="card border rounded h-100 d-flex flex-column">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/static/images/${el.thumbnail_image}`}
                    className="card-img-top"
                    alt={el.title}
                    style={{ height: "400px", objectFit: "cover" }} // Bigger image height
                  />
                  <div className="card-body d-flex flex-column">
                    <h5
                      className="card-title fw-bold mb-3"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {el.title}
                    </h5>

                    {/* Uncomment below if you want excerpt too */}
                    {/* <p
                      className="card-text flex-grow-1"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {el.excerpt}
                    </p> */}

                    <Link
                      href={`/webinar/${el.slug.replace(/\s+/g, "-")}`}
                      className="btn btn-primary align-self-start d-inline-flex align-items-center gap-2 mt-auto"
                      style={{ backgroundColor: "#15154c" }}
                      aria-label="Read more about webinar"
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
          return null;
        })}
    </div>
  </div>
</section>

    </>
  );
};

export default Webinar;
 

