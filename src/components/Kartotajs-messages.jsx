import React from 'react';
import KartotajsHeader from "./Kartotajs-Header";
import KartotajsMessageBox from "./Kartotajs-message-box";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const KartotajsMessages = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const role = Cookies.get('role');
      if (role !== 'kartotajs') {
        navigate('../login');
      }
    }, [navigate]);
    return (
        <div>
            <KartotajsHeader/>
            <KartotajsMessageBox/>
        </div>
    );
};

export default KartotajsMessages;