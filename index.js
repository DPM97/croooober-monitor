const fetch = require('./fetch')
const send = require('./sender')

let keywords = ["work", "bbs"];
let links = [];

let timeout = 300; //interval delay in seconds

const main = async () => {
    await first();
    let f = setInterval(async () => {
        keywords.forEach(async kw => {
            let items = await fetch.links(kw);
            items.forEach(url => {
                if (!links.includes(url)) {
                    links.push(url);
                    if (items.indexOf(url) < 10) {
                        getData(url);
                    }
                }
            })
        })
    }, timeout * 1000)
}

const first = async () => {
    return new Promise(async (resolve, reject) => {
        keywords.forEach(async kw => {
            let items = await fetch.links(kw);
            await items.forEach(url => {
                links.push(url);
            })
            resolve();
        })
    })
}

const getData = async (url) => {
    let data = await fetch.pData(url);
    send(data)
}

main();