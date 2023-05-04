import {FC, useCallback, useState} from "react";

const LoginComponent: FC<{setLogin: (value: string) => void}> = (props) => {
    const {setLogin} = props;
    const [username, setUsername] = useState('');
    const submit = useCallback(() => {
        setLogin(username);
    }, [username]);
    return (
        <form className="mt-10 max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-black text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
                <label htmlFor="username" className="block font-medium mb-2">Username</label>
                <input onChange={(event) => setUsername(event.target.value)} type="username" id="username" className="w-full p-2 border rounded-md text-black" placeholder="Enter your Username" required />
            </div>
            <button onClick={submit} type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">Login</button>
        </form>
    )
}

export default LoginComponent;