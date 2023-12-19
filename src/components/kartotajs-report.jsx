import "../css/kartotajs-report.css";
import "../css/Kartotajs.css";
import { Link } from "react-router-dom";
import React from 'react';

const KartotajsReport = () => {
    return (
        <div className="kartotajs-main">
            <div className="kartotajs-row">
                <Link to="/kartotajs" className="kartotajs-text">↩</Link>
                <h1 className="kartotajs-text">REPORTS</h1>
            </div>
            <div className="kartotajs-inputbox">
                <div className="kartotajs-inputbox-elements">
                    <h1 className="kartotajs-text">ARRANGED GOODS</h1>
                    <label htmlFor="kartotajs-prece" className="kartotajs-text">Item:</label>
                    <select name="kartotajs-prece" id="preces" className="kartotajs-prece">
                        
                    </select>
                    <label htmlFor="quantity" className="kartotajs-text">Count:</label>
                    <input
                        className="kartotajs-prece"
                        type="number"
                        id="quantity"
                        name="quantity"
                        required
                    />
                    <label htmlFor="date" className="kartotajs-text">Date:</label>
                    <input
                        className="kartotajs-prece"
                        type="date"
                        id="date"
                        name="date"
                        required
                    />
                    <button className="kartotajs-button">SUBMIT</button>
                </div>
            </div>
        </div>
    );
};

export default KartotajsReport;