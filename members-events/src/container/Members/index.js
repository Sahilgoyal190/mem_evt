import React from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import memData from "../../mockData/mem.json";
import evtData from "../../mockData/evt.json";

const Cols = [
  {
    label: "Name",
    key: "fullname"
  },
  {
    label: "Age",
    key: "age"
  },
  {
    label: "Company",
    key: "company"
  },
  {
    label: "Email",
    key: "email"
  },
  {
    label: "Phone",
    key: "phone"
  },
  {
    label: "Actions",
    key: "actions",
    type: "custom_row"
  }
];

const processsMemnerData = data => {
  return data.map(d => {
    d["fullname"] = `${d.name.first} ${d.name.last}`;
    return d;
  });
};

const Rows = props => <div>test</div>;

class Members extends React.Component {
  handleDelete(e) {
    console.log(e.target.id);
  }

  getActionRow = props => {
    return (
      <div className="row">
        <button
          className="btn btn-danger"
          id={props.index}
          onClick={this.handleDelete}
        >
          Delete
        </button>
        <button className="btn btn-primary">
          <Link
            to={{
              pathname: "/events",
              state: {
                id: ["5c540cb4d1e88f219439d0bd", "5c540cb41c3f7ba1b57461e9"]
              }
            }}
          >
            Locate On Calender
          </Link>
        </button>
        <button className="btn btn-success">Add Event</button>
      </div>
    );
  };

  components = {
    actions: this.getActionRow
  };
  render() {
    const pd = processsMemnerData(memData, evtData);
    return (
      <div className="container">
        <Table data={pd} cols={Cols} components={this.components} />
      </div>
    );
  }
}

export default Members;
