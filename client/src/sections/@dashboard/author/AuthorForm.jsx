import {Box, Button, Container, Modal, Stack, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";

// AuthorForm component - Modal form for adding/updating author information
const AuthorForm = ({
                      isUpdateForm,    // Boolean to determine if form is for updating (true) or creating (false)
                      isModalOpen,     // Controls modal visibility
                      handleCloseModal,// Function to close the modal
                      author,          // Author object containing name, description, and photoUrl
                      setAuthor,       // State setter function for author object
                      handleAddAuthor, // Function to handle author creation
                      handleUpdateAuthor // Function to handle author updates
                    }) => {

  // Modal styling configuration
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'white',
    borderRadius: '20px',
    boxShadow: 16,
    p: 4,
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container>
          {/* Dynamic title based on form mode (Add/Update) */}
          <Typography variant="h4" textAlign="center" paddingBottom={2} paddingTop={1}>
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} author
          </Typography>
          <Stack spacing={3} paddingY={2}>

            {/* Author name input - automatically generates avatar URL using DiceBear API */}
            <TextField name="name" label="Author name" value={author.name} autoFocus required
                       onChange={(e) => setAuthor({
                         ...author,
                         name: e.target.value,
                         photoUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${e.target.value.replace(" ", "+")}`
                       })}/>
            <TextField name="description" label="Description" value={author.description} multiline
                       rows={2}
                       maxRows={4}
                       onChange={(e) => setAuthor({...author, description: e.target.value})}
            />

            {/* Author photo URL input - allows custom avatar URL override */}
            <TextField
              name="photoUrl"
              label="Photo URL"
              value={author.photoUrl}
              onChange={(e) => setAuthor({...author, photoUrl: e.target.value})}
              helperText="Enter the URL of the author's photo"
            />

            <br/>
            <Box textAlign="center">
              {/* Submit button - calls different handlers based on form mode */}
              <Button size="large" variant="contained" onClick={isUpdateForm ? handleUpdateAuthor : handleAddAuthor}
                      startIcon={<Iconify icon="bi:check-lg"/>} style={{marginRight: "12px"}}>
                Submit
              </Button>

              <Button size="large" color="inherit" variant="contained" onClick={handleCloseModal}
                      startIcon={<Iconify icon="charm:cross"/>} style={{marginLeft: "12px"}}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Modal>
  );
}

AuthorForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  author: PropTypes.object,
  setAuthor: PropTypes.func,
  handleAddAuthor: PropTypes.func,
  handleUpdateAuthor: PropTypes.func
};

export default AuthorForm
