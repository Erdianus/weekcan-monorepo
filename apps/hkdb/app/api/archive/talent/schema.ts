import { Category } from '../category/schema';
import { Skill } from '../skill/schema';

const contactItems = [
  { label: 'Phone', value: 'phone' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'X', value: 'x' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Tiktok', value: 'tiktok' },
  { label: 'Website', value: 'web' },
];

type Talent = {
  id: number;
  name: string;
  birth_date?: string | null;
  about: string;
  category_id: string;
  slug: string;
  category_name: string;
  skill: Skill[];
  category: Category;
  experience: {
    id: number;
    talent_id: string;
    title: string;
    from: string;
    to: string;
    detail: string;
  }[];
  education: {
    id: number;
    talent_id: string;
    title: string;
    from: string;
    to: string;
    detail: string;
  }[];
  contact: {
    id: number;
    talent_id: string;
    type: string;
    contacts: string;
  }[];
};

export type { Talent };
export { contactItems };
