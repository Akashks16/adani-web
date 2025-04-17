import React from "react";
import "./HomePage.css";
import { useLocation } from "react-router-dom";

export const HomePage = () => {
  const location = useLocation();
  const path = location?.pathname?.replace("/", "");

  let bgClass = "bg-default";
  if (path === "invoice-uploader") bgClass = "bg-b";

  return <div className={`homepage  ${bgClass} `}></div>;
};
