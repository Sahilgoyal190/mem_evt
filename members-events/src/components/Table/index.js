import React from "react";

const Table = ({ cols, data, components, handleCheckbox, showCheckbox }) => {
  return (
    <table className="table table-bordered table-striped table-condensed">
      <thead>
        <tr>
          {showCheckbox && <th />}
          {cols.map((c, i) => (
            <th key={`th-${i}`}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => {
          return (
            <tr className={`${d.isHighlight ? "highlight" : ""}`}>
              {showCheckbox && (
                <td>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={handleCheckbox}
                    id={d._id}
                  />
                </td>
              )}
              {cols.map((k, j) => {
                if (k.type === "custom_row") {
                  const TD = components[k.key];
                  return (
                    <td>
                      <TD rowData={d} key={d._id} index={i} />
                    </td>
                  );
                }
                return <td>{d[k.key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
