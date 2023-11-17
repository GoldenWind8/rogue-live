import React from 'react';
import styled from 'styled-components';

import { Position } from '../../typings/position';

interface Props {
  imageSrc: string;
  pixelDimensions: number;
  position: Position;
}

const Wrapper = styled.div<Props>`
  width: ${(p) => p.pixelDimensions}px;
  height: ${(p) => p.pixelDimensions}px;
  background: url(${(p) => p.imageSrc}) no-repeat;
  image-rendering: pixelated;
  background-position: ${(p) => -p.position[0] * p.pixelDimensions}px
    ${(p) => -p.position[1] * p.pixelDimensions}px;
`;

export const Sprite: React.FC<Props> = (props) => {
  return <Wrapper {...props} />;
};
