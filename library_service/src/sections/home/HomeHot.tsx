import { m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography, Grid } from '@mui/material';
// _mock_
import { _carouselsMembers, _socials } from '../../_mock/arrays';
import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../_mock/arrays';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

import HomeBookNew from './listhome/HomeBookNew'
import axios from 'axios';
// ----------------------------------------------------------------------

export default function AboutTeam() {
    const [bookSuccess, setBookSuccess] = useState([])

    useEffect(() => {
        const data = async () => {
            const res = await axios.get('http://localhost:8080/api/books/best-seller/top?topNumber=5', {
                // headers: {
                //     "Access-Control-Allow-Origin": "*",
                //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                // }
            });
            setBookSuccess(res.data)
        }
        data();
    }, [])

    return (
        <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
            <m.div variants={varFade().inDown}>

            </m.div>

            <m.div variants={varFade().inUp}>
                <Typography variant="h3" sx={{ my: 3 }}>
                    TOP SẢN PHẨM ĐƯỢC THUÊ NHIỀU NHẤT <br />
                    2021
                </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
                <Typography
                    sx={{
                        mx: 'auto',
                        maxWidth: 640,
                        color: 'text.secondary',
                        pb: 5
                    }}
                >
                    Sau đây là danh sách các sản phẩm được các độc giả thuê nhiều nhất trong năm 2021,
                    đa dạng ở nhiều loại sách và người đọc.
                </Typography>
            </m.div>

            <Grid item xs={12}>
                <HomeBookNew
                    list={bookSuccess}
                />
            </Grid>


        </Container>
    );
}


