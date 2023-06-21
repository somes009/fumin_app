//选择城市

import React, {useState, useEffect} from 'react';
import Picker from './Picker';

const CityPicker = ({cities, onCityChange, provinceId, selectedProvinceId}) => {
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    setFilteredCities(
      cities.map((city) => ({
        label: city.name,
        value: city.id,
      })),
    );
  }, [cities, provinceId]);
  return (
    <>
      {!!filteredCities.length && (
        <Picker
          items={filteredCities}
          onValueChange={onCityChange}
          placeholder="请选择城市"
        />
      )}
    </>
  );
};

export default CityPicker;
