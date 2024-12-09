import {
  Box,
  Button,
  Container,
  FormControl, FormControlLabel,
  FormLabel,
  Grid,
  Modal, Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";

// UserForm component - Handles both creating and updating user details in a modal
const UserForm = ({
                    isUpdateForm,  // Boolean to determine if form is for updating (true) or creating (false)
                    isModalOpen,   // Controls modal visibility
                    handleCloseModal,
                    user,          // User object containing all user details
                    setUser,       // State setter function for user object
                    handleAddUser, // Function to handle user creation
                    handleUpdateUser // Function to handle user updates
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
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} user
          </Typography>
          <Stack spacing={3} paddingY={2}>
            {/* Name and DOB section 
                Note: Name field automatically generates avatar URL using DiceBear API */}
            <Grid container spacing={0}>
              <Grid item xs={12} md={8} paddingRight={1}>
                <TextField fullWidth name="name" label="Name" value={user.name} autoFocus required
                           onChange={(e) => setUser({
                             ...user,
                             name: e.target.value,
                             photoUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${e.target.value.replace(" ", "+")}`
                           })}/>
              </Grid>
              <Grid item xs={12} md={4} paddingLeft={1}>
                <TextField fullWidth name="dob" label="Date of Birth" type="date" value={user.dob}
                           InputLabelProps={{shrink: true}}
                           onChange={(e) => setUser({...user, dob: e.target.value})}/>
              </Grid>
            </Grid>

            {/* Contact information section */}
            <Grid container spacing={0} sx={{paddingBottom: "4px"}}>
              <Grid item xs={12} md={6} paddingRight={1}>
                <TextField fullWidth name="email" label="Email" type="email" value={user.email} required
                           onChange={(e) => setUser({...user, email: e.target.value})}/>
              </Grid>
              <Grid item xs={12} md={6} paddingLeft={1}>
                <TextField fullWidth name="phone" label="Phone" type="number" value={user.phone}
                           onChange={(e) => setUser({...user, phone: e.target.value})}/>
              </Grid>
            </Grid>

            {/* User role selection 
                Allows choosing between Librarian (admin) and Member roles */}
            <FormControl>
              <FormLabel id="available-label" sx={{textAlign: "center"}}>User role</FormLabel>
              <RadioGroup
                sx={{paddingTop: "10px"}}
                aria-labelledby="available-label"
                defaultValue={user.isAdmin}
                name="radio-buttons-group"
                onChange={(e) => setUser({...user, isAdmin: e.target.value})}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} md={6} paddingRight={1}>
                    <FormControlLabel value control={<Radio/>} label="Librarian"
                                      sx={{textAlign: "center", justifyContent: "center", width: "100%"}}/>
                  </Grid>
                  <Grid item xs={12} md={6} paddingLeft={1}>
                    <FormControlLabel value={false} control={<Radio/>} label="Member"
                                      sx={{textAlign: "center", justifyContent: "center", width: "100%"}}/>
                  </Grid>
                </Grid>
              </RadioGroup>

              {/* Photo URL field - Allows custom avatar URL override */}
              <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
                <TextField fullWidth name="photoUrl" label="Photo URL" value={user.photoUrl}
                          onChange={(e) => setUser({...user, photoUrl: e.target.value})}/>
              </Grid>
            </FormControl>

            {/* Password field */}
            <TextField name="password" type="password" label="Password" value={user.password} required
                       onChange={(e) => setUser({...user, password: e.target.value})}/>

            {/* Action buttons - Submit triggers either create or update based on isUpdateForm */}
            <br/>
            <Box textAlign="center">
              <Button size="large" variant="contained" onClick={isUpdateForm ? handleUpdateUser : handleAddUser}
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

// PropTypes validation for component props
UserForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
  handleAddUser: PropTypes.func,
  handleUpdateUser: PropTypes.func
};

export default UserForm
