import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
(
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// DASHBOARD: GENERAL
export const GeneralAppPage = Loadable(lazy(() => import('../pages/dashboard/GeneralAppPage')));
export const GeneralEcommercePage = Loadable(
  lazy(() => import('../pages/dashboard/GeneralEcommercePage'))
);
export const GeneralAnalyticsPage = Loadable(
  lazy(() => import('../pages/dashboard/GeneralAnalyticsPage'))
);
export const GeneralBankingPage = Loadable(
  lazy(() => import('../pages/dashboard/GeneralBankingPage'))
);
export const GeneralBookingPage = Loadable(
  lazy(() => import('../pages/dashboard/GeneralBookingPage'))
);
export const GeneralFilePage = Loadable(lazy(() => import('../pages/dashboard/GeneralFilePage')));

// DASHBOARD: ECOMMERCE
export const EcommerceShopPage = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceShopPage'))
);
export const EcommerceProductDetailsPage = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductDetailsPage'))
);
export const EcommerceProductListPage = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductListPage'))
);
export const EcommerceProductCreatePage = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductCreatePage'))
);
export const EcommerceProductEditPage = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductEditPage'))
);
export const EcommerceCheckoutPage = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceCheckoutPage'))
);

// DASHBOARD: INVOICE
export const InvoiceListPage = Loadable(lazy(() => import('../pages/dashboard/InvoiceListPage')));
export const InvoiceDetailsPage = Loadable(
  lazy(() => import('../pages/dashboard/InvoiceDetailsPage'))
);
export const InvoiceCreatePage = Loadable(
  lazy(() => import('../pages/dashboard/InvoiceCreatePage'))
);
export const InvoiceEditPage = Loadable(lazy(() => import('../pages/dashboard/InvoiceEditPage')));

// DASHBOARD: USER
export const UserProfilePage = Loadable(lazy(() => import('../pages/dashboard/UserProfilePage')));
export const UserCardsPage = Loadable(lazy(() => import('../pages/dashboard/UserCardsPage')));
export const UserListPage = Loadable(lazy(() => import('../pages/dashboard/UserListPage')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/dashboard/UserCreatePage')));
export const UserEditPage = Loadable(lazy(() => import('../pages/dashboard/UserEditPage')));

// DASHBOARD: BLOG
export const BlogPostsPage = Loadable(lazy(() => import('../pages/dashboard/BlogPostsPage')));
export const BlogPostPage = Loadable(lazy(() => import('../pages/dashboard/BlogPostPage')));
export const BlogNewPostPage = Loadable(lazy(() => import('../pages/dashboard/BlogNewPostPage')));

// DASHBOARD: FILE MANAGER
export const FileManagerPage = Loadable(lazy(() => import('../pages/dashboard/FileManagerPage')));

// DASHBOARD: APP
export const ChatPage = Loadable(lazy(() => import('../pages/dashboard/ChatPage')));
export const MailPage = Loadable(lazy(() => import('../pages/dashboard/MailPage')));
export const CalendarPage = Loadable(lazy(() => import('../pages/dashboard/CalendarPage')));
export const KanbanPage = Loadable(lazy(() => import('../pages/dashboard/KanbanPage')));

// TEST RENDER PAGE BY ROLE
export const PermissionDeniedPage = Loadable(
  lazy(() => import('../pages/dashboard/PermissionDeniedPage'))
);

// BLANK PAGE
export const BlankPage = Loadable(lazy(() => import('../pages/dashboard/BlankPage')));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const FaqsPage = Loadable(lazy(() => import('../pages/FaqsPage')));
export const AboutPage = Loadable(lazy(() => import('../pages/AboutPage')));
export const Contact = Loadable(lazy(() => import('../pages/ContactPage')));
export const PricingPage = Loadable(lazy(() => import('../pages/PricingPage')));
export const PaymentPage = Loadable(lazy(() => import('../pages/PaymentPage')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));

export const ListPage = Loadable(lazy(() => import('../pages/ListPage')));
export const DetailBook = Loadable(lazy(() => import('../pages/DetailBook')));
export const RentalBook = Loadable(lazy(() => import('../pages/RentalBook')));
export const LoginPage1 = Loadable(lazy(() => import('../pages/LoginPage1')));
export const Profile = Loadable(lazy(() => import('../pages/Profile')));
// export const BookPostsPage = Loadable(lazy(() => import('../sections/list/BookPostsPage')));

// DEMO COMPONENTS
// ----------------------------------------------------------------------

export const ComponentsOverviewPage = Loadable(
  lazy(() => import('../pages/components/ComponentsOverviewPage'))
);
