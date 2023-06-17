import React, {useState} from 'react';
import ProvincePicker from './ProvincePicker';
import CityPicker from './CityPicker';
import DistrictPicker from './DistrictPicker';

const LocationPicker = ({provinces, cities, districts, onLocationChange}) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);

  const handleProvinceChange = (provinceId) => {
    console.log(provinceId);
    setSelectedProvinceId(provinceId);
    setSelectedCityId(null);
    setSelectedDistrictId(null);
    onLocationChange(1, provinceId);
  };

  const handleCityChange = (cityId) => {
    setSelectedCityId(cityId);
    setSelectedDistrictId(null);
    onLocationChange(2, cityId);
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrictId(districtId);
    onLocationChange(3, districtId);
  };

  return (
    <>
      <ProvincePicker
        provinces={provinces}
        onProvinceChange={handleProvinceChange}
      />
      {selectedProvinceId && cities.length > 0 && (
        <>
          <CityPicker
            cities={cities}
            onCityChange={handleCityChange}
            provinceId={selectedProvinceId}
          />
          {selectedCityId && districts.length > 0 && (
            <DistrictPicker
              districts={districts}
              onDistrictChange={handleDistrictChange}
              cityId={selectedCityId}
            />
          )}
        </>
      )}
    </>
  );
};

export default LocationPicker;
