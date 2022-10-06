const SpinnerButton = (props) => {
  return (
    <>
      {!props.loading && (
        <button type="submit" className="btn my-3" disabled={props.disabled}>
          {props.title}
        </button>
      )}
      {props.loading && (
        <button className="btn my-3" type="button" disabled>
          <span className="spinner-border spinner-border-sm"></span>
          &nbsp;{props.title}
        </button>
      )}
    </>
  );
};

export default SpinnerButton;
