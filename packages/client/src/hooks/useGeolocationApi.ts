import { useCallback, useState } from 'react';
import { PositionData } from '../Components/GeoPopup/types';

export const useGeolocationApi = () => {
  const [data, setData] = useState<PositionData | null>(null);
  const handleSuccess = useCallback(
    (event: GeolocationPosition) => {
      const { latitude, longitude } = event.coords;
      const message = `Ваши координатыsepДолгота: ${longitude}sepШирота: ${latitude}`;
      setData({ status: 'ok', message });
    },
    [setData],
  );
  const handleError = useCallback((error: GeolocationPositionError) => {
    const { code } = error;
    switch (code) {
      case GeolocationPositionError.TIMEOUT:
        setData({
          status: 'error',
          message: 'Время получения геолокации истекло',
        });
        break;
      case GeolocationPositionError.PERMISSION_DENIED:
        setData({
          status: 'error',
          message: 'Пользователь запретил отслеживание своей геопозиции',
        });
        break;
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        setData({
          status: 'error',
          message: 'Пользователь запретил отслеживание своей геопозиции',
        });
        break;
      default:
        setData({
          status: 'error',
          message: 'Неизвестная ошибка',
        });
    }
  }, []);
  const getUserPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, { enableHighAccuracy: false });
  }, []);
  return { data, setData, getUserPosition };
};
