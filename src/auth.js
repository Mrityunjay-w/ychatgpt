import { LogLevel, PublicClientApplication } from "@azure/msal-browser";
//Create an instance of the PublicClientApplication class with the msalConfig object:

export const msalConfig = {
    auth: {

        //----Dev----------

       clientId:process.envr.REACT_APP_AI_CLIENTID, // This is the ONLY mandatory field that you need to supply.
       authority:process.envr.REACT_APP_AI_AUTHORITY, // Choose SUSI as your default authority.
       redirectUri:process.envr.REACT_APP_AI_REDIRECTURL, // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        
        // //------Prod---------
        // clientId: '700ecce5-0477-417e-b6c8-38aec53f1ff3', // This is the ONLY mandatory field that you need to supply.
        // authority:'https://login.microsoftonline.com/0da2a83b-13d9-4a35-965f-ec53a220ed9d' , // Choose SUSI as your default authority.
        // redirectUri : 'https://y-chatgpt.azurewebsites.net/',
       
 
       
       //-----Dev environment---------
       //redirectUri: 'https://y-chatbotgpt-dev.azurewebsites.net/',

      //  //--------Production------------
      //  redirectUri : 'https://y-chatbotgpt.azurewebsites.net/',
       
       postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    
    cache: {
        cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

const msalInstance = new PublicClientApplication(msalConfig);
//Update the loginRequest object to include the necessary scopes for user information:
export const loginRequest = {
  scopes: ["user.read"],
};
//Add a function to handle the login process and retrieve the user information:
const login = async () => {
  try {
    // Login the user
    const loginResponse = await msalInstance.loginPopup(loginRequest);

    // Get the access token
    const accessToken = loginResponse.accessToken;

    // Use the access token to call the Microsoft Graph API and get the user information
    const userInfoResponse = await msalInstance.acquireTokenSilent({
      scopes: ["user.read"],
    });

    // Access the user information
    const userInfo = userInfoResponse.account;

    // Do something with the user information
    console.log(userInfo);
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
};