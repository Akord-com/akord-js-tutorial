const SpinnerButton = (props) => {
  return (
    <>
      {!props.loading && (
        <button
          type="submit"
          className="btn btn-primary btn-lg my-3"
          disabled={props.disabled}
        >
          {props.title}
        </button>
      )}
      {props.loading && (
        <button className="btn btn-primary btn-lg my-3" type="button" disabled>
          <span className="spinner-border spinner-border-sm  text-dark"></span>
          &nbsp;{props.title}
        </button>
      )}
    </>
  );
};

export default SpinnerButton;
