import React from "react";

const useResize = (delay) => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    let timerId;
    function handleResize(evt) {
      let width = evt.target.innerWidth;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        setWindowWidth(width);
      }, delay);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, delay]);
  return windowWidth;
};
export default useResize;
