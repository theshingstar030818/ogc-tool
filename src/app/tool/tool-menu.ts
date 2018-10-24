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
    title: 'Settings',
    icon: 'ion-gear-b',
    link: '/tools/settings',
  },
  {
    title: 'Price Book',
    icon: 'nb-list',
    link: '/tools/price-book',
  }
];
