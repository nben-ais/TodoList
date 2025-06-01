import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Categories = ({ onAddCategory }: any) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAddCategory(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <TextField
        size="small"
        variant="outlined"
        placeholder="New category"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          width: '100%',
        }}
      />
      <Button
        className='!capitalize !font-itim !font-bold'
        variant="contained"
        onClick={handleAdd}
        sx={{
          backgroundColor: '#B3B3B3',
          color: '#674F4A',
        }}
      >
        Add Category
      </Button>
    </div>
  );
};

export default Categories;
