import html2canvas from "html2canvas";
import React from "react";

const PrintScreen = ({
  mapTag,
  drawMenu,
  sreenLogo,
  colorPicker,
  menuStyle,
  sqmBox,
  rightTopMenu,
}) => {
  async function printScreenHandler() {
    // Спрячьте drawMenu
    drawMenu.style.display = "none";
    sreenLogo.style.display = "block";
    sqmBox.style.display = "none";
    // menuStyle.style.display = "none";
    rightTopMenu.style.display = "none";
    colorPicker.current.style.display = "none";
    // Сделайте снимок экрана с использованием html2canvas
    const canvas = await html2canvas(mapTag);

    // Восстановите видимость drawMenu
    drawMenu.style.display = "block";

    // Создайте ссылку на изображение в формате data URL
    const imgData = canvas
      .toDataURL("image/png")
      .replace(/^data:image\/[^;]/, "data:application/octet-stream");

    // Создайте элемент "a" для загрузки изображения
    const downloadLink = document.createElement("a");
    downloadLink.href = imgData;
    downloadLink.download = "screenshot.png"; // Имя файла для загрузки

    // Добавьте текст или стили для ссылки (необязательно)
    downloadLink.textContent = "Скачать снимок экрана";

    // Добавьте ссылку на страницу
    document.body.appendChild(downloadLink);

    // Нажмите на ссылку автоматически (требуется браузерная поддержка)
    downloadLink.click();

    // Удалите ссылку с DOM (если она больше не нужна)
    document.body.removeChild(downloadLink);
    sreenLogo.style.display = "none";
    colorPicker.current.style.display = "block";
    menuStyle.style.display = "flex";
    rightTopMenu.style.display = "block";
    sqmBox.style.display = "block";
  }

  return (
    <button onClick={printScreenHandler} className="PrintScreen">
      DOWNLOAD YOUR MAP
    </button>
  );
};

export default PrintScreen;
