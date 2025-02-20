import { useEffect, useState } from "react";

import { Eye, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
const Login = () => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toggleShow = () => {
    setShow(!show);
  };
  const { toast } = useToast();
  // Using React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigateByRole = (role) => {
    switch (role) {
      case "SUPER_ADMIN":
        navigate("/superadmin");
        break;
      case "ADMIN":
        navigate("/admin");
        break;
      case "RECRUITMENT_MANAGER":
        navigate("/recruitment_manager");
        break;
      case "USER":
        navigate("/user");
        break;
      case "EMPLOYEE":
        navigate("/employee");
        break;
      default:
        navigate("/");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/login", data);
      if (response.data.error) {
        toast({
          title: response.data.response.split(" ")[0] || "Something went wrong",
          description: response.data.response,
        });
      } else if (!response.data.error) {
        const token = response.data.response;
        const decoded = jwtDecode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("role", decoded?.claims?.role);
        const role = localStorage.getItem("role");
        console.log(role);
        navigateByRole(role);
      }
    } catch (error) {
      console.log(error);
      console.error(error);
      toast.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      navigateByRole(role);
    }
  }, [navigate]);
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center flex-column position-relative text-primary-50 bg-primary-950 bg-no-repeat bg-center bg-contain">
      <img
        src={"bg-auth.png"}
        className="absolute top-0 left-0 w-[100vw] h-[100vh] z-0 object-cover"
      />
      <div className="w-100 top-0 position-absolute md:pt-5 pt-sm-2 bg-transparent">
        <Link
          to="/"
          className="text-2xl text-decoration-none px-3 drop-shadow-lg bg-transparent text-white fs-2 z-20 font-semibold"
        >
          Watta Recruiter
        </Link>
      </div>
      <div className="z-[100] flex w-full ">
        <div>
          <div className="flex-1 z-[1000] text-2xl">Welcome Back</div>
          <Card className="z-[10000] md:w-[350px] flex-1">
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="w-100 z-10"
                onSubmit={handleSubmit(onSubmit)} // React Hook Form's handleSubmit
              >
                {/* Email Field */}
                <div className="mb-3">
                  <div className="py-2 mt-3">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      {...register("email", { required: "Email is required" })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                </div>
                {/* Password Field */}
                <div className="mb-3">
                  <Label>password</Label>
                  <div className=" flex align-items-center ">
                    <Input
                      type={show ? "password" : "text"}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <div
                      className="d-flex align-items-center justify-content-center h-100 cursor-pointer px-3 "
                      onClick={toggleShow}
                    >
                      {show ? <Eye /> : <EyeClosed />}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>

                <Button className="w-full" type="submit" disabled={loading}>
                  Login
                </Button>
                {/* <p className="text-center mt-3 d-flex align-items-center justify-content-center gap-2">
                  {"Don't"} have an account?{" "}
                  <Link to="/signup" className="text-blue text-decoration-none">
                    Create Account
                  </Link>
                </p> */}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
