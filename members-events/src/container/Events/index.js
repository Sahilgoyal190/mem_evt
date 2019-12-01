import React from "react";
import { withRouter } from "react-router-dom";
import Table from "../../components/Table";
import memData from "../../mockData/mem.json";
import evtData from "../../mockData/evt.json";

const Cols = [
  {
    label: "Organizer",
    key: "fullname"
  },
  {
    label: "Company",
    key: "company"
  },
  {
    label: "About",
    key: "about"
  },
  {
    label: "Duration",
    key: "duration"
  },
  {
    label: "Capacity",
    key: "capacity"
  },
  {
    label: "Schedule",
    key: "scheduled_at"
  }
];

const processsMemnerData = data => {
  return data.map(d => {
    d["fullname"] = `${d.organizer.first} ${d.organizer.last}`;
    return d;
  });
};

const Rows = props => <div>test</div>;

class Events extends React.Component {
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
        <button className="btn btn-primary">Locate On Calender</button>
        <button className="btn btn-success">Add Event</button>
      </div>
    );
  };

  components = {
    actions: this.getActionRow
  };
  render() {
    const pd = processsMemnerData(evtData);
    return (
      <div className="container">
        <Table data={pd} cols={Cols} components={this.components} />
      </div>
    );
  }
}

export default withRouter(Events);
