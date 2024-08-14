import { useState } from "react";
import bgImage from "../../assets/bg.jpg";
import * as zod from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, IconButton, TextField } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useAppDispatch } from "../../store";
import { login, LoginResponse } from "../../store/authSlice";

const schema = zod.object({
  email: zod.string().email().min(1, { message: "Required" }),
  password: zod.string(),
});

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    ).then((res) => {
      const data = res.payload as LoginResponse;
      if (data.token) {
        localStorage.setItem("token-pos", data.token);
        window.location.href = "/";
      }
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(10px)", // Apply blur to background
        }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            }}
            className="p-4 rounded min-w-96 space-y-4"
          >
            <p className="text-xl font-bold text-center">Login</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    className="w-full"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Password"
                    type={open ? "text" : "password"}
                    className="w-full"
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setOpen(!open)}
                        >
                          {open ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />

              <div>
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    backgroundColor: "#279eff",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#A91D3A",
                    },
                  }}
                  disabled={!isValid}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
