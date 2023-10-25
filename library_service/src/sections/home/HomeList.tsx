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
            setBookSuccess(res.data)
        }
        data();
    }, [])
    return (
        <>
            <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ my: 2 }}>
                    SẢN PHẨM HOT
                </Typography>
                <Typography
                    sx={{
                        mx: 'auto',
                        maxWidth: 640,
                        color: 'text.secondary',
                    }}
                >
                    Sau đây là danh sách các sản phẩm được các độc giả thuê nhiều nhất trong năm 2021,
                    đa dạng ở nhiều loại sách và người đọc.
                </Typography>

                <Box sx={{
                    pt: 3,
                    pb: 5,
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                </Box>


                <HomLists data={bookSuccess} />
            </Container>

        </>
    );
}
