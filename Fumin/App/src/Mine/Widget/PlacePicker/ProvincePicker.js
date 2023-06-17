//选择省份

import React from 'react';
import Picker from './Picker';

const ProvincePicker = ({provinces, onProvinceChange}) => {
  const items = provinces.map((province) => ({
    label: province.name,
    value: province.id,
  }));

  return (
    <Picker
      items={items}
      onValueChange={onProvinceChange}
      placeholder="请选择省份"
    />
  );
};

export default ProvincePicker;
