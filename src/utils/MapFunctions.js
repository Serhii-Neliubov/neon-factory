export function createCustomMarkerElement() {
  let element = document.createElement("div");
  element.className = "custom-marker";
  element.style.backgroundImage = "url(pin.png)";
  element.style.width = "32px"; // Установите желаемую ширину и высоту маркера
  element.style.height = "32px";

  return element;
}

export function removeCustomMarker() {
  // Get the custom marker element
  let customMarker = document.querySelector(".custom-marker");

  // Remove the custom marker from the map
  if (customMarker) {
    customMarker.parentNode.removeChild(customMarker);
  }
}

export function toggleDistrictsVisibility(selectedDistricts, map) {
  var districtsToShow = [];

  if (selectedDistricts.length === 0) {
    // districtsToShow.push(["!=", ["get", "sidebar_label"], ""]);
  } else {
    selectedDistricts.forEach(function (district) {
      districtsToShow.push(["==", ["get", "sidebar_label"], district]);
    });
  }

  map.setFilter("districts-brussels-0-2", ["any"].concat(districtsToShow));

  // Обновите карту
  map.triggerRepaint();
}

export function toggleButton(data, selectedDistricts, map) {
  const districtIndex = selectedDistricts.indexOf(data);

  if (districtIndex === -1) {
    // Если район не выбран, добавьте его в список
    selectedDistricts.push(data);
  } else {
    // Если район уже выбран, удалите его из списка
    selectedDistricts.splice(districtIndex, 1);
  }
  // Переключите видимость всех районов
  toggleDistrictsVisibility(selectedDistricts, map);
}

export function changeColor(selectedColor, mapboxgl, draw) {
  if (mapboxgl.accessToken !== "" && typeof draw === "object") {
    // Установите выбранный цвет для выбранной фигуры
    draw.setFeatureProperty(mapboxgl.accessToken, "portColor", selectedColor);

    // Обновите фигуру на карте
    var feat = draw.get(mapboxgl.accessToken);
    draw.add(feat);
  }
}
