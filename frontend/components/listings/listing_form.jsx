import React from 'react';

class ListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = this.props.listing;
  }

  componentDidMount() {
    if (this.props.params) {
      this.props.fetchListing(this.props.params.listingId);
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.listing);
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  render () {
    const text = this.props.formType === 'new' ? "Create Listing" : "Update Listing";
    return (
      <div>
        <h3>{text}</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Title
            <input
              type="text"
              value={this.state.title}
              onChange={this.update('title')} />
          </label>

          <label>Body
            <textarea
              value={this.state.body}
              onChange={this.update('body')} />
          </label>

          <input type="submit" value={text} />
        </form>
      </div>
    );
  }
}

export default ListingForm;
