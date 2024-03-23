import { useEffect, useRef } from 'react';

interface useDistrictClickProps {
  map: mapboxgl.Map;
  showCadastre: boolean;
  resetLayerStyles: () => void;
}

const useDistrictClick = ({ map, showCadastre, resetLayerStyles }: useDistrictClickProps) => {
  const selectedFeaturesRef = useRef([]);

  useEffect(() => {
    const handleClick = (e) => {
      if (!showCadastre) return;

      const features = map.queryRenderedFeatures(e.point, {
        layers: ['custom-tileset-layer'],
      });

      if (features.length > 0) {
        const feature = features[0];
        const index = selectedFeaturesRef.current.indexOf(feature.properties.CaPaKey);

        if (index === -1) {
          selectedFeaturesRef.current.push(feature.properties.CaPaKey);
          map.setFeatureState(
            {
              source: 'custom-tileset-layer',
              sourceLayer: 'Bruxelles_Cadastre_complet-7xijuk',
              id: feature.id,
            },
            { selected: true }
          );
        } else {
          selectedFeaturesRef.current.splice(index, 1);
          map.setFeatureState(
            {
              source: 'custom-tileset-layer',
              sourceLayer: 'Bruxelles_Cadastre_complet-7xijuk',
              id: feature.id,
            },
            { selected: false }
          );
        }
      }
    };

    const handleIdle = () => {
      if (!showCadastre) return;

      if (selectedFeaturesRef.current.length === 0) {
        resetLayerStyles();
      } else {
        const lineColorExpression = [
          'match',
          ['to-string', ['get', 'CaPaKey']],
          ...selectedFeaturesRef.current.flatMap((feature) => [
            String(feature),
            'rgb(255,0,0)',
          ]),
          'rgba(255,255,255,0)',
        ];
        map.setPaintProperty(
          'custom-tileset-line-layer',
          'line-color',
          lineColorExpression
        );
      }
    };

    if (map) {
      map.on('click', 'custom-tileset-layer', handleClick);
      map.on('idle', handleIdle);

      return () => {
        map.off('click', 'custom-tileset-layer', handleClick);
        map.off('idle', handleIdle);
      };
    }
  }, [map, showCadastre, resetLayerStyles]);

  return null; // Возвращаем null, так как этот компонент не отрисовывает никаких элементов
};

export default useDistrictClick;
