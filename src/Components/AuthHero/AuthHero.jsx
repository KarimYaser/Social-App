import {
  faBell,
  faHeart,
  faImage,
  faMessage,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router";

export default function SignupHero({title,description}) {
  const features = [
    {
      icon: faMessage,
      title: "Real-time Chat",
      description: "Instant Messaging",
      colors: "bg-teal-400/20 text-green-300",
    },
    {
      icon: faImage,
      title: "share Media",
      description: "Photos & Videos",
      colors: "bg-blue-400/20 text-blue-100",
    },
    {
      icon: faBell,
      title: "Smart Alerts",
      description: "stay updated",
      colors: "bg-pink-400/20 text-pink-100",
    },
    {
      icon: faUsers,
      title: "communities",
      description: "Find your tribe",
      colors: "bg-teal-400/20 text-green-300",
    },
  ];

  const stats = [
    {
      icon: faUsers,
      number: "2M+",
      label: "Active Users",
    },
    {
      icon: faHeart,
      number: "10M+",
      label: "Posts Shared",
    },
    {
      icon: faMessage,
      number: "50M+",
      label: "Messages Sent",
    },
  ];

  return (
    <>
      <div
        className={`signup-hero min-h-screen  bg-gradient-to-b from-blue-800 to-blue-500 text-white flex flex-col justify-start p-10 gap-8 `}
      >
        <header>
          <h1>
            <Link to="/" className="flex items-center gap-3">
              <span className="size-10 text-lg font-bold flex justify-center items-center bg-white/30 border-1 border-white/30  rounded-xl hover:bg-white/50 transition-300 cursor-pointer">S</span>
              <span className="text-2xl font-bold ">Social hub</span>
            </Link>
          </h1>
        </header>

        <div className="content space-y-4">
          <div className="title">
            <h2 className="text-5xl font-bold max-w-96">
              {title.normal}
              <span className="bg-linear-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent pb-4">
                {title.highlight}
              </span>
            </h2>
            <p className=" max-w-md text-xl mt-3 mb-6">
              {description}
            </p>
          </div>
          <section className="feature-section">
            <h3 className="sr-only">platform features</h3> {/* not visible */}
            <ul className="feature-cards grid grid-cols-2 gap-3">
              {features.map((f,i) => (
                <li key={i} className="feature-card flex gap-2 items-center bg-white/30 rounded-lg px-4 py-2 backdrop-blur-sm border-1 border-white/20 hover:scale-103 transition-transform duration-200 cursor-pointer hover:bg-white/40">
                  <div className={`icon ${f.colors} size-10 flex justify-center items-center rounded-lg`}>
                    <FontAwesomeIcon icon={f.icon} />
                  </div>
                  <div className="card-body">
                    <h4>{f.title}</h4>
                    <span>{f.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="stats mt-10">
            <ul className="stats-cards flex gap-6 items-center">
              {stats.map((s, i) => (
                <li key={i} className="stats-card">
                  <div className="icon flex gap-2 items-center">
                    <FontAwesomeIcon className="text-xl" icon={s.icon}  />
                    <span className="text-2xl font-bold">{s.number}</span>
                  </div>
                  <p>{s.label}</p>
                </li>
              ))}
            </ul>
          </section>

          <figure className="testimonial mt-28 bg-white/20 backdrop-blur-sm border-1 border-white/30 rounded-lg p-4 space-y-4 hover:scale-103 transition-transform duration-200 hover:bg-white/40">
            <div className="rating-average">
              {/* {"⭐".repeat(5)} */}
                {[...Array(5)].map((_, idx) => (
                  <FontAwesomeIcon key={idx} icon={faStar} className="text-yellow-400 hover:scale-140 transition-transform duration-300 " />
                ))}
            </div>
            <blockquote className="text-lg italic">
              <figcaption className="author flex gap-4 items-center mt-4">
                <img
                  src="src\assets\Karim.jpg"
                  className="size-12 rounded-full"
                  alt=""
                />
                <div className="info flex flex-col gap-1 ">
                  <cite>Alex Johnson</cite>
                  <span className="text-sm text-gray-200">Product Designer</span>
                </div>
              </figcaption>
            </blockquote>
          </figure>
        </div>
      </div>
    </>
  );
}
