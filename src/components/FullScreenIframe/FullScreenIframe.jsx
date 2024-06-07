import React, { useRef } from "react";

function FullScreenIframe({ src }) {
  const iframeRef = useRef(null);

  const openFullscreen = () => {
    const elem = iframeRef.current;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  return (
    <div className="fullScreenIframe" onClick={openFullscreen}>
      <iframe
        src={src}
        ref={iframeRef}
        frameBorder="0"
        allowFullScreen
        title="FullScreenIframe"
      ></iframe>
    </div>
  );
}

export default FullScreenIframe;
