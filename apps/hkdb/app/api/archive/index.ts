import { router } from 'react-query-kit';

import { category } from './category';
import { skill } from './skill';
import { talent } from './talent';

const archive = router('archive', {
  talent,
  category,
  skill,
});

export { archive };
