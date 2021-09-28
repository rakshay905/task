There are two apis
1. login
2. profile

username and password for login are -
username = abcd@1234.com
password = password
Note: you can change them in account_ctr.js

Login - On success login, you will get accessToken in response.

http://localhost:5000/api/user/login
Post : body { "username": abcd@1234.com, "password": "password" }

Profile - paas the accessToken in body same as recieved and it will validate the user and then send username and password in the response.
http://localhost:5000/api/user/profile
Post : body { "accessToken": "dasdasdsadsadsdsadsad423432432dasda4dadasdsa2sfsf.dasdasd233423fdsfdfdsfdsfsdfdsfds }
