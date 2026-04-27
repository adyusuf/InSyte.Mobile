import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

const mockLogin = jest.fn();

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin, isLoading: false, user: null, logout: jest.fn() }),
}));

import LoginScreen from '../LoginScreen';

beforeEach(() => {
  mockLogin.mockReset();
});

describe('LoginScreen', () => {
  it('başlık ve form alanlarını render eder', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    expect(getByText('InSyte')).toBeTruthy();
    expect(getByText('Eğitim Değerlendirme Sistemi')).toBeTruthy();
    expect(getByPlaceholderText('example@example.com')).toBeTruthy();
    expect(getByPlaceholderText('Şifreniz')).toBeTruthy();
    expect(getByText('Giriş Yap')).toBeTruthy();
  });

  it('boş alanlarla giriş denenirse Alert gösterilir, login çağrılmaz', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText('Giriş Yap'));
    expect(alertSpy).toHaveBeenCalledWith('Hata', 'Email ve şifre gereklidir');
    expect(mockLogin).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it('email + şifre girilip butona basıldığında login fonksiyonu çağrılır', async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText('example@example.com'), 'admin@insyte.com');
    fireEvent.changeText(getByPlaceholderText('Şifreniz'), 'Admin@123');
    fireEvent.press(getByText('Giriş Yap'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin@insyte.com', 'Admin@123');
    });
  });
});
