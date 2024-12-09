import PropTypes from 'prop-types';
import { useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import {
  Card,
  Stack,
  Divider,
  Popover,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// Main component that renders a list of tasks with checkbox controls
export default function AppTasks({ title, subheader, list, ...other }) {
  // Initialize form control with default completed task
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2'],
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      {/* Controller component manages form state for task completion */}
      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          // Toggle task selection: removes if present, adds if not present
          const onSelected = (task) =>
            field.value.includes(task) ? field.value.filter((value) => value !== task) : [...field.value, task];

          return (
            <>
              {/* Map through task list and render individual TaskItem components */}
              {list.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={field.value.includes(task.id)}
                  onChange={() => field.onChange(onSelected(task.id))}
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
};

// Individual task item component with checkbox and action menu
function TaskItem({ task, checked, onChange }) {
  // State for managing the popover menu
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.log('MARK COMPLETE', task.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.log('SHARE', task.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.log('EDIT', task.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log('DELETE', task.id);
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        // Apply strikethrough style when task is checked
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
      {/* Checkbox with task label */}
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={task.label}
        sx={{ flexGrow: 1, m: 0 }}
      />

      {/* Action menu trigger button */}
      <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={handleOpenMenu}>
        <Iconify icon={'eva:more-vertical-fill'} />
      </IconButton>

      {/* Popover menu with task actions */}
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* Menu items for various task actions */}
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ mr: 2 }} />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon={'eva:share-fill'} sx={{ mr: 2 }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Stack>
  );
}
