const makeid = (length) => {
    let result = [];
    const characters = 'ABCD9NAy7ozZiVwr7Us8ZNJtXWrXcCMC9ym4Zm2RfEHfKtuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

export default makeid