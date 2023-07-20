import React, {useState} from 'react';
import ProvincePicker from './ProvincePicker';
import CityPicker from './CityPicker';
import DistrictPicker from './DistrictPicker';
import {View} from 'native-base';
import {StyleSheet, Text} from 'react-native';

const LocationPicker = ({
  provinces,
  cities,
  districts,
  onLocationChange,
  placeId,
  cityId,
  quId,
}) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState(placeId || 0);
  const [selectedCityId, setSelectedCityId] = useState(cityId || 0);
  const [selectedDistrictId, setSelectedDistrictId] = useState(quId || null);

  const handleProvinceChange = (provinceId) => {
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
      <View style={styles.box}>
        <Text>
          {provinces.map((item) => {
            if (item.id === placeId) {
              return item.name;
            }
            return null;
          })}
        </Text>
        <View style={styles.pickBox}>
          <ProvincePicker
            provinces={provinces}
            onProvinceChange={handleProvinceChange}
            id={placeId}
          />
        </View>
      </View>
      {!!selectedProvinceId && cities.length > 0 && (
        <>
          <View style={styles.box}>
            <Text>
              {cities.map((item) => {
                if (item.id === cityId) {
                  return item.name;
                }
                return null;
              })}
            </Text>
            <View style={styles.pickBox}>
              <CityPicker
                cities={cities}
                onCityChange={handleCityChange}
                provinceId={selectedProvinceId}
                id={cityId}
              />
            </View>
          </View>
          {!!selectedCityId && cities.length > 0 && (
            <View style={styles.box}>
              <Text>
                {districts.map((item) => {
                  if (item.id === quId) {
                    return item.name;
                  }
                  return null;
                })}
              </Text>
              <View style={styles.pickBox}>
                <DistrictPicker
                  districts={districts}
                  onDistrictChange={handleDistrictChange}
                  id={quId}
                />
              </View>
            </View>
          )}
        </>
      )}

      {/* {!!selectedProvinceId && cities.length > 0 && (
        <>
          <CityPicker
            cities={cities}
            onCityChange={handleCityChange}
            provinceId={selectedProvinceId}
            id={cityId}
          />
          {!!selectedCityId && districts.length > 0 && (
            <DistrictPicker
              districts={districts}
              onDistrictChange={handleDistrictChange}
              cityId={selectedCityId}
              id={quId}
            />
          )}
        </>
      )} */}
    </>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 30,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    marginTop: 10,
  },
  pickBox: {
    width: '100%',
    height: '100%',
    opacity: 0,
    position: 'absolute',
  },
});
