import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

// Component for displaying a confirmation dialog when deleting a user
const UserDialog = ({ isDialogOpen, userId, handleDeleteUser, handleCloseDialog }) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"      // Accessibility attributes for screen readers
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete User
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {/* Warning message with important note about user deletion restrictions */}
          Are you sure you want to delete this user? This action cannot be undone.
          {"\n"}
          Note: Users with unreturned books cannot be deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* Dialog action buttons */}
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={() => handleDeleteUser(userId)} autoFocus color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// PropTypes for type checking
UserDialog.propTypes = {
  isDialogOpen: PropTypes.bool,    // Controls dialog visibility
  userId: PropTypes.string,        // ID of user to be deleted
  handleDeleteUser: PropTypes.func, // Function to handle user deletion
  handleCloseDialog: PropTypes.func, // Function to close the dialog
};

export default UserDialog;
