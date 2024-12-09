import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography,
  TextField,  // Import TextField for search input
} from "@mui/material";
import { Alert } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../../hooks/useAuth";

import Label from "../../../components/label";
import BookDialog from "./BookDialog";
import BookForm from "./BookForm";
import Iconify from "../../../components/iconify";
import { apiUrl, methods, routes } from "../../../constants";

// ----------------------------------------------------------------------

// Styled component for book cover images
const StyledBookImage = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  position: "absolute",
  backgroundColor: "#f5f5f5",
});

const BookPage = () => {
  const { user } = useAuth();
  // State management for book data and UI controls
  const [book, setBook] = useState({
    id: "", name: "", isbn: "", summary: "", isAvailable: true, authorId: "", genreId: "", photoUrl: ""
  });
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // For search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  // CRUD Operations
  const getAllBooks = () => {
    // Fetches all books from the API and updates both books and filteredBooks states
    axios
      .get(apiUrl(routes.BOOK, methods.GET_ALL))
      .then((response) => {
        // handle success
        setBooks(response.data.booksList);
        setFilteredBooks(response.data.booksList); // Set filteredBooks initially
        setIsTableLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addBook = () => {
    axios
      .post(apiUrl(routes.BOOK, methods.POST), book)
      .then((response) => {
        toast.success("Book added");
        handleCloseModal();
        getAllBooks();
        clearForm();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Something went wrong, please try again";
        toast.error(errorMessage);
      });
  };

  const updateBook = () => {
    axios
      .put(apiUrl(routes.BOOK, methods.PUT, selectedBookId), book)
      .then((response) => {
        toast.success("Book updated");
        handleCloseModal();
        handleCloseMenu();
        getAllBooks();
        clearForm();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Something went wrong, please try again";
        toast.error(errorMessage);
      });
  };

  const deleteBook = (bookId) => {
    axios
      .delete(apiUrl(routes.BOOK, methods.DELETE, bookId))
      .then((response) => {
        toast.success("Book deleted");
        handleCloseDialog();
        handleCloseMenu();
        getAllBooks();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Something went wrong, please try again";
        toast.error(errorMessage);
        handleCloseDialog();
        handleCloseMenu();
      });
  };

  const getSelectedBookDetails = () => {
    const selectedBook = books.find((element) => element._id === selectedBookId);
    setBook(selectedBook);
  };

  const clearForm = () => {
    setBook({
      id: "", name: "", isbn: "", summary: "", isAvailable: true, authorId: "", genreId: "", photoUrl: ""
    });
  };

  const handleOpenMenu = (event) => {
    setIsMenuOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(null);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Search functionality
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter books based on title or author name
    if (query === "") {
      setFilteredBooks(books);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = books.filter(
        (book) =>
          book.name.toLowerCase().includes(lowercasedQuery) ||
          (book.author && book.author.name.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredBooks(filtered);
    }
  };

  // Load data on initial page load
  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <>
      <Helmet>
        <title> Books </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" sx={{ mb: 5 }}>
            Books
          </Typography>
          {user.isAdmin && (
            <Button
              variant="contained"
              onClick={() => {
                setIsUpdateForm(false);
                handleOpenModal();
              }}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Book
            </Button>
          )}
        </Stack>

        {/* Search input field */}
        <TextField
          label="Search by title or author"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
        />

        {/* Book grid display with loading state and empty state handling */}
        {isTableLoading ? (
          <CircularProgress />
        ) : books.length > 0 ? (
          <Grid container spacing={4}>
            {/* Book cards with cover image, details, and admin controls */}
            {filteredBooks.map((book) => (
              <Grid key={book._id} item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ pt: '80%', position: 'relative' }}>
                    <Label
                      variant="filled"
                      sx={{
                        zIndex: 9,
                        top: 16,
                        left: 16,
                        position: "absolute",
                        textTransform: "uppercase",
                        color: "primary.main",
                      }}
                    >
                      {book.genre.name}
                    </Label>
                    {user.isAdmin && (
                      <Label
                        variant="filled"
                        sx={{
                          zIndex: 9,
                          top: 12,
                          right: 16,
                          position: "absolute",
                          borderRadius: "100%",
                          width: "30px",
                          height: "30px",
                          color: "white",
                          backgroundColor: "white",
                        }}
                      >
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={(e) => {
                            setSelectedBookId(book._id);
                            handleOpenMenu(e);
                          }}
                        >
                          <Iconify icon={"eva:more-vertical-fill"} />
                        </IconButton>
                      </Label>
                    )}

                    <StyledBookImage alt={book.name} src={book.photoUrl} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography textAlign="center" variant="h5" margin={0} noWrap>
                      {book.name}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ color: "#888888" }} 
                      paddingBottom={1} 
                      noWrap 
                      textAlign="center"
                    >
                      {book.author.name}
                    </Typography>
                    <Label 
                      color={book.isAvailable ? "success" : "error"} 
                      sx={{ padding: 2 }}
                    >
                      {book.isAvailable ? "Available" : "Not available"}
                    </Label>

                    <Typography 
                      variant="subtitle2" 
                      textAlign="center" 
                      paddingTop={1}
                    >
                      ISBN: {book.isbn}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        overflow: 'auto',
                        flexGrow: 1,
                        maxHeight: '150px'
                      }}
                    >
                      {book.summary}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="warning">No books found</Alert>
        )}
      </Container>

      <Popover
        open={Boolean(isMenuOpen)}
        anchorEl={isMenuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setIsUpdateForm(true);
            getSelectedBookDetails();
            handleCloseMenu();
            handleOpenModal();
          }}
        >
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={handleOpenDialog}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <BookForm
        isUpdateForm={isUpdateForm}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        id={selectedBookId}
        book={book}
        setBook={setBook}
        handleAddBook={addBook}
        handleUpdateBook={updateBook}
      />

      <BookDialog
        isDialogOpen={isDialogOpen}
        bookId={selectedBookId}
        handleDeleteBook={deleteBook}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default BookPage;
