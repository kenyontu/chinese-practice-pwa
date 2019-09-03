import React from 'react';
import {
  Dialog,
  DialogActions,
  Typography,
  Switch,
  List,
  ListItem,
  Checkbox,
  Button
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #ddd'
  },
  title: {
    fontSize: '22px',
    flexGrow: 1
  },
  list: {
    overflowY: 'auto'
  },
  actionsContainer: {}
});

function FilterWordsDialog({open, onClose, enabled}) {
  const classes = useStyles();
  const words = Array(30).fill(1);
  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <div className={classes.titleContainer}>
        <Typography className={classes.title}>Filter</Typography>
        <Switch color="primary" checked={enabled} />
      </div>
      <List className={classes.list} disablePadding>
        {words.map(w => (
          <ListItem key={w} dense divider>
            <Checkbox checked color="primary" />
            <Typography>Word</Typography>
          </ListItem>
        ))}
      </List>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterWordsDialog;
