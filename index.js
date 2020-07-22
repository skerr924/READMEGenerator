const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "projectTitle",
      message: "What is the title of this project or application?"
    },
    {
      type: "input",
      name: "description",
      message: "Provide a description of the project:"
    },
    {
      type: "input",
      name: "installation",
      message: "Provide any pertinent facts about installation: "
    },
    {
      type: "input",
      name: "usage",
      message: "Provide any pertinent facts about usage:"
    },
    {
      type: "input",
      name: "license",
      message: "What liceense(s) is/are required?"
    },
    {
      type: "input",
      name: "contributing",
      message: "Provide any pertinent information on contributing to the project:"
    },
    {
        type: "input",
        name: "tests",
        message: "Provide any pertinent information about testing:"
    },
    {
        type: "input",
        name: "questions",
        message: "Are there any frequently asked questions you'd like to share?"
    }, 
    {
        type: "input", 
        name: "username",
        message: "What is your GitHub username?"
    }, 
    { 
        type: "input", 
        name: "yourName", 
        message: "What is your name?"
    }
  ]);
}

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const html = generateHTML(answers);

    await writeFileAsync("index.html", html);

    console.log("Successfully wrote to index.html");
  } catch(err) {
    console.log(err);
  }
}

init();
