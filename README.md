# Proxy Server  

This is a small proxy server that I used at my job to migrate one API from one stack to another.  
 
I needed to confirm the new API was 100% compliant with how the old one was. The problem was, I did not have all the documentation for the old API. This proxy allowed me to test the new API disguised on the URL from the old, allowing me to smoke test using an UI.

## How to run

1. Create an `.env` file, use `.env.example` as a guide.
2. Install dependencies `npm install`.
3. Run server `npm run start`.
