const { SlashCommandBuilder } = require('@discordjs/builders');
const checker = require('ikea-availability-checker');
const fs = require('fs');
const rn = require('random-number')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blåhaj')
        .setDescription('Get Blåhaj Shark stock availability')
        .addSubcommand(subcommand =>
            subcommand
                .setName('country')
                .setDescription('Please enter the two letter code of country')
                .addStringOption(option => option.setName('code').setDescription('2 letter country code'))),
    async execute(interaction) {

        fs.readFile('./ikea_stores.json', async (err, data) => {
            if (err) throw err;
            let stores = JSON.parse(data);
            const code = interaction.options.getString('code')
            const cc = stores[code]

            fs.readFile('./ikea_buCode.json', async (err, data1) => {
                if (err) throw err;

                let storeCodes = JSON.parse(data1)
                //console.log()

                const op1 = {
                    min: 0,
                    max: storeCodes[code].length - 1,
                    integer: true
                }
                const i = rn(op1)
                const ii = storeCodes[code][i]
                console.log(ii)
                try {
                    const here = await checker.availability(ii, '10373589')
                    console.log(here['probability'])
                    console.log(cc[ii])
                    // const str = "Ikea store: " + data[code][ii] + "\n Available stock: " +
                    //     here['probability'] + "\nNumber of stock: " + here['stock'] +"\nRestock date: " + here['restockDate']
                    await interaction.reply('There is ' + here['probability']  + ' 🦈 stock in the ' + cc[ii]  + ' branch.\n ' +
                        'I spent too much time coding this 🙃\n\n' +
                        'Credits: Ephigenia -> ikea-availability-checker')
                } catch (e) {
                    console.log(e)
                    await interaction.reply('This store probably sells Blåhaj 🦈 but we are unable to access information in this country.' +
                        'Please go to https://www.ikea.com' +
                        '\nOr This store does not carry Blåhaj Sharks.' +
                        '\n\nCredits: Ephigenia -> ikea-availability-checker')
                }

            })
        });
    },
};






