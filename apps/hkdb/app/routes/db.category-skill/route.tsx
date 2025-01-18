import { Spacer } from '@nextui-org/react';

import { CategorySection } from './category';
import { SkillSection } from './skill';

export default function Page() {
  return (
    <>
      {/* Kategori */}
      <CategorySection />
      <Spacer y={10} />
      {/* Keahlian */}
      <SkillSection />
    </>
  );
}
