import { responsive, DEVICE_SIZE } from '../styleHelpers';

describe('styleHelpers', () => {
  it('returns mobile screen media and passed style', () => {
    const style = responsive(
      DEVICE_SIZE.PHONE,
      `
        display: none;
        padding: 1rem;
    `
    );
    expect(style.indexOf('max-width: 37.5rem')).not.toBeUndefined();
    expect(style.indexOf('display: none;')).not.toBeUndefined();
    expect(style.indexOf('padding: 1rem;')).not.toBeUndefined();
  });

  it('returns undefined on not existing device', () => {
    const style = responsive(
      'TEST Device',
      `
        display: none;
        padding: 1rem;
    `
    );
    expect(style).toBeUndefined();
  });
});
