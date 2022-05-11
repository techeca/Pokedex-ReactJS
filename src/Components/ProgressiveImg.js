import { useState, useEffect } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import placeholderSrc from 'images/placeholderSrc.png'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

 const ProgressiveImg = ({ placeholderSrc, src,...props }) => {

  return (
    <img
      //className={`image${loading ? " loading" : " loaded"}`}
      src={src}
      width="70%"
      height="80%"
      placeholder={placeholderSrc}
    />

  );
};

export default ProgressiveImg
