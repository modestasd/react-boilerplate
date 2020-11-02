/* eslint-disable */
const inquirer = require('inquirer');
const fs = require('fs');

const QUESTION_TEXT= {
    subfolderName: 'subfolder name(if exist)',
    componentName: 'component name',
    actions: 'Do you want stateful component?',
};

const QUESTIONS = [
    {
        name: QUESTION_TEXT.subfolderName,
        type: 'string',
    },
    {
        name: QUESTION_TEXT.componentName,
        type: 'string',
    },
    {
        name: QUESTION_TEXT.actions,
        type: 'confirm',
    },
];

inquirer.prompt(QUESTIONS).then(answers => {
    const subfolder = answers[QUESTION_TEXT.subfolderName];
    const componentName = answers[QUESTION_TEXT.componentName];
    const stateful = answers[QUESTION_TEXT.actions];
    
    let upperCaseName = `${toUpperCaseFirstChar(componentName)}`;
    const templatePath =  `${__dirname}/templates/${stateful ? `statefulComponent` : `statelessComponent`}`;
    const newFilesPath = `${process.cwd()}/src/components/${subfolder ? subfolder + `/` : ''}${upperCaseName}`;
    const indexJsPath = `${process.cwd()}/src/components/${subfolder ? subfolder + `/` : ''}index.js`;

    //add export default to global index.js file
    const exportText = `\r\nexport { default } from './${upperCaseName}';`
    fs.appendFile(indexJsPath, exportText, (err)=>{
        if (err) {
            console.log(err);
        }
    });
    //create component folder
    fs.mkdirSync(newFilesPath);
    createDirectoryContents(templatePath, newFilesPath, componentName);
});

function createDirectoryContents(templatePath, newFilesPath, componentName) {
    const filesToCreate = fs.readdirSync(templatePath);
    //add files and content to created component folder
    filesToCreate.forEach(file => {
        writeFile(file, componentName, templatePath, newFilesPath);
    });
}

function writeFile(file, componentName, templateFilePath, newFilesPath) {
    let filename;
    let upperCaseName = `${toUpperCaseFirstChar(componentName)}`;
    switch (file) {
        case 'Component.js':
            filename = `${upperCaseName}.js`;
            break;    
        case 'Component.test.js':
            filename = `${upperCaseName}.test.js`;
            break;   
        case 'Component.styles.js':
            filename = `${upperCaseName}.styles.js`;
            break;   
        default:
            filename = `index.js`;
            break;
    };

    const content = fs.readFileSync(`${templateFilePath + `/` + file}`, 'utf8');
    const writePath = `${newFilesPath}/${filename}`;

    let replacedContent = content.replace(
        new RegExp(/(COMPONENT_NAME)+/g),
        upperCaseName,
    );
    fs.writeFileSync(writePath, replacedContent, 'utf8');
}


const toUpperCaseFirstChar = word => {
    if (word && typeof word === 'string' && word.length > 0) {
        return `${word[0].toUpperCase()}${word.slice(1, word.length)}`;
    }
    return word;
};

