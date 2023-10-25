// @mui
import { List, Stack } from '@mui/material';
// locales
import { useLocales } from '../../../locales';
//
import { NavSectionProps } from '../types';
import NavList from './NavList';


export default function NavSectionVertical({ data, ...other }: NavSectionProps) {

  return (
    <Stack {...other}>
      {data.map((group) => {
        const key = group?.subheader || group.items[0].title;

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>


            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
              />
            ))}
          </List>
        );
      })}
    </Stack>
  );
}
