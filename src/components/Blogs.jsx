import React from 'react';
import '../css/blogs.css';
const blogs = [
  {
    title: "From Messy Code to Clean Code",
    date: "January 2022",
    link: "https://shivawhispers.blogspot.com/2022/01/from-messy-code-to-clean-code.html",
    description: "Learn how to write clean and maintainable code ",
  },
  {
    title: "Remote Work Is Shaping the Future of Tech",
    date: "January 2022",
    link: "https://shivawhispers.blogspot.com/2022/01/remote-work-is-shaping-future-of.html",
    description: "Explore the rise of remote work and its impact on the technology industry.",
  },
  {
    title: "Python vs Java: The War of 2021",
    date: "December 2021",
    link: "https://shivawhispers.blogspot.com/2021/12/python-vs-java-war-2021.html",
    description: "A comparison of Python and Java, two of the most popular programming languages in 2021.",
  },
  {
    title: "Building Scalable Systems: Lessons from Real Projects",
    date: "FEBRUARY 2022",
    link: "https://shivawhispers.blogspot.com/2022/02/building-scalable-systems-lessons-from.html",
    description: "Tips on designing scalable, high-performance systems.",
  },
  {
    title: "How to Prepare for a Backend Developer Interview in 2022",
    date: "FEBRUARY 2022",
    link: "https://shivawhispers.blogspot.com/2022/02/how-to-prepare-for-backend-developer.html",
    description: "Key tips to ace your backend developer interview.",
  },
  {
    title: "Top Mistakes Junior Backend Developers Make — And How to Avoid Them",
    date: "FEBRUARY 2022",
    link: "https://shivawhispers.blogspot.com/2022/02/top-mistakes-junior-backend-developers.html",
    description: "Learn and avoid common mistakes junior backend developers make.",
  },
];

const Blogs = () => {
  return (
    <div className="container">
      <h1>My Blog Posts</h1>
      <div className="grid">
        {blogs.map((blog, index) => (
          <div className="card" key={index}>
            <div className="content">
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
              <p className="date">{blog.date}</p>
              <a className="read-more" href={blog.link} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
