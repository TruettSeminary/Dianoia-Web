import React from 'react'; 
import { PropTypes } from 'prop-types'; 

// Design
import CustomInput from "md-components/CustomInput/CustomInput.jsx";
import Button from 'md-components/CustomButtons/Button.jsx'; 

import "./styles.css"; 

class NoteEditor extends React.Component {

    constructor(props) {
        super(props);
        this.handleNoteValueChange = this.handleNoteValueChange.bind(this); 
        this.saveNote = this.saveNote.bind(this); 
        this.state = {
            noteText: this.props.note.note
        }
    }

    handleNoteValueChange(event) {
        this.setState({
            noteText: event.target.value
        }); 
    }

    saveNote() {

        const newNote = {
            ...this.props.note, 
            note: this.state.noteText
        }

        if(!newNote._id) this.props.addUserNote(newNote); 
        else this.props.updateUserNote(newNote); 
    }

    render() {
        return (
            <div>
                <CustomInput 
                        labelText="Your notes"
                        id="note"
                        inputProps={{
                            onChange: this.handleNoteValueChange,
                            multiline: true,
                            classes: {
                                root: 'input'
                            },
                            value: this.state.noteText
                        }}
                        formControlProps = {{
                            fullWidth: true
                        }}
                />
                <Button
                    type="button"
                    color="primary"
                    disabled={this.state.noteText === this.props.note.note}
                    onClick={() => {
                        this.saveNote()
                    }}
                >
                    Save
                </Button>
            </div>
        )
    }
}

NoteEditor.propTypes = {
    note: PropTypes.object.isRequired, 
    addUserNote: PropTypes.func.isRequired,
    updateUserNote: PropTypes.func.isRequired
}

export default NoteEditor; 