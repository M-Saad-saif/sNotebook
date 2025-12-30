export default function Alert(props) {
  const capitalizeFirstWord = (str) => {
    if (str === "danger") {
      return "Error";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <>
      <div>
        {props.alert && (
          <div className={`alert alert-${props.alert.type}`} role="alert">
            <strong>{capitalizeFirstWord(props.alert.type)}</strong>: {"  "}
            {props.alert.msg}
          </div>
        )}
      </div>
    </>
  );
}
