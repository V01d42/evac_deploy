import React, { useEffect } from 'react';

import { useState, useMemo } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import styles from './TopPage.module.scss';
import { shelterRepository } from '@/libs/repository/firebase';
import { onScroll } from '@/hooks/useScroll';

type Pin = {
  title: string;
  score: number;
  address: string;
  longitude: number;
  latitude: number;
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

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

const TopPage: React.FC = () => {
  const [pinList, setPinList] = useState<Pin[]>([]);
  const [popupInfo, setPopupInfo] = useState<Pin | null>(null);

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
            onScroll('container', 'bottom');
          }}
        />
      )),
    [pinList],
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>避難所マップ</div>
      <div className={styles.mapContainer}>
        <Map
          initialViewState={{
            longitude: 139.76711,
            latitude: 35.68074,
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

      <div id='container' className={styles.contentWrapper}>
        <div className={styles.infoTitle}>避難所情報</div>
        <p className={styles.subTitle}>備蓄の充実度合いが評価になります</p>
        <div className={styles.redFrameContainer}>
          <div className={styles.frameContent}>
            <div className={styles.name}>
              {popupInfo ? popupInfo.title : '未選択'}
            </div>
            <div className={styles.starsContainer}>
              <div>評価</div>
              {popupInfo ? renderStars(popupInfo.score) : '-'}
              <div>{popupInfo ? popupInfo.score : ''}</div>
            </div>
            <div className={styles.address}>
              住所：{popupInfo ? popupInfo.address : '未選択'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPage;
