import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import TagIcon from '@mui/icons-material/Tag';
import GroupsIcon from '@mui/icons-material/Groups';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },

  {
    title: 'users',
    path: '/dashboard/users',
    icon: getIcon(peopleFill)
  },
  {
    title: 'agent',
    path: '/dashboard/agents',
    icon: getIcon(peopleFill)
  },
  {
    title: 'teams',
    path: '/dashboard/teams',
    icon: <GroupsIcon />
  },
  {
    title: 'tags',
    path: '/dashboard/tags',
    icon: <TagIcon />
  }
];

export default sidebarConfig;
