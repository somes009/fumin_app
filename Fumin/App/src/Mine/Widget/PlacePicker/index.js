import React, {useState} from 'react';
import ProvincePicker from './ProvincePicker';
import CityPicker from './CityPicker';
import DistrictPicker from './DistrictPicker';
import {View} from 'native-base';
import {StyleSheet, Text} from 'react-native';
import Fonts from '../../../../Common/Fonts';

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
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={[styles.text, {color: !placeId ? '#6D7278' : '#000'}]}>
          {!placeId
            ? '省'
            : provinces.map((item) => {
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
            <Text style={[styles.text, {color: !cityId ? '#6D7278' : '#000'}]}>
              {!cityId
                ? '市'
                : cities.map((item) => {
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
              <Text style={[styles.text, {color: !quId ? '#6D7278' : '#000'}]}>
                {!quId
                  ? '区'
                  : districts.map((item) => {
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
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
  },
  box: {
    width: 150,
    height: 30,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    paddingLeft: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.PingFangSC_Regular,
    lineHeight: 19,
  },
  pickBox: {
    width: '100%',
    height: '100%',
    opacity: 0,
    position: 'absolute',
  },
});
