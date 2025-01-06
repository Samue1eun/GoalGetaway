import { useState } from "react";
import { userLogin } from "../../../src/app/utilities";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {

    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogInSubmit = async (e) => {
        e.preventDefault();
        let formData = {
            'email': email,
            'password': password,
        };
        try {
            const user = await userLogin(formData);
            if (user){ 
                console.log('Login successful:', user);
                navigate('/home/'); // Redirect to the homepage upon successful login
            }
        } catch (error) {
            console.error('Error in "LogInForm.jsx": ', error.message);
        }
    };

      const handleRegisterClick = () => {
        navigate('/register/')
      }

    return (
        <>
        <form type="submit" onSubmit={(e)=>handleLogInSubmit(e)}>
        <div className="flex items-center justify-center min-h-screen">
            <div className="card glass w-96">
                <div className="card-body">
                    <h2 className="card-title">Log In</h2>
                <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input 
                    type="text" 
                    className="grow" 
                    placeholder="Email"
                    value={email}
                    onChange = {(e)=>setEmail(e.target.value)}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input 
                    type="password" 
                    className="grow" 
                    placeholder="Password"
                    value={password}
                    onChange = {(e)=>setPassword(e.target.value)}
                    />
                </label>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary" type="submit" >Log In</button>
                    <button className="btn btn-primary" type="button" onClick={handleRegisterClick}>Go To Register Page</button>
                    </div>
                </div>
            </div>
        </div>
        </form>
        </>
    )
};

export default LogInForm;