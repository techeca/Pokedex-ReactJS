import placeholderSrc from 'images/placeholderSrc.png';

 const ProgressiveImg = ({ src,...props }) => {

  return (
    <img
      //className={`image${loading ? " loading" : " loaded"}`}
      src={src}
      width="70%"
      height="80%"
      placeholder={placeholderSrc}
      alt={'pkmn'}
    />

  );
};

export default ProgressiveImg
