import './index.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { encryptAndStoreData, decryptAndGetData, checkAccountCreated, getSuiKeyAndAddress } from '../../../crypto';

interface CustomCSSProperties extends React.CSSProperties {
    '--i': string;
}

export function Auth () {
    const [accountCreated, setAccountCreated] = useState(false);
    const [pass, setPass] = useState("");
  
    const [repass, setRePass] = useState("");
    
    useEffect(() => {
       async function setIfLoggedIn() {
        await checkAccountCreated();
       }
       setIfLoggedIn();
    }, []);

    async function isUserLoggedIn(): Promise<boolean> {
        const storedData = await chrome.storage.local.get("isLoggedIn");
        return storedData.isLoggedIn === true;
      }
      
     async function login(e: { preventDefault: () => void; }) {
        e.preventDefault()
        try {
          await decryptAndGetData(pass);
          toast.success("Login Successful 🎉")
        } catch (error) {
            toast.error("Wrong password")
        }
        
     }

     async function register(e: { preventDefault: () => void; }) {
        e.preventDefault()
        console.log("Registering");
        
        if (pass !== repass) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const newSuiCred = await getSuiKeyAndAddress(pass);
            await chrome.storage.local.set({"suiAddress": newSuiCred.suiAddrs});
            await encryptAndStoreData(pass, newSuiCred.scrKey);
            await chrome.storage.local.set({"accountCreated": true});
            toast.success("New Account Created 🎉")
            setPass("");
            setRePass("");
            setAccountCreated(true);
        } catch (error) {
            toast.error("Create password failed.")
        }
        
     }

    return (
        <div className="container">
        <div className="login-box">
            <h2>{accountCreated ?  "Enter your password 🔓": "Create new password"}</h2>
            <form action="#">
                <div className="input-box">
                    <input type="password" required value={pass}
                    onChange={(e) => {
                        setPass(e.target.value)
                     }}/>
                    <label>Password</label>
                </div>
                {!accountCreated && 
                 <div className="input-box">
                 <input type="password" required value={repass}
                 onChange={(e) => {
                    setRePass(e.target.value)
                 }}/>
                 <label>Retype Password</label>
             </div>
                }
                <button onClick={accountCreated ? login : register} type='submit' className="btn">{accountCreated ? "Log In" : "Create Password"} </button>
                <div className="signup-link">
                    <a href="#">{accountCreated ? "Forgot your password?" : ""}</a>
                </div>
            
            </form>
        </div>
        <span style={{ '--i': '0' } as CustomCSSProperties}></span>
        <span style={{ '--i': '1' } as CustomCSSProperties}></span>
        <span style={{ '--i': '2' } as CustomCSSProperties}></span>
        <span style={{ '--i': '3' } as CustomCSSProperties}></span>
        <span style={{ '--i': '4' } as CustomCSSProperties}></span>
        <span style={{ '--i': '5' } as CustomCSSProperties}></span>
        <span style={{ '--i': '6' } as CustomCSSProperties}></span>
        <span style={{ '--i': '7' } as CustomCSSProperties}></span>
        <span style={{ '--i': '8' } as CustomCSSProperties}></span>
        <span style={{ '--i': '9' } as CustomCSSProperties}></span>
        <span style={{ '--i': '10' } as CustomCSSProperties}></span>
        <span style={{ '--i': '11' } as CustomCSSProperties}></span>
        <span style={{ '--i': '12' } as CustomCSSProperties}></span>
        <span style={{ '--i': '13' } as CustomCSSProperties}></span>
        <span style={{ '--i': '14' } as CustomCSSProperties}></span>
        <span style={{ '--i': '15' } as CustomCSSProperties}></span>
        <span style={{ '--i': '16' } as CustomCSSProperties}></span>
        <span style={{ '--i': '17' } as CustomCSSProperties}></span>
        <span style={{ '--i': '18' } as CustomCSSProperties}></span>
        <span style={{ '--i': '19' } as CustomCSSProperties}></span>
        <span style={{ '--i': '20' } as CustomCSSProperties}></span>
        <span style={{ '--i': '21' } as CustomCSSProperties}></span>
        <span style={{ '--i': '22' } as CustomCSSProperties}></span>
        <span style={{ '--i': '23' } as CustomCSSProperties}></span>
        <span style={{ '--i': '24' } as CustomCSSProperties}></span>
        <span style={{ '--i': '25' } as CustomCSSProperties}></span>
        <span style={{ '--i': '26' } as CustomCSSProperties}></span>
        <span style={{ '--i': '27' } as CustomCSSProperties}></span>
        <span style={{ '--i': '28' } as CustomCSSProperties}></span>
        <span style={{ '--i': '29' } as CustomCSSProperties}></span>
        <span style={{ '--i': '30' } as CustomCSSProperties}></span>
        <span style={{ '--i': '31' } as CustomCSSProperties}></span>
        <span style={{ '--i': '32' } as CustomCSSProperties}></span>
        <span style={{ '--i': '33' } as CustomCSSProperties}></span>
        <span style={{ '--i': '34' } as CustomCSSProperties}></span>
        <span style={{ '--i': '35' } as CustomCSSProperties}></span>
        <span style={{ '--i': '36' } as CustomCSSProperties}></span>
        <span style={{ '--i': '37' } as CustomCSSProperties}></span>
        <span style={{ '--i': '38' } as CustomCSSProperties}></span>
        <span style={{ '--i': '39' } as CustomCSSProperties}></span>
        <span style={{ '--i': '40' } as CustomCSSProperties}></span>
        <span style={{ '--i': '41' } as CustomCSSProperties}></span>
        <span style={{ '--i': '42' } as CustomCSSProperties}></span>
        <span style={{ '--i': '43' } as CustomCSSProperties}></span>
        <span style={{ '--i': '44' } as CustomCSSProperties}></span>
        <span style={{ '--i': '45' } as CustomCSSProperties}></span>
        <span style={{ '--i': '46' } as CustomCSSProperties}></span>
        <span style={{ '--i': '47' } as CustomCSSProperties}></span>
        <span style={{ '--i': '48' } as CustomCSSProperties}></span>
        <span style={{ '--i': '49' } as CustomCSSProperties}></span>
    
    </div>
    );
}