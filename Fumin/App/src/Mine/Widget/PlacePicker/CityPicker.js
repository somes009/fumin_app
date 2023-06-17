//选择城市

import React, {useState, useEffect} from 'react';
import Picker from './Picker';

const CityPicker = ({cities, onCityChange, provinceId}) => {
  const [filteredCities, setFilteredCities] = useState(cities);

  useEffect(() => {
    setFilteredCities(
      cities
        // .filter((city) => city.provinceId === provinceId)
        .map((city) => ({
          label: city.name,
          value: city.id,
        })),
    );
  }, [cities, provinceId]);
  return (
    <Picker
      items={filteredCities}
      onValueChange={onCityChange}
      placeholder="请选择城市"
    />
  );
};

export default CityPicker;
