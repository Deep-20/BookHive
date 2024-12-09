import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

// Dialog component for confirming author deletion
const AuthorDialog = ({isDialogOpen, handleCloseDialog, authorId, handleDeleteAuthor}) => <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Confirm action
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this author? This action cannot be undone and will also delete all books associated with this author. 
          Note: Authors with currently borrowed books cannot be deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={() => handleDeleteAuthor(authorId)} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>

// PropTypes definition with descriptive comments
AuthorDialog.propTypes = {
  /** Controls the visibility of the dialog */
  isDialogOpen: PropTypes.bool,
  /** Function to handle closing the dialog */
  handleCloseDialog: PropTypes.func,
  /** ID of the author to be deleted */
  authorId: PropTypes.string,
  /** Function to handle the author deletion, receives authorId as parameter */
  handleDeleteAuthor: PropTypes.func
};

export default AuthorDialog
