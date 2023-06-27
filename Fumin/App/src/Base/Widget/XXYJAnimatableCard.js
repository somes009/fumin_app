import React, {Component} from 'react';
import * as Animatable from 'react-native-animatable';
class XXYJAnimatableCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      animation,
      delay,
      style,
      duration,
      transition,
      getRef,
      iterationCount,
      easing,
    } = this.props;
    return (
      <Animatable.View
        ref={getRef}
        transition={transition}
        animation={animation}
        duration={duration}
        delay={delay}
        easing={easing}
        iterationCount={iterationCount}
        style={style}>
        {this.props.children}
      </Animatable.View>
    );
  }
}

XXYJAnimatableCard = Animatable.createAnimatableComponent(XXYJAnimatableCard);
export default XXYJAnimatableCard;
