import React from 'react';
import KartotajsHeader from "./Kartotajs-Header";
import KartotajsBox from "./kartotajs-box";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const KartotajsStorage = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const role = Cookies.get('role');
      if (role !== 'kartotajs') {
        navigate('../login');
      }
    }, [navigate]);
    return (

        <>
            <KartotajsHeader />
            <KartotajsBox />
        </>
    );
};

export default KartotajsStorage;