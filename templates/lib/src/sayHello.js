export const sayHello = () => {
    let d = document;
    d.body.appendChild(
        d.createElement('h1').appendChild(
            d.createTextNode('HELLO FROM DEV APP!!!')
        )
    );
};