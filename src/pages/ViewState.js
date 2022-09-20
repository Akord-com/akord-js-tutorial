const shortKey = (key) => {
  return key.slice(0, 6) + "..." + key.slice(-4);
};

const ViewState = (props) => {
  if (!props.state) return null;
  const s = props.state;
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">Vault</div>
        <ul className="list-group">
          <li className="list-group-item">
            Vault ID: <br />
            <pre className="small">{s.id}</pre>
          </li>
          <li className="list-group-item">Created At: {s.createdAt}</li>
          <li className="list-group-item">Public: {s.public ? "Yes" : "No"}</li>
        </ul>
      </div>
      <div className="card-body">
        <div className="card-title">Members</div>
        <ul className="list-group">
          {s.memberships.map((m, i) => (
            <li className="list-group-item" key={i}>
              Public Address: <br />
              <pre className="small">{m.address}</pre>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-body">
        <div className="card-title">Nodes</div>
        <ul className="list-group">
          {s.nodes.map((n, i) => (
            <li className="list-group-item" key={i}>
              Id: <br />
              <pre className="small">{n.id}</pre>
              <p>Type: {n.type}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewState;
