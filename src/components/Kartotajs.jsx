import React from 'react';
// import { Link } from "react-router-dom";
import "../style/Kartotajs.css";
import {Link} from "react-router-dom";
const Kartotajs = () => {
    return (
        <div className="kartotajs-main">
            <div className="kartotajs-container">
                <div className="kartotajs-cont">
                    <Link to="/KartotajsStorage" className="kartotajs-box">
                        <div className="kartotajs-circle">
                            <img src="https://www.freepnglogos.com/uploads/server-png/server-icon-download-icons-17.png" className="kartotajs-image"/>
                        </div>
                        <p className="kartotajs-text"> STORAGE</p>
                    </Link>
                    <Link to="/KartotajsReports" className="kartotajs-box">
                        <div className="kartotajs-circle">
                            <img src="https://icons.veryicon.com/png/o/miscellaneous/effevo/daily-report.png" className="kartotajs-image"/>
                        </div>
                        <p className="kartotajs-text"> REPORTS</p>
                    </Link>
                    <Link to="/KartotajsMessages" className="kartotajs-box">
                        <div className="kartotajs-circle">
                            <img src="https://static.thenounproject.com/png/620322-200.png" className="kartotajs-image"/>
                        </div>
                        <p className="kartotajs-text"> MESSAGES</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Kartotajs;