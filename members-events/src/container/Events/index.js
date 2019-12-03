import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Table from "../../components/Table";
import * as memberActions from "../../actions/members";

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

class Events extends React.Component {
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

  processsEventData = data => {
    const ids = this.props.location.state ? this.props.location.state.id : null;
    return data.map(d => {
      d["fullname"] = `${d.organizer.first} ${d.organizer.last}`;
      if (ids) {
        d.isHighlight = ids.indexOf(d._id) > -1;
      }
      return d;
    });
  };

  handleCheckbox = e => {
    const evtId = e.target.id;
    const { addOrRemoveEventToMember, memId } = this.props;
    addOrRemoveEventToMember(memId, evtId);
  };

  render() {
    const pd = this.processsEventData(this.props.events);
    return (
      <div className="container">
        <Table
          data={pd}
          cols={Cols}
          components={this.components}
          handleCheckbox={this.handleCheckbox}
          showCheckbox={this.props.showCheckbox}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrRemoveEventToMember: bindActionCreators(
      memberActions.addOrRemoveEventToMember,
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Events));
