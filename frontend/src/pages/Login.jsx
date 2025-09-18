import { useState } from "react"
import { login } from "../api/projectApi";
import '../style/signup.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
export const Login = () => {
    
    const {setUser} = useAuth();
    const [form, setForm] = useState({ email: "", password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { email: form.email, password: form.password };
        try {
            const result = await login(userData);
            alert(result.message);
            navigate('/')

        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            alert("Login failed");
        }
    }
    return (
        <div className="signupcontainer">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="enter email" />
                <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="enter password" />
                <button type="submit">Login</button>
                <Link to='/signup'>Sign Up</Link>
            </form>
        </div>
    )
}