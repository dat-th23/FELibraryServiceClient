import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Stack, Fab } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// redux
import { useDispatch } from '../../../redux/store';
import { addToCart } from '../../../redux/slices/product';
// @types
import { IBook } from '../../../@types/books';
// components
import Iconify from '../../../components/iconify';
import Label from '../../../components/label';
import Image from '../../../components/image';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

type Props = {
    product: IBook;
};

export default function ShopProductCard({ product }: Props) {
    // const { id, name, cover, price, colors, status, available, sizes, priceSale } = product;
    const { id, amount, author, borrowPrice, category, detail, language, price, publisher, status, subject, title,
        thumbnail } = product;

    const dispatch = useDispatch();

    // const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(name));
    const linkTo = PATH_PAGE.bookdetail(id);

    return (
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
                        color={(status === 'sale' && 'error') || 'error'}
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
    );
}
