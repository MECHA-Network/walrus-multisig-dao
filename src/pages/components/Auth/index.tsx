import './index.css';

import { encryptAndStoreData, decryptAndGetData } from '../../../crypto';
interface CustomCSSProperties extends React.CSSProperties {
    '--i': string;
}

export function Auth () {
    const accountCreated= true;
    async function isUserLoggedIn(): Promise<boolean> {
        const storedData = await chrome.storage.local.get("isLoggedIn");
        return storedData.isLoggedIn === true;
      }
      
     async function login(e: { preventDefault: () => void; }) {
        e.preventDefault()
        console.log("test....");
        await encryptAndStoreData("test", "test")
        const test = await decryptAndGetData("test", "test")
     }

     async function register(e: { preventDefault: () => void; }) {
        e.preventDefault()
        console.log("test....");
        await encryptAndStoreData("test", "test")
        const test = await decryptAndGetData("test", "test")
     }


    return (
        <div className="container">
        <div className="login-box">
            <h2>{accountCreated ? "Enter your password 🔓" : "Create new password 🔐"}</h2>
            <form action="#">
                <div className="input-box">
                    <input type="password" required />
                    <label>Password</label>
                </div>
                {accountCreated && 
                 <div className="input-box">
                 <input type="password" required />
                 <label>Retype Password</label>
             </div>
                }
              
                
                <button onClick={accountCreated ? login : register} type='submit' className="btn">{accountCreated ? "Log In" : "Register"} </button>
                <div className="signup-link">
                
                    <a href="#">{!accountCreated ? "Forgot your password?" : "Change password"}</a>
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