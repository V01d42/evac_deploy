import axios from 'axios';

// search/geocode/v6/forward のレスポンスの型
interface GeocodeResponse {
  type: string;
  features: Array<{
    type: string;
    id: string;
    geometry: {
      type: string;
      coordinates: [number, number]; // [longitude, latitude]
    };
    properties: {
      mapbox_id: string;
      feature_type: string;
      full_address: string;
      name: string;
      name_preferred: string;
      coordinates: {
        longitude: number;
        latitude: number;
        accuracy: string;
      };
      place_formatted: string;
      reading: {
        'ja-Kana': string;
        'ja-Latn': string;
      };
      context: {
        block: { mapbox_id: string; name: string };
        locality: { mapbox_id: string; name: string };
        place: { mapbox_id: string; name: string };
        region: { mapbox_id: string; name: string };
        postcode: { mapbox_id: string; name: string };
        country: { mapbox_id: string; name: string; country_code: string; country_code_alpha_3: string };
      };
    };
  }>;
}


// URLSearchParams を使用してパラメータをエンコードする関数
function buildQueryParams(params: Record<string, string>): string {
  const urlParams = new URLSearchParams();
  for (const key in params) {
    urlParams.append(key, encodeURIComponent(params[key]));
  }
  return urlParams.toString();
}


// Mapbox Geocoding API にリクエストを送る関数
// input: query: 検索クエリ, country: 国コード, language: 言語コード, accessToken: アクセストークン
// output: { latitude: 緯度, longitude: 経度 }
export async function fetchGeocode(
  query: string,
  country: string,
  language: string,
  accessToken: string
): Promise<{ latitude: number; longitude: number }> {
  const baseUrl = 'https://api.mapbox.com/search/geocode/v6/forward';

  const params = {
    q: query,
    country: country,
    language: language,
    access_token: accessToken
  };
  const queryString = buildQueryParams(params);

  try {
    const response = await axios.get<GeocodeResponse>(`${baseUrl}?${queryString}`);

    // 最初のデータの緯度と経度を取得
    if (response.data.features.length > 0) {
      const { coordinates } = response.data.features[0].geometry;
      const longitude = coordinates[0];
      const latitude = coordinates[1];
      return { latitude, longitude };
    } else {
      return { latitude: 0, longitude: 0 };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Failed to fetch geocode: ${error.message}`);
      if (error.response) {
        console.error(`Response data: ${JSON.stringify(error.response.data)}`);
      }
    } else {
      console.error(`An unexpected error occurred: ${(error as Error).message}`);
    }
    throw error;
  }
}