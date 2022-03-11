import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [


  {
    title: 'Usuarios',
    icon: 'people-outline',
    link: '/app/admin/user',
  }
];

export const MENU_ITEMS_PYME: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/app/pyme/dashboard',
  },
  {
    title: 'Coeficiente TX',
    icon: 'book-open-outline',
    children: [
      {
        title: 'Realizar',
        link: '/app/pyme/diagnosis',
      },
      {
        title: 'Realizados',
        link: '/app/pyme/diagnosis/done',
      },
    ],
  },
  {
    title: 'Marketplace',
    icon: 'pricetags-outline',
    link: '/app/pyme/marketplace',
  },
];

export const MENU_ITEMS_TALENT: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/app/talent/dashboard',
  },
  {
    title: 'Coeficiente Tx',
    icon: 'book-open-outline',
    children: [
      {
        title: 'Realizar',
        link: '/app/talent/diagnosis',
      },
      {
        title: 'Realizados',
        link: '/app/talent/diagnosis/done',
      },
    ],
  },
  {
    title: 'Marketplace',
    icon: 'shopping-bag-outline',
    link: '/app/talent/marketplace',
  },

];
