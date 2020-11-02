#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

const packageJson = require("../package.json");

const scripts = `"start": "webpack-dev-server --mode=development --open",
"build": "webpack --mode=production",
"test": "jest",
"test:watch": "jest --watch",
"lint": "eslint src/**/*.js src/**/*.jsx",
"lint:fix": "eslint src/**/*.js src/**/*.jsx --fix",
"format": "prettier --write '**/*.+(js|jsx|json|css|md)'"
`;

const jest = `"jest": ${JSON.stringify(packageJson.jest)}`;
const husky = `"husky": ${JSON.stringify(packageJson.husky)}`;
const lint_staged = `"lint-staged": ${JSON.stringify(packageJson['lint-staged'])}`;


const getDeps = (deps) =>
  Object.entries(deps)
    .map((dep) => `${dep[0]}@${dep[1]}`)
    .toString()
    .replace(/,/g, " ")
    .replace(/^/g, "")
    // exclude the dependency only used in this file, nor relevant to the boilerplate
    .replace(/fs-extra[^\s]+/g, "");

console.log("Initializing project..");

// create folder and initialize npm
exec(
  `mkdir ${process.argv[2]} && cd ${process.argv[2]} && npm init -f`,
  (initErr, initStdout, initStderr) => {
    if (initErr) {
      console.error(`Everything was fine, then it wasn't:
    ${initErr}`);
      return;
    }
    const packageJSON = `${process.argv[2]}/package.json`;
    // replace the default scripts
    fs.readFile(packageJSON, (err, file) => {
      if (err) throw err;
      const data = file
        .toString()
        .replace(
          '"test": "echo \\"Error: no test specified\\" && exit 1"',
          scripts
        )
        .replace('"keywords": []', `${jest},${husky},${lint_staged}`);
      fs.writeFile(packageJSON, data, (err2) => err2 || true);
    });

    const filesToCopy = [	
      ".babelrc",
      ".eslintrc.json",
      ".prettierrc.js",
      "webpack.config.js"
    ];

    for (let i = 0; i < filesToCopy.length; i += 1) {
      fs.createReadStream(path.join(__dirname, `../${filesToCopy[i]}`)).pipe(
        fs.createWriteStream(`${process.argv[2]}/${filesToCopy[i]}`)
      );
    }

    console.log("npm init -- done\n");

    // installing dependencies
    console.log("Installing deps -- it might take a few minutes..");
    const devDeps = getDeps(packageJson.devDependencies);
    const deps = getDeps(packageJson.dependencies);
    exec(
      `cd ${process.argv[2]} && git init && node -v && npm -v && npm i -D ${devDeps} && npm i -S ${deps}`,
      (npmErr, npmStdout, npmStderr) => {
        if (npmErr) {
          console.error(`Some error while installing dependencies
      ${npmErr}`);
          return;
        }
        console.log(npmStdout);
        console.log("Dependencies installed");

        console.log("Copying public folder files..");
        fs.copy(path.join(__dirname, "../public"), `${process.argv[2]}/public`)
          .then(() =>
            console.log(
              `Public folder created`
            )
          )
          .catch((err) => console.error(err));

        console.log("Copying generator folder files..");
        fs.copy(path.join(__dirname, "../generator"), `${process.argv[2]}/generator`)
          .then(() =>
            console.log(
              `Generator folder created`
            )
          )
          .catch((err) => console.error(err));

        console.log("Copying additional files..");
        // copy additional source files
        fs.copy(path.join(__dirname, "../src"), `${process.argv[2]}/src`)
          .then(() =>
            console.log(
              `All done!\n\nYour project is now ready\n\nUse the below command to run the app.\n\ncd ${process.argv[2]}\nnpm start`
            )
          )
          .catch((err) => console.error(err));
      }
    );
  }
);
