import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from '../../redux/store';
import { getBook, addToCart, gotoStep, decreaseQuantity } from '../../redux/slices/book';
// @mui
import { Box, Link, Stack, Button, Rating, Divider, Typography, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../utils/formatNumber';
// @types
// import { IProduct, ICheckoutCartItem } from '../../@types/product';
import { IBook, ICheckoutCartItem } from '../../@types/books';
// _mock
import { _socials } from '../../_mock/arrays';

// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import { IncrementerButton } from '../../components/custom-input';
import FormProvider, { RHFSelect } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';

import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { date } from 'yup';
import moment from 'moment'
import { format } from 'date-fns';
// ----------------------------------------------------------------------


type Props = {
    product: IBook;
    cart: ICheckoutCartItem[];
    onAddCart: (cartItem: ICheckoutCartItem) => void;
    onGotoStep: (step: number) => void;
};

export default function ProductDetailsSummary({
    cart,
    product,
    onAddCart,
    ...other
}: Props) {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const now = new Date();
    var tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const [edit_check_date, set_edit_check_date] = useState<Date | null>(new Date());
    const [edit_return_date, set_edit_return_date] = useState<Date | null>(tomorrow);
    const [countDate1, setCountDate] = useState<number>();
    const [countQuan, setCountQuan] = useState<number>();

    let dateBorrow1: any = moment(edit_check_date).format("MM/DD/YYYY");
    let dateReturn1: any = moment(edit_return_date).format("MM/DD/YYYY");
    // let du = moment.duration(dateBorrow.diff(dateReturn))

    let dateBorrow: any = moment(edit_check_date);
    let dateReturn: any = moment(edit_return_date);

    let totalDays: number = Math.ceil((dateReturn - dateBorrow) / (1000 * 3600 * 24));
    useEffect(() => {
        setCountDate(totalDays)
    }, [dateBorrow, dateReturn])

    const { id, amount, author, borrowPrice, category, detail, language, price, publisher, status, subject, title,
        thumbnail } = product;
    const dispatch = useDispatch();
    useEffect(() => {
        if (title) {
        }
    }, [dispatch, title]);

    const defaultValues = {
        id,
        detail,
        amount,
        borrowPrice,
        price,
        thumbnail,
        countDate: countDate1,
        borrow_At: dateBorrow1,
        return_At: dateReturn1,
        quantity: amount <= 1 ? 0 : 1,
    };

    const methods = useForm<ICheckoutCartItem>({
        defaultValues
    });

    const { reset, watch, control, setValue, handleSubmit } = methods;

    const values = watch();

    useEffect(() => {
        if (product) {
            reset(defaultValues);
        }
    }, [product]);

    const onSubmit = async (data: any) => {
        try {
            // if (!alreadyProduct) {
            onAddCart({
                ...data,
                count: (amount - 1),
                quantity: data.quantity,
                countDate: countDate1,
                borrow_At: dateBorrow1,
                return_At: dateReturn1,
                subtotalBorrow: data.borrowPrice * data.quantity * data.countDate * (countDate1 ? countDate1 : 0),
                subtotalPrice: data.price * data.quantity,
            });
            enqueueSnackbar(`Thêm thành công`);
            // setCountQuan()
            // window.location.reload();
        } catch (error) {
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack
                spacing={3}
                sx={{
                    p: (theme) => ({
                        md: theme.spacing(5, 5, 0, 2),
                    }),
                }}
                {...other}
            >
                <Stack spacing={2}>
                    <Label
                        variant="soft"
                        color={status === 'AVAILABLE' ? 'success' : 'error'}
                        sx={{ textTransform: 'uppercase', mr: 'auto' }}
                    >
                        {sentenceCase(status || '')}
                    </Label>

                    <Typography variant="h5">{detail}</Typography>

                    <Typography variant="h6">
                        Giá sách: {fCurrency(price)}đ
                    </Typography>
                    <Typography variant="subtitle2">
                        Giá thuê sách: {fCurrency(borrowPrice)}đ / 1 ngày
                    </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle2">Tác giả/ Dịch giả</Typography>
                    <Typography variant="inherit">{author}</Typography>

                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle2">Nhà xuất bản</Typography>
                    <Typography variant="inherit">{publisher}</Typography>

                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle2">Thể loại</Typography>
                    <Typography variant="inherit">{category?.name}</Typography>

                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />
                <Controller
                    name="borrow_At"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <DatePicker
                            label="Ngày thuê"
                            minDate={now}
                            value={edit_check_date}
                            onChange={(newValue) => {
                                set_edit_check_date(newValue)
                            }}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                            )}
                        />
                    )}
                />

                <Controller
                    name="return_At"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <DatePicker
                            label="Ngày trả"
                            value={edit_return_date}
                            minDate={edit_return_date ? edit_return_date : tomorrow}
                            onChange={(newValue: any) => {
                                set_edit_return_date(newValue)
                            }}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                            )}
                        />
                    )}
                />
                <Stack direction="row" justifyContent="space-between">
                    <Typography
                        variant="subtitle2"
                        sx={{
                            height: 36,
                            lineHeight: '36px',
                        }}
                    >
                        Quantity
                    </Typography>

                    <Stack spacing={1}>
                        <IncrementerButton
                            name="quantity"
                            quantity={values.quantity < 1 ? 0 : values.quantity}
                            disabledDecrease={values.quantity <= 1}
                            disabledIncrease={values.quantity >= amount - 1}
                            onIncrease={() => setValue('quantity', values.quantity + 1)}
                            onDecrease={() => setValue('quantity', values.quantity - 1)}

                        />

                        <Typography
                            variant="caption"
                            component="div"
                            sx={{ textAlign: 'right', color: 'text.secondary' }}
                        >
                            Có sẵn: {amount - 1}
                        </Typography>
                    </Stack>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack direction="row" spacing={2}>
                    {
                        amount > 1 ?
                            (
                                <Button fullWidth size="large" type="submit" variant="contained">
                                    Thue Ngay
                                </Button>
                            )
                            :
                            (
                                <Button disabled fullWidth size="large" type="submit" variant="contained">
                                    Sach da het
                                </Button>)

                    }

                </Stack>

                {/* <Stack direction="row" alignItems="center" justifyContent="center">
                    {_socials.map((social) => (
                        <IconButton key={social.name}>
                            <Iconify icon={social.icon} />
                        </IconButton>
                    ))}
                </Stack> */}
            </Stack>
        </FormProvider>
    );
}
