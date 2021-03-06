# quiz_app
Practice and test your knowledge by answering questions in a quiz application.

App is using question from [Free to use, user-contributed trivia question database.](https://opentdb.com/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Todo
* [x] start, enter name
  * [x] store [name, id] in localStorage
    * [x] get the user from localStorage and show it's name in the header
    * [x] if user exists show its highest score in the header
    * [x] send user to the first page
    * [x] after entering the name give the user token [https://opentdb.com/api_token.php?command=request](https://opentdb.com/api_token.php?command=request) - expires after 6 hours of inactivity
* [x] first page choose category
  * [x] get categories from [https://opentdb.com/api_category.php](https://opentdb.com/api_category.php)
  * [x] tiles with the names of category
    * [x] get tiles from state
  * [x] on tile click will send to the second page
  * [x] set localStorage value
* [x] second page choose difficulty (eazy, medium, hard, Any difficulty)
  * [x] blocks with difficulties
  * [x] set localStorage value
* [x] generate the url to the [Trivia database](https://opentdb.com/) from the answers
  * [x] global url variable
* [x] start of the game
  * [x] get all question from url and generate it
  * [x] 10 questions in chosen category
    * [x] show list of questions
    * [x] disabled button if no answer provided to the current question
      * [x] after user choose something enable button
* [x] end of the game
  * [x] show user total questions and correct answers (7 / 10, 5 / 10, 10 / 10)
  * [x] button with redirect to the categories page