import arg from 'arg';
import inquirer from 'inquirer';
import {createProject} from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install',
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        template: args._[0],
        runInstall: args['--install'] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'module';
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
        };
    }

    const questions = [];

    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: ['lib'],
            default: defaultTemplate,
        });
    }

    if (!options.git) {
      questions.push({
        type: 'confirm',
        name: 'git',
        message: 'Should a git be initialized?',
        default: false,
      });
    }
    questions.push({
        type: 'input',
        name: 'npm_namespace',
        message: 'Enter npm namespace...',
        default: '@iosio',
    });

    questions.push({
        type: 'input',
        name: 'npm_library_name',
        message: 'Enter library name...',
        default: 'my-lib',
    });

    questions.push({
        type: 'input',
        name: 'npm_library_description',
        message: 'Enter library description...',
        default: 'This is my awesome library...',
    });

    questions.push({
        type: 'confirm',
        name: 'runInstall',
        message: 'Install dependencies?',
        default: false,
    });


    const answers = await inquirer.prompt(questions);

    return {
        ...options,
        ...answers,
        git: options.git || answers.git,x
        // git: true,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createProject(options);
}


