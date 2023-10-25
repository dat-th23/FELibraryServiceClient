import { StackProps, ListItemButtonProps } from '@mui/material';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';

// ----------------------------------------------------------------------

export type INavItem = {
  item: NavListProps;
  depth: number;
  open?: boolean;
  active?: boolean;
  isExternalLink?: boolean;
};

export type NavItemProps = INavItem & ListItemButtonProps;

export type NavListProps = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
};

export interface NavSectionProps extends StackProps {
  data: {
    subheader: string;
    items: NavListProps[];
  }[];
}
export type NavCateProps = {
  id: number;
  cate: string;
};

export type NavListCateProps = {
  cate: string;
};
