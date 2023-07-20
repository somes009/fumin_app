//选择区县

import React, {useState, useEffect} from 'react';
import Picker from './Picker';

const DistrictPicker = ({districts, onDistrictChange, cityId, id}) => {
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  useEffect(() => {
    setFilteredDistricts(
      districts
        // .filter((district) => district.cityId === cityId)
        .map((district) => ({
          label: district.name,
          value: district.id,
        })),
    );
  }, [districts, cityId]);

  return (
    <>
      {!!filteredDistricts.length && (
        <Picker
          items={filteredDistricts}
          onValueChange={onDistrictChange}
          placeholder="请选择区县"
          id={id}
        />
      )}
    </>
    // <Picker
    //   items={filteredDistricts}
    //   onValueChange={onDistrictChange}
    //   placeholder="请选择区县"
    // />
  );
};

export default DistrictPicker;
