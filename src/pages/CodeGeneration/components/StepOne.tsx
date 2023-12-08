import { CheckCard } from '@ant-design/pro-components';
import React from 'react';

const StepOne: React.FC = ({ setGroupId, templateData, groupId }) => {
  return (
    <CheckCard.Group
      onChange={(value) => {
        setGroupId(value);
      }}
      defaultValue={groupId}
    >
      {templateData &&
        templateData.map((item) => {
          return <CheckCard key={item.id} title={item.name} value={item.id} />;
        })}
    </CheckCard.Group>
  );
};

export default StepOne;
