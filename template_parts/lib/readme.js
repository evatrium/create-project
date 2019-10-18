let ticks = '```';


export default ({npm_namespace, npm_library_name, npm_library_description}) => {
    let name = `${ npm_namespace}/${ npm_library_name}`;

    return `
    
# ${name}

<img src="https://img.shields.io/circleci/project/github/${ npm_namespace.split('@').join('')}/${ npm_library_name}.svg?style=flat-square" /><img src="https://img.shields.io/npm/v/${name}.svg?style=flat-square" /><img src="https://img.shields.io/bundlephobia/minzip/${name}.svg?style=flat-square" />
> ${ npm_library_description}

## Installation 
${ticks}sh
npm install ${name} --save
${ticks}
### License

[MIT]

[MIT]: https://choosealicense.com/licenses/mit/


`;

}