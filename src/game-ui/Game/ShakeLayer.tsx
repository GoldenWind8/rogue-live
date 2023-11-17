import './shake.css';

import React, {ReactNode} from 'react';

import { ANIMATIONS_DURATION } from '../../constants/config';


// Extend the Props interface to include children of type ReactNode
interface Props {
  shake: boolean;
  round: number;
  children?: ReactNode; // children are optional and can be any valid React node
}

export const ShakeLayer: React.FC<Props> = (props) => {
  const [shakeClass, setShakeClass] = React.useState('');

  React.useEffect(() => {
    if (props.shake) {
      setShakeClass('shake');
      const timer = setTimeout(() => setShakeClass(''), ANIMATIONS_DURATION);
      return () => {
        clearTimeout(timer);
      };
    }
    setShakeClass('');
  }, [props.shake, props.round]);

  return <div className={shakeClass}>{props.children}</div>;
};
