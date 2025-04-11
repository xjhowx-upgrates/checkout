import S from "./styles.module.scss";

export const Button = (props) => {
  return <button type="submit" {...props} className={S.button}>Enviar Checkout</button>;
};
