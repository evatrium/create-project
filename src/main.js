import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import gitignore from 'gitignore';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import {projectInstall} from 'pkg-install';
import license from 'spdx-license-list/licenses/MIT';
import {promisify} from 'util';
import fse from 'fs-extra';

import packagejson from '../template_parts/lib/packagejson'
import readme from '../template_parts/lib/readme'
import rollupconfig from '../template_parts/lib/rollupconfig'


const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);
const copy = promisify(ncp);
const writeGitignore = promisify(gitignore.writeFile);


async function copyTemplateFiles(options) {
    return fse.copy(options.templateDirectory, options.targetDirectory);
}

async function createLicense(options) {
    const targetPath = path.join(options.targetDirectory, 'LICENSE');
    const licenseContent = license.licenseText
        .replace('<year>', new Date().getFullYear())
        .replace('<copyright holders>',
            // `${options.name} (${options.email})`
            ''
        );
    return fse.writeFile(targetPath, licenseContent, 'utf8');
}

async function initGit(options) {
    const result = await execa('git', ['init'], {
        cwd: options.targetDirectory,
    });
    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
}

function generateFilesFromParts(options) {
    return Promise.all([
        fse.writeFile(options.targetDirectory + '/package.json', packagejson(options)),
        fse.writeFile(options.targetDirectory + '/README.MD', readme(options)),
        fse.writeFile(options.targetDirectory + '/rollup.config.lib.js', rollupconfig(options))
    ])
}

export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
        email: '',
        name: '',
    };

    const templateDir = path.resolve(
        new URL(import.meta.url).pathname,
        '../../templates',
        options.template
    );

    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    console.log(options);

    const tasks = new Listr(
        [
            {
                title: 'Copy project files',
                task: () => copyTemplateFiles(options),
            },
            {
                title: 'Generate files',
                task: () => generateFilesFromParts(options)
            },
            {
                title: 'Create License',
                task: () => createLicense(options),
            },
            {
              title: 'Initialize git',
              task: () => initGit(options),
              enabled: () => options.git,
            },
            {
              title: 'Installing dependencies...',
              task: () =>
                projectInstall({
                  cwd: options.targetDirectory,
                }),
              skip: () =>
                !options.runInstall
                  ? 'Pass --install to automatically install dependencies'
                  : undefined,
            },
        ],
        {
            exitOnError: false,
        }
    );

    // await Promise.resolve();
    await tasks.run();
    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}
