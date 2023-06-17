import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';

const Picker = ({items, onValueChange, placeholder}) => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <RNPickerSelect
      value={selectedValue}
      onValueChange={(value) => {
        setSelectedValue(value);
        onValueChange(value);
      }}
      items={items}
      placeholder={{label: placeholder, value: null}}
    />
  );
};

export default Picker;
