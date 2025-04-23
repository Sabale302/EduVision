import { useState } from 'react';
import axios from 'axios';
import { Users } from 'lucide-react';
import {
  Card, CardContent, CardHeader, Typography, Button, TextField, Grid, Checkbox,
  FormControlLabel, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, Box
} from '@mui/material';

const PlacementData = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleFileUpload = async () => {
    if (!file) return alert("Please select a file.");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://eduvision-r00l.onrender.com/upload", formData);
      setPreviewData(res.data.preview || []);
      setColumns(res.data.columns || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleColumnChange = (e) => {
    const column = e.target.name;
    setSelectedColumns(prev =>
      e.target.checked ? [...prev, column] : prev.filter(c => c !== column)
    );
  };

  const addFilter = () => {
    setFilters(prev => [...prev, { column: '', operator: 'equals', value: '', logic: 'AND' }]);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleFilterChange = (index, field, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index][field] = value;
    setFilters(updatedFilters);
  };

  const applyFilters = async () => {
    try {
      const res = await axios.post("https://eduvision-r00l.onrender.com/filter", { filters });
      setPreviewData(res.data.filtered_preview);
    } catch (err) {
      setError(err.message);
    }
  };

  const clearFilters = () => {
    setFilters([]);
    handleFileUpload();
  };

  const applyColumnChanges = async () => {
    try {
      const res = await axios.post("https://eduvision-r00l.onrender.com/apply-column-changes", {
        selectColumns: selectedColumns,
      });
      setPreviewData(res.data.filtered_data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto", my: 4 }}>
      <Card sx={{ p: 3, mb: 4 }}>
        <CardHeader
          avatar={<Users />}
          title="Placement Data Upload"
          titleTypographyProps={{ fontSize: 20, fontWeight: 600 }}
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <input type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleFileUpload}>
                Upload
              </Button>
            </Grid>
          </Grid>

          {error && <Typography color="error" mt={2}>{error}</Typography>}
        </CardContent>
      </Card>

      {/* Column Selection */}
      {columns.length > 0 && (
        <Card sx={{ p: 3, mb: 4 }}>
          <CardHeader title="Select Columns for Filtering" />
          <CardContent>
            <Grid container spacing={2}>
              {columns.map((col, i) => (
                <Grid item key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={col}
                        checked={selectedColumns.includes(col)}
                        onChange={handleColumnChange}
                      />
                    }
                    label={col}
                  />
                </Grid>
              ))}
            </Grid>
            <Button variant="contained" color="warning" sx={{ mt: 2 }} onClick={applyColumnChanges}>
              Apply Column Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      {filters.map((filter, index) => (
        <Card key={index} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Select
                fullWidth
                value={filter.column}
                onChange={(e) => handleFilterChange(index, 'column', e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Select Column</MenuItem>
                {selectedColumns.map((col, idx) => (
                  <MenuItem key={idx} value={col}>{col}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <Select
                fullWidth
                value={filter.operator}
                onChange={(e) => handleFilterChange(index, 'operator', e.target.value)}
              >
                <MenuItem value="equals">Equals</MenuItem>
                <MenuItem value="contains">Contains</MenuItem>
                <MenuItem value="greater_than">Greater Than</MenuItem>
                <MenuItem value="less_than">Less Than</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                value={filter.value}
                onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                placeholder="Value"
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                fullWidth
                value={filter.logic}
                onChange={(e) => handleFilterChange(index, 'logic', e.target.value)}
              >
                <MenuItem value="AND">AND</MenuItem>
                <MenuItem value="OR">OR</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}>
              <Button color="error" onClick={() => removeFilter(index)}>
                Remove
              </Button>
            </Grid>
          </Grid>
        </Card>
      ))}

      {columns.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button variant="contained" onClick={addFilter}>
            Add Filter
          </Button>
          <Button variant="contained" color="success" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outlined" color="error" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Box>
      )}

      {/* Preview Table */}
      {previewData.length > 0 && (
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>File Preview</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(previewData[0]).map((key, idx) => (
                  <TableCell key={idx} sx={{ fontWeight: 600, bgcolor: '#1976D2', color: 'white' }}>
                    {key}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {previewData.map((row, idx) => (
                <TableRow key={idx}>
                  {Object.values(row).map((val, i) => (
                    <TableCell key={i}>{val}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </Box>
  );
};

export default PlacementData;