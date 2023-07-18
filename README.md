<img src="https://img.shields.io/github/languages/code-size/this-is-shreya/gmail-API-using-passport.js" alt="image"> <img src="https://img.shields.io/github/repo-size/this-is-shreya/gmail-API-using-passport.js" alt="image"> <img src="https://img.shields.io/github/languages/count/this-is-shreya/gmail-API-using-passport.js" alt="image"> <img src="https://img.shields.io/github/languages/top/this-is-shreya/gmail-API-using-passport.js" alt="image">
<img src="https://img.shields.io/github/watchers/this-is-shreya/gmail-API-using-passport.js?style=flat" alt="image">
<img src="https://img.shields.io/github/forks/this-is-shreya/gmail-API-using-passport.js" alt="image"> <img src="https://img.shields.io/github/stars/this-is-shreya/gmail-API-using-passport.js" alt="image">

Won't it be great, if there's a program that replies to all your emails on your behalf when you are busy with some other work or just simply want to enjoy your vacation?
This is a Node.js repository that consists of that very program.
This app will respond to all your threads once every minute and display the list of threads responded.
Even if there's a response from the sender after having replied from the app's side, the app doesn't respond again. **_It responds to all the threads only once and labels it_**.

That is, 
sender-sends-an-email --> app-replies-with-a-fixed-response --> sender-replies-back --> no-response-from-app

## Technologies used:
1. Node.js
2. Express.js
3. Passport.js
4. EJS
5. Gmail APIs

## Steps (before you run the app)
1. Create an account on google's cloud console with your debit/credit card.
   
2. Create a new project and get its Client ID and Secret by clicking on Credentials
   <img width="953" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/2743f836-3c86-4738-8c7b-15efdc24f05d">

3. Click on 'Enable APIs and Services' and enable Gmail API
 <img width="959" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/4048ef59-11c8-4cf5-b107-f40ed26d8d39">
 
4. Go to OAuth2 developer playground, click on the gear icon and add the Client ID and Secret, then click on close.
   <img width="958" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/0a0d4b9b-51da-4e6e-bfb3-28d344f3c074">

5. On the left, add the following permissions:
   https://www.googleapis.com/auth/gmail.send,https://www.googleapis.com/auth/gmail.readonly, https://mail.google.com/
    https://www.googleapis.com/auth/gmail.modify, https://www.googleapis.com/auth/gmail.compose
   
   <img width="379" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/148cfe76-390a-4e93-957d-17ec26075a17">

7. Click on 'Authorize APIs' and exchange it for refresh and access token.
   
**Steps 5 and 6 are specific to the email id you want to send emails from.**

## After you complete the steps above
1. Clone the project
2. Run <code>npm install</code>
3. Add all the config vars in a config.env file
4. Create a label in your gmail, that helps in segregation of the responded emails. I created a label named _ROV_ (replied on vacation) and fetched the ID of the same using
   the API present at https://developers.google.com/gmail/api/reference/rest/v1/users.labels/list
5. Replace _Label_6980808070016247919_ with the ID of your label.
6. Run <code>node server.js</code>

_All the APIs can be found here: https://developers.google.com/gmail/api/reference/rest_

## Working:
### 1. Login page
This is the page that we get at **/login** route.
<img width="368" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/dbf8a532-1d62-4ac2-8cf6-15613c937943">

Upon clicking on it, we get to choose the email ID and proceed further.

<img width="361" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/47ed620f-5e48-4867-a0f5-8e91a5447884">

### 2. Emails page
This is the page visible at **/mail/user** route.
It shows the list of all thread IDs that have the label ID as _Label_6980808070016247919_ which is the ID of the label _ROV_, with the latest threads being at the top.

<img width="727" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/16017cb7-af58-4d90-81e3-058869ce3ed7">

There's a meta tag present on this page, that helps it refresh every minute, thus, the request to respond to new threads gets sent every minute this way.

### 3. User page

It is visible at **/mail/user-details** route

<img width="778" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/1fcfaf0d-579a-4971-a38e-9cc893e052cb">

New email received:

<img width="599" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/7a3dce6c-1490-48ec-9cdd-5e14ac709728">

The newly responded thread comes at the top:

<img width="761" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/f4afa306-6649-4b45-9b58-bfc9c3e12f89">

The app labels the thread as _ROV_ and replies to the same.

<img width="583" alt="image" src="https://github.com/this-is-shreya/gmail-API-using-passport.js/assets/62089952/6d93ed10-6c89-42c4-97e1-5163893c17ae">

Thus, that was all about the working of the Node.js application that enabled auto-responding to emails. 

