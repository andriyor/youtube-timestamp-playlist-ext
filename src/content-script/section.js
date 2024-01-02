import React from 'react';
import { format } from 'date-fns/format';

import { SectionForm } from './sectionForm';

export const Section = ({ playlist, onAddSection }) => {
  return (
    <div>
      {playlist?.sections?.map((section) => {
        return (
          <div key={section.title}>
            {section.title} {format(section.start * 1000, 'mm:ss')} -
            {format(section.start * 1000, 'mm:ss')}
          </div>
        );
      })}
      <SectionForm onAddSection={onAddSection} />
    </div>
  );
};
