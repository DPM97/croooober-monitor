const request = require('request');
const cheerio = require('cheerio');

module.exports.links = async (keyword) => {
    return new Promise(async (resolve, reject) => {
        let links = [];
        await request({
            uri: `https://www.croooober.com/en/cparts/search?category=cparts&q=${keyword}`,
            method: "GET"
        }, async (err, res, body) => {
            const $ = await cheerio.load(body);
            let query = await $('div[id="item"]').attr('data-id-list');
            query = query.replace('[', '').replace(']', '').replace(/ /g, '');
            query = query.split(',');
            await query.forEach(async pid => {
                let temp = await $(`a[data-item-id="${pid}"]`).attr('href');
                links.push(`https://www.croooober.com${temp}`)
                if (links.length == query.length) {
                    resolve(links);
                }
            })
        })
    })
}

module.exports.pData = async (url) => {
    return new Promise(async (resolve, reject) => {
        let data = { };
        await request({
            uri: url,
            method: "GET"
        }, (err, res, body) => {
            const $ = cheerio.load(body);
            data.name = $('h1[class="item_title"]').text();
            data.price = $('div[class="price crbr-parts-spec-price"]').text();
            data.price = data.price.substring(data.price.lastIndexOf("S") + 1, data.price.lastIndexOf("(") - 1)
            data.img = $('a[class="group4"]');
            data.img = 'https:' + data.img.get(0).attribs.href;
            data.url = url;
            resolve(data);
        })
    })
}

