const request = require('request');

const webhook = 'YOUR WEBHOOK URL'
module.exports = (data) => {
    request({
        url: webhook,
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        json: {
            "embeds": [
                {
                    "color": 3145631,
                    "timestamp": new Date().toISOString(),
                    "footer": {
                        "icon_url": "https://www.croooober.com/assets_pc/img/common/syndication/logo.200_200.png",
                        "text": "Croooober Monitor by Dollon"
                    },
                    "author": {
                        "name": "Croooober Monitor",
                        "url": "https://discordapp.com",
                        "icon_url": "https://www.croooober.com/assets_pc/img/common/syndication/logo.200_200.png"
                    },
                    "fields": [
                        {
                            "name": "Title",
                            "value": data.name,
                            "inline": false
                        },
                        {
                            "name": "Price",
                            "value": data.price,
                            "inline": true
                        },
                        {
                            "name": "Link",
                            "value": data.url,
                            "inline": false
                        }
                    ],
                    "image": {
                        "url": data.img
                    }
                }
            ]
        }
    }, (error, response, html) => {
        return;
    });
}
