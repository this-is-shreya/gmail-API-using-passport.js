## Steps (before you run the app)
1. Create an account on google's cloud console with your debit/credit card.
2. Create a new project and get its Client ID and Secret by clicking on Credentials
3. Click on 'Enable APIs and Services' and enable Gmail API
4. Go to OAuth2 developer playground, click on the gear icon and add the Client ID Aand Secret, then click on close.
5. On the left, add the following permissions:
   https://www.googleapis.com/auth/gmail.send,https://www.googleapis.com/auth/gmail.readonly, https://mail.google.com/
    https://www.googleapis.com/auth/gmail.modify, https://www.googleapis.com/auth/gmail.compose
6. Get the authorization token and exchange it for refresh and access token.
   
**Steps 5 and 6 are specific to the email id you want to send emails from.**

## After you complete the steps above
1. Clone the project
2. Run <code>npm install</code>
3. Add all the config vars in a config.env file
4. Run <code>node server.js</code>

All the APIs can be found here: https://developers.google.com/gmail/api/reference/rest

## Video explanation:
Link: https://clipchamp.com/watch/mwhWx0Js9On
