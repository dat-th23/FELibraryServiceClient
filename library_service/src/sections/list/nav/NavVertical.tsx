import { useEffect, useState } from 'react';
// @mui
import { Box, Stack, Drawer } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { NAV } from '../../../config';
// components
import { useSettingsContext } from '../../../components/settings';
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSectionVertical from './NavSectionVertical';
import axios from 'axios';
//

export default function NavVertical() {
    const [cate, setCate] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getAPIData = async () => {
            setLoading(true)
            try {
                const apiResponse = await axios.get('http://localhost:8080/api/categories', {
                    headers: {
                        //     "Access-Control-Allow-Origin": "*",
                        //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                    }
                });
                setCate(apiResponse?.data)
            } catch (error) {
            }
        };
        getAPIData()
        setLoading(false)
    }, [])
    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    pb: 2,
                    px: 2.5,
                    flexShrink: 0,
                }}
            >

            </Stack>

            {!loading && <NavSectionVertical data={cate} />}
        </Scrollbar>
    );

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD },
            }}
        >
            <Box>
                {renderContent}
            </Box>

        </Box>
    );
}
