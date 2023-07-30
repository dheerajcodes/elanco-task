### Elanco Cloud Monitor

# Project Description

Elanco Cloud Monitor is a web application built with React that allows users to view resource details and applications using those resources. The application fetches data from a RESTful API to display information about resources and their consumption over time.

## Dependencies

This project relies on the following dependencies:

`React` (version `^18.2.0`): JavaScript library for building user interfaces.

`axios` (version `1.4.0`): Promise-based HTTP client for making API requests.

`react-router-dom `(version `^6.14.2`): Routing library for React applications.

`@chakra-ui/react` (version `^2.8.0`): Component library for building UI with Chakra UI.

`recharts` (version `^2.7.2`): Charting library for React applications.

Please make sure to install these dependencies before running the project.


## Build and Run Instructions

To build and run the project, follow these steps:

Clone the repository to your local machine.

Navigate to the project directory.

`cd project-directory`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


### Directory Structure

The project directory structure is organized as follows:

project-directory/
  ├── public/
  │   ├── index.html
  │   └── ...
  ├── src/
  │   ├── components/
  │   │   ├── ApplicationDetails
  │   │   ├── Header
  │   │   └── ...
  │   ├── pages/
  │   │   ├── Applications
  │   │   ├── Resources
  │   │   └── ...
  │   ├── Charts/
  │   │   ├── MyLineChart.js
  │   │   ├── MyBarChart.js
  │   │   └── ...
  │   ├── App.js
  │   ├── index.js
  │   └── ...
  ├── .env
  ├── .gitignore
  ├── package.json
  └── README.md


`public`: Contains the public assets and index.html file.

`src`: Contains the source code for the React application.

`components`: Contains reusable components used across different pages.

`pages`: Contains individual page components.

`Charts`: Contains custom chart components.

`App.js`: Main application component that handles routing.

`index.js`: Entry point for the React application.

`.env`: Environment variables file (not committed to version control).

`.gitignore`: Specifies which files and directories to ignore in version control.

`package.json`: Lists project dependencies and scripts.

`README.md`: This file, providing project documentation.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
