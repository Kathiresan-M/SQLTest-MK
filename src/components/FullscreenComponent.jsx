import React, { useRef, useEffect, useState } from 'react';

const FullscreenComponent = () => {
    const componentRef = useRef(null);
    const [error, setError] = useState(null);
    const [happen,setHappen] = useState(false);

    const enterFullscreen = () => {
        if (componentRef.current.requestFullscreen) {
            componentRef.current.requestFullscreen().catch(err => {
                setError("Unable to enter fullscreen mode automatically. Please click the button to proceed.");
                console.error("Error attempting to enable fullscreen mode:", err);
            });
        } else if (componentRef.current.mozRequestFullScreen) { /* Firefox */
            componentRef.current.mozRequestFullScreen();
        } else if (componentRef.current.webkitRequestFullscreen) { /* Chrome, Safari, and Opera */
            componentRef.current.webkitRequestFullscreen();
        } else if (componentRef.current.msRequestFullscreen) { /* IE/Edge */
            componentRef.current.msRequestFullscreen();
        }
    };

    useEffect(() => {
        // Attempt to enter fullscreen
        setHappen(true);
    }, []);

    if(happen){
        enterFullscreen();
    }

    return (
        <div>
            <div ref={componentRef} style={{ width: '100%', height: '300px', background: 'lightgray' }}>
                <h1>This component is attempting to go fullscreen</h1>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={enterFullscreen}>Go Fullscreen</button>
        </div>
    );
};

export default FullscreenComponent;
