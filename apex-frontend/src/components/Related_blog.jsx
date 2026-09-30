"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Related_blog = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = category.split(',').map(category => encodeURIComponent(category.trim())).join(',');
       
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/allrelatedblogs?category=${categories}`,
          { cache: "no-store" }
        );
       
        const categoryData = await response.json();
        setData(categoryData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData(); // Call fetchData inside useEffect
  }, []); // Include category in the dependency array
 console.log("Related blog data:", data);
  return (
    <div className="container mx-auto px-2">
    <div className="single-related-posts">
      <h3 className="text-2xl font-semibold ">Related posts</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((blog, index) => (

          <div className="related-item bg-white shadow-md rounded-lg overflow-hidden my-6" key={index}>
            <article className="post-format-standard">
              <div className="mini-post-img relative">
                <Link
                  aria-label="Post image"
                  href={blog.slug}
                  className="block w-full h-full"
                >
                  <img
                  
                    className="w-full h-48 hover:scale-105"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/static/images/${blog?.thumbnail_image}`}
                  />
                  {/* <div className="absolute inset-0 bg-black opacity-25"></div> */}
                </Link>
              </div>
              <div className="post-content p-4">
                <Link href={blog.slug} className="text-lg font-medium text-gray-900  ">
                  {blog.title} {blog.subtitle}
                </Link>
                <br />
                <time
                  className="text-secondary text-sm"
                  dateTime={blog.createdAt}
                >
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}{' '}
                  {new Date(blog.createdAt).getFullYear()}
                </time>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default Related_blog;
