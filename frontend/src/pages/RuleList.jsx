// components/RuleList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

const RuleList = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedRule, setEditedRule] = useState('');

  const fetchRules = async () => {
    try {
      const { data } = await axios.get('https://rule-engine-with-ast-2-myl2.onrender.com/api/rules');
      setRules(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch rules.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (rule) => {
    setSelectedRule(rule);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://rule-engine-with-ast-2-myl2.onrender.com/api/rules/delete/${selectedRule._id}`);
      setSnackbarMessage('Rule deleted successfully!');
      fetchRules();
    } catch {
      setSnackbarMessage('Failed to delete rule.');
    } finally {
      setOpenDialog(false);
      setOpenSnackbar(true);
    }
  };

  const handleEditClick = (rule) => {
    setEditMode(rule._id);
    setEditedRule(rule.ruleName);
  };

  const handleSaveClick = async (id) => {
    try {
      await axios.put(`https://rule-engine-with-ast-2-myl2.onrender.com/api/rules/update/${id}`, { ruleString: editedRule });
      setSnackbarMessage('Rule updated successfully!');
      fetchRules();
    } catch {
      setSnackbarMessage('Failed to update rule.');
    } finally {
      setEditMode(null);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    fetchRules();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Rule List
      </Typography>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <List>
          {rules.map((rule) => (
            <ListItem key={rule._id} divider>
              {editMode === rule._id ? (
                <TextField
                  value={editedRule}
                  onChange={(e) => setEditedRule(e.target.value)}
                  fullWidth
                  sx={{ mr: 2 }}
                />
              ) : (
                <ListItemText primary={rule.ruleName} secondary={`Type: ${rule.rootNode.type}`} />
              )}
              {editMode === rule._id ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveClick(rule._id)}
                  sx={{ mr: 2 }}
                >
                  Save
                </Button>
              ) : (
                <Button variant="outlined" onClick={() => handleEditClick(rule)} sx={{ mr: 2 }}>
                  Edit
                </Button>
              )}
              <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(rule)}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the rule "{selectedRule?.ruleName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RuleList;
