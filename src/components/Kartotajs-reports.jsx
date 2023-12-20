import React, { useEffect } from 'react';
import KartotajsHeader from "./Kartotajs-Header";
import KartotajsReport from "./kartotajs-report";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const KartotajsReports = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const role = Cookies.get('role');
      if (role !== 'kartotajs') {
        navigate('../login');
      }
    }, [navigate]);

    return (
        <div>
            <KartotajsHeader />
            <KartotajsReport />
        </div>
    );
};

export default KartotajsReports;