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
* [ ] start, enter name
  * [ ] store [name, id] in localStorage
    * [ ] get the user from localStorage and show it's name in the header
    * [ ] if user exists show its highest score in the header
    * [ ] send user to the first page
    * [ ] after entering the name give the user token [https://opentdb.com/api_token.php?command=request](https://opentdb.com/api_token.php?command=request) - expires after 6 hours of inactivity
* [ ] first page choose category
  * [ ] get categories from [https://opentdb.com/api_category.php](https://opentdb.com/api_category.php)
  * [ ] tiles with the names of category
    * [ ] get tiles from state [ id, categoryName ]
  * [ ] on tile click will send to the second page
* [ ] second page choose difficulty (eazy, medium, hard, Any difficulty)
  * [ ] radiobuttons with difficulties
  * [ ] read from state [id, difficultyName ]
* [ ] third page choose type of questions (Any type, one correct answer, multiple correct answers)
  * [ ] radiobuttons with type of questions
  * [ ] read from state [id, questionType]
* [ ] generate the url to the [Trivia database](https://opentdb.com/) from the answers
  * [ ] global url variable
* [ ] start of the game
  * [ ] get all question from url and generate it
    * [ ] state of current question
  * [ ] 10 questions in chosen category
    * [ ] show list of questions ( radio buttons or checkboxes )
    * [ ] disabled button if no answer provided to the current question
      * [ ] after user choose something enable button
  * [ ] time limit of 30 seconds on one question
    * [ ] if after 30 seconds user didn't answer finish the game
  * [ ] show the correct answer before loading next
    * [ ] if user choose the correct answer, then highlight it with green color
    * [ ] if user choose the wrong answer, highlight wrong answer with red, and the correct answer with green
* [ ] end of the game
  * [ ] show user total questions and correct answers (7 / 10, 5 / 10, 10 / 10)
  * [ ] button with redirect to the categories page

# Reminder
* connect material ui and axios
* read about react router
* add scss compiler
* add some base styling
* add props checker 

## API request
https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=boolean - example
* amount=10 - amount of questions to get
* category=20 - trivia_category - {9, 32} , any category - ''  or 'any'
* difficulty=easy - trivia_difficulty {any, easy, medium, hard} (any or '')
* type=boolean - trivia_type {any, multiple, boolean} (any or '')