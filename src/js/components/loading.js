import React from "react";
import "../../scss/loading.scss";

const Loading = () => {
    return (
        <div className="loading">
            <div className="blobs">
                <div className="blob-center" />
                <div className="blob" />
                <div className="blob" />
                <div className="blob" />
                <div className="blob" />
                <div className="blob" />
                <div className="blob" />
            </div>
        </div>
    );
};

export default Loading;
