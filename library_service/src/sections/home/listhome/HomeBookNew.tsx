import { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Paper, Avatar, BoxProps, Typography, CardHeader, Card, Link } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { fDateTime } from '../../../utils/formatTime';
// components
import Label from '../../../components/label';
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import Carousel, { CarouselArrows } from '../../../components/carousel';
import { IBook } from '../../../@types/books';
// ----------------------------------------------------------------------

type ItemProps = {
    id: string;
    name: string;
    avatar: string;
    bookdAt: Date | string | number;
    roomNumber: string;
    person: string;
    roomType: string;
    cover: string;
};

interface Props extends BoxProps {
    title?: string;
    subheader?: string;
    list: IBook[];
}

export default function BookingNewestBooking({ title, subheader, list, sx, ...other }: Props) {
    const theme = useTheme();

    const carouselRef = useRef<Carousel | null>(null);

    const carouselSettings = {
        dots: false,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        rtl: Boolean(theme.direction === 'rtl'),
        responsive: [
            {
                breakpoint: theme.breakpoints.values.lg,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: theme.breakpoints.values.md,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: theme.breakpoints.values.sm,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const handlePrev = () => {
        carouselRef.current?.slickPrev();
    };

    const handleNext = () => {
        carouselRef.current?.slickNext();
    };

    return (
        <Box sx={{ py: 2, ...sx }} {...other}>
            <CardHeader
                title={title}
                subheader={subheader}
                action={<CarouselArrows onNext={handleNext} onPrevious={handlePrev} />}
                sx={{
                    p: 0,
                    mb: 3,
                    '& .MuiCardHeader-action': { alignSelf: 'center' },
                }}
            />

            <Carousel ref={carouselRef} {...carouselSettings}>
                {list.map((item) => (
                    <BookingItem key={item.id} item={item} />
                ))}
            </Carousel>
        </Box>
    );
}

// ----------------------------------------------------------------------

type BookingItemProps = {
    item: IBook;
};

function BookingItem({ item }: BookingItemProps) {
    const { id, amount, author, borrowPrice, category, detail, language, price, publisher, status, subject, title,
        thumbnail } = item;
    const linkTo = PATH_PAGE.bookdetail(id);

    return (
        <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>


            <Card
                sx={{
                    '&:hover .add-cart-btn': {
                        opacity: 1,
                    },
                }}
            >
                <Box sx={{ position: 'relative', p: 1 }}>
                    {status && (
                        <Label
                            variant="filled"
                            color={(status === 'sale' && 'error') || 'info'}
                            sx={{
                                top: 16,
                                right: 16,
                                zIndex: 9,
                                position: 'absolute',
                                textTransform: 'uppercase',
                            }}
                        >
                            {status}
                        </Label>
                    )}

                    <Image alt={title} src={thumbnail} ratio="1/1" sx={{ borderRadius: 1.5 }} />
                </Box>

                <Stack spacing={2.5} sx={{ p: 3 }}>
                    <Link to={linkTo} component={RouterLink} color="inherit" variant="subtitle2" noWrap>
                        {title}
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">

                        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
                            <Box component="span">{fCurrency(price)}đ -</Box>
                            {borrowPrice && (
                                <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                                    {fCurrency(borrowPrice)}đ
                                </Box>
                            )}


                        </Stack>
                    </Stack>
                </Stack>
            </Card>
        </Paper>
    );
}
