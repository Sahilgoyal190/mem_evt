import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-modal";
import * as actions from "../../actions/members";
import Table from "../../components/Table";
import Events from "../Events";

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
    label: "Events",
    key: "events",
    type: "custom_row"
  },
  {
    label: "Actions",
    key: "actions",
    type: "custom_row"
  }
];

const sortOptions = [
  {
    label: "Sort by Name Ascending",
    value: "name_asc"
  },
  {
    label: "Sort by Name Descending",
    value: "name_desc"
  },
  {
    label: "Sort by Age Ascending",
    value: "age_asc"
  },
  {
    label: "Sort by Age Descending",
    value: "age_desc"
  }
];

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      memId: null
    };
  }

  componentDidMount() {
    this.props.getMembersList();
  }

  handleDelete = e => {
    this.props.deleteMember(e.target.id);
  };

  getActionRow = props => {
    return (
      <div className="btn-group">
        <button
          className="btn btn-danger"
          id={props.index}
          onClick={this.handleDelete}
        >
          Delete
        </button>
        <button className="btn btn-primary btn-with-link">
          <Link
            to={{
              pathname: "/events",
              state: {
                id: this.props.list[props.index].events
              }
            }}
          >
            Locate On Calender
          </Link>
        </button>
        <button
          className="btn btn-success"
          id={props.rowData._id}
          onClick={this.handleModal}
        >
          Add Event
        </button>
      </div>
    );
  };

  getEventRow = ({ rowData }) => (
    <span>{rowData.events ? rowData.events.length : 0}</span>
  );

  components = {
    actions: this.getActionRow,
    events: this.getEventRow
  };

  handleModal = e => {
    this.setState({ openModal: true, memId: e.target.id });
  };

  handleCloseModal = () => this.setState({ openModal: false, memId: null });

  handleSorting = e => {
    const [type, dir] = e.target.value.split("_");
    this.props.sorting(type, dir);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>Members List</h2>
          </div>
          <div className="col-md-3 col-md-offset-3">
            <select
              className="form-control"
              name="sort"
              onChange={this.handleSorting}
            >
              {sortOptions.map(s => {
                return (
                  <option value={s.value} key={s.value}>
                    {s.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <Table
          data={this.props.list}
          cols={Cols}
          components={this.components}
        />
        <Modal
          isOpen={this.state.openModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <div className="container-fluid">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.handleCloseModal}
              >
                &times;
              </button>
              <h4 className="modal-title">Choose Events</h4>
            </div>
          </div>
          <Events memId={this.state.memId} showCheckbox />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.members.list,
    events: state.events.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMembersList: bindActionCreators(actions.getMembersList, dispatch),
    deleteMember: index => dispatch(actions.deleteMember(index)),
    sorting: (sortType, dir) => dispatch(actions.sorting(sortType, dir))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
