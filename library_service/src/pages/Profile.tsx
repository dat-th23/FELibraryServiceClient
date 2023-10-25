import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// auth
import { useAuthContext } from '../auth/useAuthContext';
// _mock_
import {
    _userAbout,
    _userFeeds,
    _userFriends,
    _userGallery,
    _userFollowers,
} from '../_mock/arrays';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices } from '../_mock/arrays';
// components
import Iconify from '../components/iconify';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import { useSettingsContext } from '../components/settings';
// sections
import {
    Profile,
    ProfileCover,
    ProfileChangePassword,
    // ProfileGallery,
    // ProfileFollowers,
} from '../sections/profile';

import AccountBilling from '../sections/profile/billing/AccountBilling'
import axios from 'axios';
// import Router from 'src/routes';
// import { Route } from 'react-router';
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

export default function UserProfilePage() {
    const navigate = useNavigate();
    const { themeStretch } = useSettingsContext();
    const token = localStorage.getItem("access_Token")
    const [profile, setProfile] = useState<Object | any>({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8080/api/user/profile", {
            headers: {
                "Authorization": "Bearer " + token,
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }

        }).then(results => results.json())
            .then(data => setProfile(data))
        setLoading(false)
    }, [])

    const { user } = useAuthContext();
    useEffect(() => {
        if (!user) {
            navigate('/auth/login')
        }
    }, [])

    const [currentTab, setCurrentTab] = useState('profile');

    const TABS = [
        {
            value: 'profile',
            label: 'Profile',
            icon: <Iconify icon="ic:round-account-box" />,
            component: <Profile info={_userAbout} posts={_userFeeds} />,
        },
        {
            value: 'billing',
            label: 'Billing',
            icon: <Iconify icon="ic:round-receipt" />,
            component: (
                <AccountBilling
                    cards={_userPayment}
                    addressBook={_userAddressBook}
                    invoices={_userInvoices}
                />
            ),
        },
        {
            value: 'change_password',
            label: 'Change password',
            icon: <Iconify icon="ic:round-vpn-key" />,
            component: (
                <ProfileChangePassword profile_email={profile?.email} />
            ),
        },
    ];

    return (
        <>
            <Helmet>
                <title> User: Profile | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>

                <Card
                    sx={{
                        mb: 3,
                        mt: 3,
                        height: 280,
                        position: 'relative',
                    }}
                >
                    {!loading && <ProfileCover name={profile?.username} role={'Admin'} cover={_userAbout?.cover} />}


                    <Tabs
                        value={currentTab}
                        onChange={(event, newValue) => setCurrentTab(newValue)}
                        sx={{
                            width: 1,
                            bottom: 0,
                            zIndex: 9,
                            position: 'absolute',
                            bgcolor: 'background.paper',
                            '& .MuiTabs-flexContainer': {
                                pr: { md: 3 },
                                justifyContent: {
                                    sm: 'center',
                                    md: 'flex-end',
                                },
                            },
                        }}
                    >
                        {TABS.map((tab) => (
                            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
                        ))}
                    </Tabs>
                </Card>

                {TABS.map(
                    (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
                )}
            </Container>
        </>
    );
}
