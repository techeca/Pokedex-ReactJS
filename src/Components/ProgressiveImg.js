import { useState, useEffect } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import placeholderSrc from '../placeholderSrc.png'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

 const ProgressiveImg = ({ placeholderSrc, src, ...props }) => {

  return (
    <motion.div whileHover={{scale: 1.1, transition: { duration: 1 }}} whileTap={{ scale: 0.9 }} className='box'>
    <img
      //className={`image${loading ? " loading" : " loaded"}`}
      src={src}
      width="70%"
      height="80%"
      placeholder={placeholderSrc}
    />
    </motion.div>
  );
};

export default ProgressiveImg
