import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  IconButton,
  Button
} from '@mui/material';

export default function LeaderBoardPage() {
  const darkmode = useSelector((state) => state.darkMode);
  const [version, setVersion] = useState('v1');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Simulate different data based on version
  const generateUsers = (version) => {
    return Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      projects: version === 'v1' 
        ? Math.floor(Math.random() * 10) + 1 
        : Math.floor(Math.random() * 20) + 5,
    }));
  };

  const [users, setUsers] = useState(generateUsers('v1'));

  const handleVersionChange = (event) => {
    const newVersion = event.target.value;
    setVersion(newVersion);
    setUsers(generateUsers(newVersion));
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const pageCount = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box className={`w-full max-w-6xl mx-auto mt-10 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 font-grotesk`}>
    
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" gap={2} mb={4}>
      

      
        <TextField
          sx={{ width: { xs: '100%', md: 300 } }}
          variant="outlined"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          InputProps={{
            startAdornment: <FiSearch className="mr-2 text-gray-400" />,
            sx: {
              backgroundColor: darkmode ? "#1a1a1a" : "#fff",
              color: darkmode ? "#fff" : "#000",
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: darkmode ? "#444" : "#ccc"
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: darkmode ? "#666" : "#999"
              }
            }
          }}
        />

      
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="version-select-label" sx={{ color: darkmode ? '#fff' : '#000' }}>
            Version
          </InputLabel>
          <Select
            labelId="version-select-label"
            value={version}
            label="Version"
            onChange={handleVersionChange}
            sx={{
              color: darkmode ? '#fff' : '#000',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: darkmode ? "#444" : "#ccc"
              },
              '& .MuiSvgIcon-root': {
                color: darkmode ? '#fff' : '#000',
              },
              backgroundColor: darkmode ? "#1a1a1a" : "#fff",
            }}
          >
            <MenuItem value="v1">Version 1</MenuItem>
            <MenuItem value="v7">Version 7</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          backgroundColor: darkmode ? "#1a1a1a" : "#fff",
          border: darkmode ? '1px solid #444' : '1px solid #e0e0e0',
          borderRadius: '14px',
          overflow: 'hidden',
          mb: 3
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: darkmode ? '#2a2a2a' : '#f5f5f5' }}>
              <TableCell sx={{ color: darkmode ? "#fff" : "#000", fontWeight: 'bold' }}>Rank</TableCell>
              <TableCell sx={{ color: darkmode ? "#fff" : "#000", fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: darkmode ? "#fff" : "#000", fontWeight: 'bold' }}>Projects</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user, index) => (
              <TableRow 
                key={user.id}
                sx={{ 
                  '&:nth-of-type(odd)': { 
                    backgroundColor: darkmode ? '#222' : '#f9f9f9' 
                  },
                  '&:hover': {
                    backgroundColor: darkmode ? '#333' : '#f0f0f0'
                  }
                }}
              >
                <TableCell sx={{ color: darkmode ? "#ddd" : "#000" }}>
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell sx={{ color: darkmode ? "#ddd" : "#000", fontWeight: 500 }}>{user.name}</TableCell>
                <TableCell sx={{ color: darkmode ? "#ddd" : "#000" }}>{user.projects}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Custom Pagination */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2" color={darkmode ? "#ddd" : "#666"}>
          Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
        </Typography>
        
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton 
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            sx={{
              color: darkmode ? '#fff' : '#000',
              '&:disabled': {
                color: darkmode ? '#555' : '#ccc'
              }
            }}
          >
            <FiChevronLeft />
          </IconButton>
          
          {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
            let pageNum;
            if (pageCount <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= pageCount - 2) {
              pageNum = pageCount - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "contained" : "text"}
                onClick={() => handlePageChange(pageNum)}
                sx={{
                  minWidth: 32,
                  height: 32,
                  color: currentPage === pageNum ? '#fff' : (darkmode ? '#ddd' : '#000'),
                  backgroundColor: currentPage === pageNum 
                    ? (darkmode ? '#a31621' : '#1976d2') 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: currentPage === pageNum 
                      ? (darkmode ? '#c21825' : '#1565c0')
                      : (darkmode ? '#333' : '#eee')
                  }
                }}
              >
                {pageNum}
              </Button>
            );
          })}
          
          {pageCount > 5 && currentPage < pageCount - 2 && (
            <Typography color={darkmode ? "#ddd" : "#000"}>...</Typography>
          )}
          
          {pageCount > 5 && currentPage < pageCount - 2 && (
            <Button
              variant={currentPage === pageCount ? "contained" : "text"}
              onClick={() => handlePageChange(pageCount)}
              sx={{
                minWidth: 32,
                height: 32,
                color: currentPage === pageCount ? '#fff' : (darkmode ? '#ddd' : '#000'),
                backgroundColor: currentPage === pageCount 
                  ? (darkmode ? '#a31621' : '#1976d2') 
                  : 'transparent',
                '&:hover': {
                  backgroundColor: currentPage === pageCount 
                    ? (darkmode ? '#c21825' : '#1565c0')
                    : (darkmode ? '#333' : '#eee')
                }
              }}
            >
              {pageCount}
            </Button>
          )}
          
          <IconButton 
            onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
            disabled={currentPage === pageCount}
            sx={{
              color: darkmode ? '#fff' : '#000',
              '&:disabled': {
                color: darkmode ? '#555' : '#ccc'
              }
            }}
          >
            <FiChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}