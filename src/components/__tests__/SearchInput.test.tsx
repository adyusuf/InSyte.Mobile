import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  it('verilen placeholder\'ı gösterir', () => {
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={() => {}} placeholder="Okul ara..." />,
    );
    expect(getByPlaceholderText('Okul ara...')).toBeTruthy();
  });

  it('default placeholder "Ara..." olur', () => {
    const { getByPlaceholderText } = render(<SearchInput value="" onChangeText={() => {}} />);
    expect(getByPlaceholderText('Ara...')).toBeTruthy();
  });

  it('text değiştiğinde onChangeText çağrılır', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={onChangeText} placeholder="Ara..." />,
    );
    fireEvent.changeText(getByPlaceholderText('Ara...'), 'anadolu');
    expect(onChangeText).toHaveBeenCalledWith('anadolu');
  });
});
