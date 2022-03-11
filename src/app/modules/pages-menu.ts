import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [


  {
    title: 'Empleados',
    icon: 'people-outline',
    link: '/app/admin/user',
  }
];

export const MENU_ITEMS_PYME: NbMenuItem[] = [
  {
    title: 'Información',
    icon: 'home-outline',
    link: '/app/pyme/dashboard',
  },
];

export const MENU_ITEMS_TALENT: NbMenuItem[] = [
  {
    title: 'Información',
    icon: 'home-outline',
    link: '/app/talent/profile',
  },
];
