const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//all license selection options listed here as objects 
const licenses = [
    {name: "Apache 2.0",
    ref: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    }, 
    {name: "Boost", 
    ref: "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)"
    }, 
    {name: "BSD 3-Clause License",
    ref: "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
    },
    {name: "Eclipse Public License 1.0",
    ref: "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)"
    },
    {name: "GNU GPL v3",
    ref: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
    },
    {name: "GNU GPL v2",
    ref: "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)"
    },
    {name: "ISC",
    ref: "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
    },
    {name: "MIT",
    ref: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    },
    {name: "Mozilla Public License 2.0",
    ref: "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"
    },
    {name: "Attribution License (BY)",
    ref: "[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)"
    },
    {name: "Open Database License (ODbL)",
    ref: "[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)"
    },
    {name: "The Perl License",
    ref: "[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)"
    },
    {name: "SIL Open Font License 1.1",
    ref: "[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL%201.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)"
    },
    {name: "The Unlicense",
    ref: "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)"
    },
    {name: "WTFPL",
    ref: "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)"
    },
    {name: "Zlib",
    ref: "[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)"
    },

]
    
//prompts user in the commandline 
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
  ${answers.license.ref}
  
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
