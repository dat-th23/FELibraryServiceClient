import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Divider, } from '@mui/material';
// config
import { NAV } from '../../config';
// components
import Scrollbar from '../../components/scrollbar';
import NavVertical from './nav/NavVertical'
const dataCate = [
    {
        id: 1,
        cate: 'Truyện trinh thám'
    },
    {
        id: 2,
        cate: 'Truyện hài'
    },
    {
        id: 3,
        cate: 'Truyện ngụ ngôn'
    },
    {
        id: 4,
        cate: 'Truyện chính trị'
    },
    {
        id: 5,
        cate: 'Truyện văn học 1'
    },
    {
        id: 6,
        cate: 'Truyện văn học 2 '
    },
    {
        id: 7,
        cate: 'Truyện văn học 3'
    },
    {
        id: 8,
        cate: 'Truyện văn học 4'
    },
]

export default function NavLayout() {
    const theme = useTheme();
    return (
        <>
            <NavVertical />
        </>


    );
}


