import React, {Component, useState} from 'react';
import {Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props?.id || props?.items[0]?.value || null,
    };
  }

  // shouldComponentUpdate(nextProps) {
  //   if (!nextProps?.items?.length && !!this.props?.items?.length) {
  //     this.setState({
  //       selectedValue: 0,
  //     });
  //   }
  //   return true;
  // }

  render() {
    const {items, onValueChange, placeholder} = this.props;
    const {selectedValue} = this.state;
    return (
      <>
        <RNPickerSelect
          value={selectedValue}
          onValueChange={(value) => {
            console.log(value);
            onValueChange(value);
            this.setState({
              selectedValue: value,
            });
          }}
          items={items}
          placeholder={{label: placeholder, value: null}}
        />
      </>
    );
  }
}
// const Picker = ({items, onValueChange, placeholder}) => {
//   const [selectedValue, setSelectedValue] = useState(null);
//   console.log(selectedValue);
//   return (
//     <RNPickerSelect
//       value={selectedValue}
//       onValueChange={(value) => {
//         onValueChange(value);
//         setSelectedValue(value);
//       }}
//       items={items}
//       placeholder={{label: placeholder, value: null}}
//     />
//   );
// };

// export default Picker;
