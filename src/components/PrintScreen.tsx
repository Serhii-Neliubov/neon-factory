import html2canvas from "html2canvas";
import React from "react";

const PrintScreen = ({ mapTag, drawMenu, sreenLogo, palette }) => {
  async function printScreenHandler() {
    // Спрячьте drawMenu
    drawMenu.style.display = "none";
    palette.style.display = "none";
    sreenLogo.style.display = "block";
    // Сделайте снимок экрана с использованием html2canvas
    const canvas = await html2canvas(mapTag);

    // Восстановите видимость drawMenu
    drawMenu.style.display = "block";

    // Создайте ссылку на изображение в формате data URL
    const imgData = canvas.toDataURL("image/png");

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
    palette.style.display = "block";
  }

  return (
    <button onClick={printScreenHandler} className="PrintScreen">
      Print Screen
    </button>
  );
};

export default PrintScreen;
