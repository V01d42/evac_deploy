import axios from 'axios';

// レスポンスの型定義（例としてデータの一部のみを定義）
interface GeocodeResponse {
  features: Array<{
    place_name: string;
    geometry: {
      coordinates: [number, number];
    };
  }>;
}

// Geocode APIにリクエストを送る関数
async function fetchGeocode(
  query: string,
  country: string,
  language: string,
  accessToken: string
): Promise<GeocodeResponse> {
  const url = 'https://api.mapbox.com/search/geocode/v6/forward';
  const params = {
    q: query,
    country: country,
    language: language,
    access_token: accessToken
  };

  try {
    const response = await axios.get(url, { params });
    return response.data as GeocodeResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axiosエラーの場合
      console.error(`Failed to fetch geocode: ${error.message}`);
      if (error.response) {
        // サーバーがレスポンスを返した場合
        console.error(`Response data: ${JSON.stringify(error.response.data)}`);
      }
    } else {
      // それ以外のエラー
      console.error(`An unexpected error occurred: ${(error as Error).message}`);
    }
    throw error;
  }
}

// 使用例
const query = 'Tokyo Tower';
const country = 'JP';
const language = 'ja';
const accessToken = 'your_mapbox_access_token_here';

fetchGeocode(query, country, language, accessToken)
  .then(result => {
    console.log('Geocode result:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });