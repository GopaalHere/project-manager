import { useState } from "react"
import { signUp } from "../api/projectApi";
import '../style/signup.css'
import { Link, useNavigate } from "react-router-dom";
export const Signup = () => {
    const [form, setForm] = useState({ email: "", password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { email: form.email, password: form.password };
        try {
            const result = await signUp(userData);
            alert(result.message);
            navigate('/')

        } catch (err) {
            console.error("Signup error:", err.response?.data || err.message);
            alert("Signup failed");
        }
    }
    return (
        <div className="signupcontainer">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="enter email" />
                <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="enter password" />
                <button type="submit">SignUp</button>
                <Link to='/login'>Login</Link>
            </form>
        </div>
    )
}