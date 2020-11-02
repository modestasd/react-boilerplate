import { css } from 'styled-components';

export const DEVICE_SIZE = {
  PHONE: 'phone',
  TABLET_PORT: 'tablet-port',
  TABLET_LAND: 'tablet-land',
  BIG_DESKTOP: 'big-desktop',
};

//Example usage with passed theme
// ${responsive(DEVICE_SIZE.BIG_DESKTOP, 
//     ({theme}) => `
//         color: ${theme.blue};
//     `
// )}

export const responsive = (device, style) => {
  let mixin;
  switch (device) {
    case DEVICE_SIZE.PHONE: // 600px
      mixin = css`
        @media only screen and (max-width: 37.5rem) {
          ${style}
        }
      `;
      break;
    case DEVICE_SIZE.TABLET_PORT: // 900px
      mixin = css`
        @media only screen and (max-width: 56.25rem) {
          ${style}
        }
      `;
      break;
    case DEVICE_SIZE.TABLET_LAND: // 1100px
      mixin = css`
        @media only screen and (max-width: 68.75rem) {
          ${style}
        }
      `;
      break;
    case DEVICE_SIZE.BIG_DESKTOP: // 1800px
      mixin = css`
        @media only screen and (min-width: 112.5rem) {
          ${style}
        }
      `;
      break;
    default:
      break;
  }
  return mixin;
};
