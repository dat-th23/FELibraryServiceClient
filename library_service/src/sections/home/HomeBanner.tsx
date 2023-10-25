import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled, useTheme, alpha, } from '@mui/material/styles';
import {
    Box,
    Paper,
    ListItemButton,
    Container,
    Stack
} from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
    {
        label: 'Managing your account',
        icon: 'https://adcbook.net.vn/web/image/website.banner/59/image_1024?unique=bd59355',
        href: '#',
    },
    {
        label: 'Managing your account2',
        icon: 'https://adcbook.net.vn/web/image/website.banner/60/image_1024?unique=cf5b013',
        href: '#',
    },

];
const StyledRoot = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.grey[300],

}));
// ----------------------------------------------------------------------

export default function FaqsCategory() {
    const isDesktop = useResponsive('up', 'md');

    const [open, setOpen] = useState(false);

    if (!isDesktop) {
        return (
            <>
                <Box
                    component={MotionViewport}
                    gap={2.5}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
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
        <StyledRoot>
            <Container>
                <Box
                    component={MotionViewport}
                    gap={2.5}
                    display="grid"
                    gridTemplateColumns={{
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(2, 1fr)',
                    }}
                    sx={{ mb: 10, paddingTop: 2.5, paddingBottom: 1 }}
                >

                    {CATEGORIES.map((category) => (
                        <m.div key={category.label} variants={varFade().in}>
                            <CardDesktop category={category} />
                        </m.div>
                    ))}

                </Box>
            </Container>
        </StyledRoot>
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
        <Stack component={m.div} variants={varFade().inUp} alignItems="center">
            <m.div
                animate={{
                    y: [-10, 0, -10],
                }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <Image
                    disabledEffect
                    alt={icon}
                    src={icon}
                />
            </m.div>
        </Stack>
    );
}


