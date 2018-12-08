import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Projects',
    icon: 'ion-folder',
    link: '/tools/projects',
    pathMatch: '/tool/project',
    home: true,
  },
  {
    title: 'Price Book',
    icon: 'ion-gear-b',
    link: '/tools/price-book',
  },
  {
    title: 'Clients',
    icon: 'nb-list',
    link: '/tools/clients',
  },
  {
    title: 'Logout',
    icon: 'nb-angle-double-left',
    link: '/auth/logout',
  },
];
