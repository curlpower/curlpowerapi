### READ ME

This is the back-end api for our survey app. This is how our front end interacts with out database to complete several actions including all user authentications. It allows our app to build new surveys as well as show surveys already built to other users. The app allows users to create surveys and take other users surveys.

We used express.js to build the back end portion of the project.

One of the unsolved problems we would like to revisit later would be to try and allow for any kind of submission. Allow the user to make a survey with any kind of input for the response to the survey.

- ERD: https://imgur.com/g2UjPS9
- Front-end repo: https://github.com/curlpower/curlpower
- Deployed Front-end: https://curlpower.github.io/curlpower/
- Deployed Api-heroku: https://survey-power.herokuapp.com/

For the back-end, we started off with the most basic app. One that could make surveys without submissions. This was the first step to our app. Once we were able to create and look at all the surveys we moved on do doing submissions. This ensured that we did smaller steps each time. After making the Survey schema we had to add the submissions schema and link then together. Once they were linked we were able to test submissions by trying to create some. When we would run into a problem we would talk all talk through the problem and attempt to solve it together by diagraming out what needed to be done.

For surveys routes and methods we have:

- /surveys to get all out surveys with index method
- /surveys to post a survey with the create method
- /surveys/:id to get one specific survey with show method
- /surveys/:id to patch one survey with an update method
- /surveys/:id to delete one survey with a delete method

For our submissions routes and methods we have:

- /submissions to get all submissions with an index method hat belong to a survey- this one needs the survey ID
- /submissions to post a submission with a create method - this one needs the survey ID
