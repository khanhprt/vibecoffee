import { useEffect, useState } from "react";

export function useGeolocation() {
  const [state, setState] = useState({ coords: null, error: null, loading: true });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ coords: null, error: "Trinh duyet khong ho tro GPS", loading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => setState({ coords: position.coords, error: null, loading: false }),
      (error) => setState({ coords: null, error: error.message, loading: false }),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return state;
}
