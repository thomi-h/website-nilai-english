import { Button, TextField, NativeSelect } from "@mui/material";

export default function Login({ handleFormChange, handleClick, login }) {
  return (
    <div className="login-wrapper">
      <img src="/src/assets/TC_New.webp" alt="TC Logo" />
      <h1>Welcome Back</h1>
      <p>Please login to view your child's academic progress.</p>
      <form action="">
        <TextField
          id="nama"
          label="Nama"
          variant="standard"
          onChange={handleFormChange}
          value={login.nama}
        />
        <TextField
          id="kode"
          label="Kode Unik"
          variant="standard"
          onChange={handleFormChange}
          value={login.kode}
        />
        <NativeSelect id="kelas" value={login.kelas} onChange={handleFormChange}>
          <option value={"kelas1"}>Kelas 1</option>
          <option value={"kelas2a"}>Kelas 2A</option>
          <option value={"kelas2b"}>Kelas 2B</option>
          <option value={"kelas3"}>Kelas 3</option>
          <option value={"kelas4"}>Kelas 4</option>
          <option value={"kelas5a"}>Kelas 5A</option>
          <option value={"kelas5b"}>Kelas 5B</option>
          <option value={"kelas6a"}>Kelas 6A</option>
          <option value={"kelas6b"}>Kelas 6B</option>
        </NativeSelect>
        <Button variant="contained" onClick={handleClick} size="large" type="submit" fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
}
