import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('verilen başlığı ekrana basar', () => {
    const { getByText } = render(<Button title="Kaydet" onPress={() => {}} />);
    expect(getByText('Kaydet')).toBeTruthy();
  });

  it('basıldığında onPress çağrılır', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Gönder" onPress={onPress} />);
    fireEvent.press(getByText('Gönder'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('loading=true iken onPress çağrılmaz ve text görünmez', () => {
    const onPress = jest.fn();
    const { queryByText } = render(<Button title="Yükleniyor olmalı" onPress={onPress} loading />);
    expect(queryByText('Yükleniyor olmalı')).toBeNull();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('disabled=true iken onPress çağrılmaz', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Pasif" onPress={onPress} disabled />);
    fireEvent.press(getByText('Pasif'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
