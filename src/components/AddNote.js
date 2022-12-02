import React from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AddNotePageWrapper() {
    const navigate = useNavigate();
  
    function navigateHome() {
      navigate('/');
    }
  
    return (
      <AddNotePage navigate={navigateHome} />
    );
  }
  
  class AddNotePage extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        title: '',
        body: '',
      };
  
      this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
      this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
      this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
  
    onTitleChangeHandler(event) {
      this.setState({ title: event.target.value });
    }
  
    onBodyChangeHandler(event) {
      this.setState({ body: event.target.value });
    }
  
    async onSubmitHandler(event) {
      event.preventDefault();
      const { title, body } = this.state;
      const note = {
        title,
        body,
      };
  
      await addNote(note);
  
      const { navigate } = this.props;
      navigate();
    }
  
    render() {
      const { title } = this.state;
  
      return (
        <LocaleContext.Consumer>
          {({ locale }) => (
            <form className="add-new-page__input" onSubmit={this.onSubmitHandler}>
              <input type="text" className="add-new-page__input__title" value={title} onChange={this.onTitleChangeHandler} placeholder={locale === 'id' ? 'Judul catatam ...' : 'Note title ...'} />
              <textarea
                className="add-new-page__input__body"
                placeholder={locale === 'id' ? 'Detail catatan ...' : 'Note detail ...'}
                onChange={this.onBodyChangeHandler}
              />
              <div className="add-new-page__action">
                <Button type="submit" title={locale === 'id' ? 'Simpan' : 'Save'}><FiCheck /></Button>
              </div>
            </form>
          )}
        </LocaleContext.Consumer>
      );
    }
  }
  
  AddNotePage.propTypes = {
    navigate: PropTypes.func.isRequired,
  };
  
  export default AddNotePageWrapper;
  