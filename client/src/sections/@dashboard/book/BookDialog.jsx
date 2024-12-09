import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const BookDialog = ({isDialogOpen, handleCloseDialog, bookId, handleDeleteBook}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this book? 
          <br /><br />
          Note: Books that are currently borrowed cannot be deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={() => handleDeleteBook(bookId)} 
          color="error" 
          variant="contained"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BookDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  bookId: PropTypes.string,
  handleDeleteBook: PropTypes.func
};

export default BookDialog;
