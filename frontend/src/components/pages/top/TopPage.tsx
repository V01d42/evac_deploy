import React from 'react';

import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import styles from './TopPage.module.scss';
import redframe from '@/assets/red.png';
import { fetchGeocode } from '@/libs/services/getCoordinate'

// for testing
const TESTDATA = [
  {
    title: '東京タワー',
    latitude: 35.658621,
    longitude: 139.745435,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/TaroTokyo20110213-TokyoTower-01min.jpg/200px-TaroTokyo20110213-TokyoTower-01min.jpg',
  },
  {
    title: '皇居',
    latitude: 35.68530135769214,
    longitude: 139.75287460184867,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Kokyo0057.jpg/1920px-Kokyo0057.jpg',
  },
];

const TopPage: React.FC = () => {
  const navigate = useNavigate();
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
  const [popupInfo, setPopupInfo] = useState<{
    title: string;
    latitude: number;
    longitude: number;
    image: string;
  } | null>(null);

  const pins = useMemo(
    () =>
      TESTDATA.map((data, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={data.longitude}
          latitude={data.latitude}
          anchor='bottom'
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(data);
          }}
        />
      )),
    [],
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>近くにある避難所</div>
      <div style={{ position: 'relative', height: '500px', width: '100%' }}>
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
          {popupInfo && (
            <Popup
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              anchor='top'
              onClose={() => setPopupInfo(null)}
            >
              <div>
                {popupInfo.title} |{' '}
                <a
                  target='_new'
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.title}`}
                >
                  Wikipedia
                </a>
              </div>
              <img width='100%' src={popupInfo.image} />
            </Popup>
          )}
          <NavigationControl />
        </Map>
      </div>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.subtitle}>避難所情報</div>
          <div className={styles.redFrameContainer}>
            <img
              src={redframe}
              alt='Redframe'
              className={styles.redFrameImage}
            />
            <div className={styles.frameContent}>
              <div>避難所の名前</div>
              <div className={styles.starsContainer}>
                <div>避難レベル</div>
                {renderStars(3.5)}
                <div>3.5</div>
              </div>
              <div className={styles.address}>住所：。。。</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPage;

// import React, { useState, useEffect, useMemo } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
// import styles from './TopPage.module.scss';
// import { getShelterItems, getItemsFlashlight } from '../../services/firebaseMethods'; // Correct import path

// // for testing
// const TESTDATA = [
//   {
//     title: '東京タワー',
//     latitude: 35.658621,
//     longitude: 139.745435,
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/TaroTokyo20110213-TokyoTower-01min.jpg/200px-TaroTokyo20110213-TokyoTower-01min.jpg',
//   },
//   {
//     title: '皇居',
//     latitude: 35.68530135769214,
//     longitude: 139.75287460184867,
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Kokyo0057.jpg/1920px-Kokyo0057.jpg',
//   },
// ];

// const TopPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [popupInfo, setPopupInfo] = useState<{ title: string; latitude: number; longitude: number; image: string } | null>(null);
//   const [shelterItems, setShelterItems] = useState<{ [key: string]: number } | null>(null);
//   const [flashlightCount, setFlashlightCount] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchShelterItems = async () => {
//       const shelterId = '9sN3IpcObNUg0leUlwdI'; // Replace this with the actual shelter ID you want to use
//       const items = await getShelterItems(shelterId);
//       setShelterItems(items.flashlight || null); // Ensure items is an object or null
//       console.log('Shelter Items:', items);
//     };

//     const fetchFlashlightCount = async () => {
//       const shelterId = '9sN3IpcObNUg0leUlwdI'; // Replace this with the actual shelter ID you want to use
//       const count = await getItemsFlashlight(shelterId);
//       setFlashlightCount(count || null); // Ensure count is a number or null
//       console.log('Flashlight Count:', count);
//     };

//     fetchShelterItems();
//     fetchFlashlightCount();
//   }, []);

//   const pins = useMemo(
//     () =>
//       TESTDATA.map((data, index) => (
//         <Marker
//           key={`marker-${index}`}
//           longitude={data.longitude}
//           latitude={data.latitude}
//           anchor="bottom"
//           onClick={(e) => {
//             e.originalEvent.stopPropagation();
//             setPopupInfo(data);
//           }}
//         />
//       )),
//     []
//   );

//   return (
//     <div className={styles.container}>
//       <button onClick={() => navigate('/login')}>Log in</button>
//       <Link to="/login">
//         <p>管理者はこちら</p>
//       </Link>
//       <div style={{ position: 'relative', height: '500px', width: '100%' }}>
//         <Map
//           initialViewState={{
//             longitude: 139.76711,
//             latitude: 35.68074,
//             zoom: 12,
//           }}
//           style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
//           mapStyle="mapbox://styles/mapbox/streets-v12"
//           mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
//         >
//           {pins}
//           {popupInfo && (
//             <Popup
//               longitude={popupInfo.longitude}
//               latitude={popupInfo.latitude}
//               anchor="top"
//               onClose={() => setPopupInfo(null)}
//             >
//               <div>
//                 {popupInfo.title} |{' '}
//                 <a
//                   target="_new"
//                   href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.title}`}
//                 >
//                   Wikipedia
//                 </a>
//               </div>
//               <img width="100%" src={popupInfo.image} />
//             </Popup>
//           )}
//           <NavigationControl />
//         </Map>
//       </div>
//       {shelterItems && (
//         <div>
//           <h2>Shelter Items</h2>
//           <ul>
//             {Object.entries(shelterItems).map(([key, value]) => (
//               <li key={key}>
//                 {key}: {value}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {flashlightCount !== null && (
//         <div>
//           <h2>Flashlight Count</h2>
//           <p>{flashlightCount}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopPage;
