const { SlashCommandBuilder } = require('@discordjs/builders');
const wiki = require('wikipedia')
const rn = require('random-number')

const sharks = {
    "basking": 93,
    "blacktip": 114,
    "blue": 107,
    "bull": 110,
    "hammerhead": 127,
    "lemon": 119,
    "mako": 101,
    "nurse": 73,
    "sand tiger": 97,
    "thresher": 118,
    "tiger": 97,
    "whale": 133,
    "white": 135,
    "whitetip": 125
}

const sharkArr = ["basking", "blacktip", "blue", "bull", "hammerhead", "lemon", "mako",
                    "nurse", "sand", "thresher", "tiger", "whale", "white", "whitetip"]

const option1 = {
    min: 0,
    max: 13,
    integer: true
}

async function getShark() {
    const i = rn(option1)
    const sharkName = sharkArr[i]
    const sharkNum = sharks[sharkName]

    const option2 = {
        min: 0,
        max: sharkNum - 1,
        integer: true
    }

    return [sharkName, rn(option2)]
}

async function getSharkWiki(shark) {
    console.log(shark[0])
    const pg = await wiki.page(shark[0] + ' shark')
    const summary = await pg.summary()
    console.log(summary['extract'])
    return summary
}

async function appendZeros(i) {
    const iStr = i.toString()
    const zerosNeeded = 8 - iStr.length
    let zeros = ''
    for (let i = 0; i < zerosNeeded; i++) {
        zeros = zeros + '0'
    }
    return zeros.concat(iStr)
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomsharkfact')
        .setDescription('Returns an image and information on a random species of shark.'),
    async execute(interaction) {
        try {

            const shark = await getShark()

            const summary = await getSharkWiki(shark)

            const id = await appendZeros(shark[1])

            const embed = {
                color: 0x003253,
                title: 'Information on ' + shark[0] + ' shark 🦈',
                url: summary['content_urls']['page'],

                description: summary['extract'],

                fields: [
                    {
                        name: 'Credits',
                        value: 'Information from wikipedia.org, extracted with npm package: wikipedia\n' +
                            'Shark image from Kaggle User: lautoro',
                    }
                ],

                image: {
                    url: ''
                },
                timestamp: new Date(),
                footer: {
                    text: 'Poetic Shark Bot',
                    icon_url: 'https://raw.githubusercontent.com/hua-lun/poetic_shark/master/img/Poetic%20Shark.png',
                },
            }

            embed['image']['url'] = 'https://raw.githubusercontent.com/hua-lun/poetic_shark/master/sharks/' + shark[0] + '/' + id + '.jpg'

            console.log(embed)

            await interaction.reply({embeds: [embed]});

        } catch (e) {
            console.log(e);
            await interaction.reply('Server issues, please try again.')
        }
    },
};