import React, { useEffect, useState, useMemo } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import styles from './TopPage.module.scss';
import { shelterRepository } from '@/libs/repository/firebase';
import { fetchGeocode } from '@/libs/services/getCoordinate';
import { FlexBox, Typography } from '@/components/common';

type Pin = {
  title: string;
  score: number;
  address: string;
  longitude: number;
  latitude: number;
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(Math.max(0, rating));
  const halfStar = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = Math.max(0, 5 - fullStars - halfStar);

  return (
    <div className={styles.stars}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className={styles.fullStar}>
          ★
        </span>
      ))}
      {halfStar === 1 && <span className={styles.halfStar}>☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i} className={styles.emptyStar}>
          ☆
        </span>
      ))}
    </div>
  );
};

// Haversine formula
const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; //Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon1 - lon2) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const TopPage: React.FC = () => {
  const [pinList, setPinList] = useState<Pin[]>([]);
  const [popupInfo, setPopupInfo] = useState<Pin | null>(null);
  const [inputAddress, setInputAddress] = useState('');
  const [inputLocation, setInputLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [topShelters, setTopShelters] = useState<Pin[]>([]);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedShelter = await shelterRepository.list();

      const pinsData: Pin[] = await Promise.all(
        fetchedShelter.map(async (shelter) => {
          return {
            title: shelter.name,
            score: shelter.score,
            address: shelter.address,
            latitude: shelter.coordinates.latitude,
            longitude: shelter.coordinates.longitude,
          };
        }),
      );

      setPinList(pinsData);
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (inputAddress) {
      const { latitude, longitude } = await fetchGeocode(
        inputAddress,
        'JP',
        'ja',
        import.meta.env.VITE_MAPBOX_TOKEN,
      );
      setInputLocation({ latitude, longitude });
      setSearchClicked(true);
    }
  };

  useEffect(() => {
    if (inputLocation) {
      const sheltersWithin5Km = pinList.filter((pin) => {
        const distance = haversineDistance(
          inputLocation.latitude,
          inputLocation.longitude,
          pin.latitude,
          pin.longitude,
        );
        return distance <= 5;
      });

      const sortedShelters = sheltersWithin5Km.sort(
        (a, b) => b.score - a.score,
      );
      setTopShelters(sortedShelters.slice(0, 5));
    }
  }, [inputLocation, pinList]);

  const pins = useMemo(
    () =>
      pinList.map((data, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={data.longitude}
          latitude={data.latitude}
          anchor='bottom'
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(data);
          }}
        >
          {popupInfo?.title === data.title && (
            <Popup
              longitude={data.longitude}
              latitude={data.latitude}
              anchor='top'
              closeOnClick={false}
              onClose={() => setPopupInfo(null)}
              className={styles.popup}
            >
              <div>
                <h4>{data.title}</h4>
                <p>評価: {renderStars(data.score)}</p>
                <p>住所: {data.address}</p>
              </div>
            </Popup>
          )}
        </Marker>
      )),
    [pinList, popupInfo],
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>避難所マップ</div>
      <div className={styles.mapContainer}>
        <Map
          initialViewState={{
            longitude: 140.95831,
            latitude: 38.235424,
            zoom: 12,
          }}
          style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
          mapStyle='mapbox://styles/mapbox/streets-v12'
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
          {pins}
          <NavigationControl />
        </Map>
      </div>
      <div className={styles.rankingContainer}>
        <div className={styles.bg} />
        <FlexBox justifyContent='center' gap='8px'>
          <div className={styles.title}>避難所検索機能</div>
        </FlexBox>
        <FlexBox
          flexDirection='column'
          gap='8px'
          className={styles.inputContainer}
        >
          <FlexBox gap='24px'>
            <input
              type='text'
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              placeholder='住所を入力してください'
              className={styles.input}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              <Typography color='w1' fontSize='12px'>
                検索
              </Typography>
            </button>
          </FlexBox>
          <Typography fontWeight={300} fontSize='12px' color='b2'>
            入力した住所の半径5km以内の避難所Top5を表示します
          </Typography>
        </FlexBox>

        {searchClicked && topShelters.length > 0 ? (
          <div className={styles.topShelters}>
            <Typography
              fontWeight={600}
              fontSize='20px'
              className={styles.shelterTitle}
            >
              5km以内の避難所
            </Typography>
            {topShelters.map((shelter, index) => (
              <div key={index} className={styles.shelterInfo}>
                <FlexBox
                  flexDirection='column'
                  gap='4px'
                  className={styles.shelterCard}
                >
                  <Typography fontWeight={600} fontSize='16px'>
                    {shelter.title}
                  </Typography>
                  <Typography fontSize='12px'>評価: {shelter.score}</Typography>
                  <Typography fontSize='12px'>
                    住所: {shelter.address}
                  </Typography>
                </FlexBox>
              </div>
            ))}
          </div>
        ) : (
          <FlexBox justifyContent='center' className={styles.noResult}>
            <Typography color='b3' fontWeight={600} fontSize='20px'>
              検索結果なし
            </Typography>
          </FlexBox>
        )}
      </div>
    </div>
  );
};

export default TopPage;
