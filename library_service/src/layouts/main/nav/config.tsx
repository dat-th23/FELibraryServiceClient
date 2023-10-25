// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../../routes/paths';
// config
import { PATH_AFTER_LOGIN } from '../../../config';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Trang chủ',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Danh mục',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.danhmuc,
    // children: [
    //   {
    //     subheader: 'Other',
    //     items: [
    //       { title: 'About us', path: PATH_PAGE.about },
    //       { title: 'Contact us', path: PATH_PAGE.contact },
    //       { title: 'FAQs', path: PATH_PAGE.faqs },
    //       { title: 'Pricing', path: PATH_PAGE.pricing },
    //       { title: 'Payment', path: PATH_PAGE.payment },
    //       { title: 'Maintenance', path: PATH_PAGE.maintenance },
    //       { title: 'Coming Soon', path: PATH_PAGE.comingSoon },
    //     ],
    //   },
    //   {
    //     subheader: 'Authentication',
    //     items: [
    //       { title: 'Login', path: PATH_AUTH.loginUnprotected },
    //       { title: 'Register', path: PATH_AUTH.registerUnprotected },
    //       { title: 'Reset password', path: PATH_AUTH.resetPassword },
    //       { title: 'Verify code', path: PATH_AUTH.verify },
    //     ],
    //   },
    //   {
    //     subheader: 'Error',
    //     items: [
    //       { title: 'Page 403', path: PATH_PAGE.page403 },
    //       { title: 'Page 404', path: PATH_PAGE.page404 },
    //       { title: 'Page 500', path: PATH_PAGE.page500 },
    //     ],
    //   },
    //   {
    //     subheader: 'Dashboard',
    //     items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
    //   },
    // ],
  },
  {
    title: 'About Us',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_PAGE.about,
  },
  {
    title: 'Profile',
    icon: <Iconify icon="mdi:account" />,
    path: PATH_PAGE.profile,
  },
  {
    title: 'Thue Sach',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_PAGE.rental,
  },


];

export default navConfig;
