import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import {
    Box,
    Paper,
    ListItemButton,
} from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import TextMaxLine from '../../components/text-max-line';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
    {
        label: 'Managing your account',
        icon: '/assets/cate/cate-book1.png',
        href: '#',
    },
    {
        label: 'Managing your account2',
        icon: '/assets/cate/cate-book2.png',
        href: '#',
    },
    {
        label: 'Managing your account3',
        icon: '/assets/cate/cate-book3.png',
        href: '#',
    },
    {
        label: 'Managing your account4',
        icon: '/assets/cate/cate-book4.png',
        href: '#',
    },
];

// ----------------------------------------------------------------------

export default function FaqsCategory() {
    const isDesktop = useResponsive('up', 'md');

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!isDesktop) {
        return (
            <>
                <Box
                    component={MotionViewport}
                    gap={2.5}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(2, 1fr)',
                    }}
                    sx={{ mb: 15 }}
                >
                    {CATEGORIES.map((category) => (
                        <m.div key={category.label} variants={varFade().in}>
                            <CardDesktop category={category} />
                        </m.div>
                    ))}
                </Box>
            </>
        );
    }

    return (
        <Box
            component={MotionViewport}
            gap={2.5}
            display="grid"
            gridTemplateColumns={{
                md: 'repeat(4, 1fr)',
                lg: 'repeat(4, 1fr)',
            }}
            sx={{ mb: 15 }}
        >
            {CATEGORIES.map((category) => (
                <m.div key={category.label} variants={varFade().in}>
                    <CardDesktop category={category} />
                </m.div>
            ))}
        </Box>
    );
}

// ----------------------------------------------------------------------

type CardProps = {
    category: {
        label: string;
        icon: string;
    };
};

function CardDesktop({ category }: CardProps) {
    const { label, icon } = category;

    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 2,
                textAlign: 'center',
                borderColor: (theme) => alpha(theme.palette.grey[500], 0.12),
                '&:hover': {
                    boxShadow: (theme) => theme.customShadows.z24,
                },
            }}
        >
            <Image
                disabledEffect
                alt={icon}
                src={icon}

            />

        </Paper>
    );
}

// ----------------------------------------------------------------------

function CardMobile({ category }: CardProps) {
    const { label, icon } = category;

    return (
        <ListItemButton
            key={label}
            sx={{
                py: 2,
                maxWidth: 140,
                borderRadius: 1,
                textAlign: 'center',
                typography: 'body2',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                bgcolor: 'background.neutral',
            }}
        >
            <Image alt={icon} src={icon} />
        </ListItemButton>
    );
}
