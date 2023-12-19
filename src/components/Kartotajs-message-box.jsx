import React from 'react';
import "../style/Kartotajs.css";
import {Link} from "react-router-dom";

const KartotajsMessageBox = () => {
    return (
        <div className="kartotajs-main">
            <div className="kartotajs-row">
                <Link to="/" className="kartotajs-text">↩</Link>
                <h1 className="kartotajs-text">MESSAGES</h1>
            </div>

        </div>
    );
};

export default KartotajsMessageBox;