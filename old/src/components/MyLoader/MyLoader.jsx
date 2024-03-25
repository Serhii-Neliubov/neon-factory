import loader from "/loader-img.jpg";
const MyLoader = () => {
  return <div className="loading__img">
    <img src={loader} alt="loading" />
  </div>;
};

export default MyLoader;
