import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
// @mui
import { Container, Tab, Tabs, Box, Typography } from '@mui/material';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock/arrays';

import HomLists from './listhome/HomeLists'

import { MotionViewport, varFade } from '../../components/animate';
import axios from 'axios';
// ----------------------------------------------------------------------

export default function HomeList() {
    const [bookSuccess, setBookSuccess] = useState([])

    useEffect(() => {
        const data = async () => {
            const res = await axios.get('http://localhost:8080/api/books', {
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            });
            console.log(res.data.content)
            setBookSuccess(res.data.content)
        }
        data();
    }, [])
    return (
        <>
            
        </>
    );
}
