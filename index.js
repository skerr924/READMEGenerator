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

function generateREADME(answers) {
  return `
  # Title 

  <a name="desc"></a>
  # Description 
  
  # Table of Contents 
  [Description](#desc)
  [Installation](#install)
  [Usage](#usage)
  [License](#lic)
  [Contributing](#contr)
  [Tests](#test)
  [Questions](#quest)
  
  <a name="install"></a>
  # Installation 
  
  <a name="usage"></a>
  # Usage 
  
  <a name="lic"></a>
  # License 
  
  <a name="contr"></a>
  # Contributing 
  
  <a name="test"></a>
  # Tests 
  
  <a name="quest"></a>
  # Questions 
  `;
}

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const md = generateREADME(answers);

    await writeFileAsync("README2.md", md);

    console.log("Successfully wrote to README2.md");
  } catch(err) {
    console.log(err);
  }
}

init();
