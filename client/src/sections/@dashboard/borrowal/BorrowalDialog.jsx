import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

// Confirmation dialog component for borrowal deletion
const BorrowalDialog = ({isDialogOpen, handleCloseDialog, borrowalId, handleDeleteBorrowal}) =>
    <Dialog
      // Controls dialog visibility
      open={isDialogOpen}
      // Handler for when dialog is closed (clicking outside or pressing ESC)
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Confirm action
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this borrowal?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* Cancel button - closes the dialog */}
        <Button onClick={handleCloseDialog}>No</Button>
        {/* Confirm button - triggers deletion with the borrowal ID */}
        <Button onClick={() => handleDeleteBorrowal(borrowalId)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>

// PropTypes validation for component props
BorrowalDialog.propTypes = {
  isDialogOpen: PropTypes.bool,      // Controls dialog visibility
  handleCloseDialog: PropTypes.func, // Function to close the dialog
  borrowalId: PropTypes.string,      // ID of the borrowal to be deleted
  handleDeleteBorrowal: PropTypes.func // Function to handle the deletion
};

export default BorrowalDialog
