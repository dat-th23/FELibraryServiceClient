import { useState, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { BoxProps, Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getProducts } from '../../../redux/slices/product';
// @types
import { IProductFilter } from '../../../@types/product';
// components
import FormProvider from '../../../components/hook-form';
import { useSettingsContext } from '../../../components/settings';
// sections
import HomeBookList from './HomeBookList';
import { IBook } from '../../../@types/books';
// ----------------------------------------------------------------------
interface Props extends BoxProps {
    data: IBook[]
}
export default function EcommerceShopPage({ data }: Props) {
    const { themeStretch } = useSettingsContext();

    const dispatch = useDispatch();


    const { products, checkout } = useSelector((state) => state.product);

    const [openFilter, setOpenFilter] = useState(false);

    const defaultValues = {
        gender: [],
        category: 'All',
        colors: [],
        priceRange: [0, 200],
        rating: '',
        sortBy: 'featured',
    };

    const methods = useForm<IProductFilter>({
        defaultValues,
    });

    const {
        reset,
        watch,
        formState: { dirtyFields },
    } = methods;

    const isDefault =
        (!dirtyFields.gender &&
            !dirtyFields.category &&
            !dirtyFields.colors &&
            !dirtyFields.priceRange &&
            !dirtyFields.rating) ||
        false;

    const values = watch();


    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleResetFilter = () => {
        reset();
    };

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return (
        <>


            <FormProvider methods={methods}>
                <Container maxWidth={themeStretch ? false : 'lg'}>
                    <HomeBookList products={data} loading={!data.length && isDefault} />
                </Container>
            </FormProvider>
        </>
    );
}

// ----------------------------------------------------------------------


