import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const GenreDialog = ({isDialogOpen, handleCloseDialog, genreId, handleDeleteGenre}) =>
    <Dialog
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
          Are you sure you want to delete this genre?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>No</Button>
        <Button onClick={() => handleDeleteGenre(genreId)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>

GenreDialog.propTypes = {
  /** Boolean that controls the visibility of the dialog */
  isDialogOpen: PropTypes.bool,
  /** Function to handle closing the dialog */
  handleCloseDialog: PropTypes.func,
  /** String ID of the genre to be deleted */
  genreId: PropTypes.string,
  /** Function to handle the genre deletion, accepts genreId as parameter */
  handleDeleteGenre: PropTypes.func
};

export default GenreDialog
