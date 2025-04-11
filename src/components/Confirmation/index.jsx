import S from "./styles.module.scss";

export const Confirmation = ({ setShowModal }) => {
  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };
  return (
    <div className={S.modal}>
      <button className={S.modal__button} onClick={handleCloseModal}>
        X
      </button>
      <p className={S.modal__content}>Checkout efetuado com sucesso!</p>
      <div className={S.modal__image}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            id="SVGRepo_tracerCarrier"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="white"
              d="M20 7L9.00004 18L3.99994 13"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};
