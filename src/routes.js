import List from './components/views/List';
import Launch from './components/views/Launch';

const routes = [
  {
    path: '/',
    exact: true,
    component: List,
  },
  {
    path: '/launch/:mission_name',
    component: Launch,
  },
];

export default routes;
