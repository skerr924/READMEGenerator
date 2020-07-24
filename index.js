const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const licenses = [
    {name: "Apache 2.0",
    ref: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    }, 
    {name: "Boost", 
    ref: "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)"
    }, 
    {name: "Apache 2.0",
    ref: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    },
    {name: "Apache 2.0",
    ref: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    },
    {name: "Apache 2.0",
    ref: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    },
    {name: "Apache 2.0",
    ref: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    },
    {name: "Apache 2.0",
    ref: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    },
    {name: "Apache 2.0",
    ref: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    },

]
    

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
      type: "checkbox",
      name: "license",
      message: "What license(s) is/are required?", 
      choices: licenses
    },
    {
      type: "input",
      name: "contributing",
      message: "Provide any pertinent information on contributing to the project:"
    },
    {
        type: "input",
        name: "test",
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
  # ${answers.projectTitle}
  Creator: ${answers.yourName}
  GitHub: https://github.com/${answers.username}

  <a name="desc"></a>
  # Description
  ${answers.description}

  
  # Table of Contents 
  1. [Description](#desc)
  2. [Installation](#install)
  3. [Usage](#usage)
  4. [License](#lic)
  5. [Contributing](#contr)
  6. [Tests](#test)
  7. [Questions](#quest)
  
  <a name="install"></a>
  # Installation 
  ${answers.installation}
  
  <a name="usage"></a>
  # Usage 
  ${answers.usage}

  <a name="lic"></a>
  # License 
  ${answers.license}
  
  <a name="contr"></a>
  # Contributing 
  This app was originally created by ${answers.yourName}, who can be found at https://github.com/${answers.username}.
  ${answers.contributing}
  
  <a name="test"></a>
  # Tests 
  ${answers.test}

  <a name="quest"></a>
  # Questions 
  ${answers.questions}

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
