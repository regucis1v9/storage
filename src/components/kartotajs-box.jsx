import React from 'react';
import { Link } from "react-router-dom";
import "../css/kartotajs-box.css";
import "../css/Kartotajs.css";
import KartotajsShirtTable from "./Kartotajs-shirt-table";
import KartotajsShirtSearch from "./Kartotajs-shirt-search";

const KartotajsBox = () => {

    return (
        <div className="kartotajs-main">
            <div className="kartotajs-row">
                <Link to="/kartotajs" className="kartotajs-text">↩</Link>
                <h1 className="kartotajs-text">STORAGE</h1>
            </div>
            <div className="kartotajs-empty-box">
                <KartotajsShirtTable />
                <KartotajsShirtSearch />
            </div>
        </div>
    );
};

export default KartotajsBox;