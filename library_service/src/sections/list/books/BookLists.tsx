// @mui
import { Box, BoxProps, Pagination } from '@mui/material';
// @type
// import { IProduct } from '../../../@types/product';
import { IBook } from '../../../@types/books';
// components
import { SkeletonProductItem } from '../../../components/skeleton';
//
import BookCards from './BookCards';
import './BookLists.css';
// ----------------------------------------------------------------------

interface Props extends BoxProps {
    products: IBook[];
    loading: boolean;
    onPageChange: any;
    pageCount: number
}

export default function ShopProductList({ products, loading, onPageChange, pageCount, ...other }: Props) {


    return (
        <div>
            <Box
                gap={3}
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(, 1fr)',
                }}
                {...other}
            >
                {(loading ? [...Array(12)] : products).map((product, index) =>
                    product ? (
                        <BookCards key={product.id} product={product} />
                    ) : (
                        <SkeletonProductItem key={index} />
                    )
                )}



            </Box>
            <div className='paginate'>
                <div className='page'>
                    <Pagination count={pageCount} onChange={onPageChange} />
                </div>
            </div>
        </div>

    );
}
