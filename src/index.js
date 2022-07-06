require("dotenv").config()
const { Telegraf } = require('telegraf')
const botInfo = require("./package.json")
const logger = require('./logger')

const bot = new Telegraf(process.env.BOT_TOKEN)

const log = (ctx) => {
    logger({user: ctx.message.chat.id, message: ctx.message.text})
}

bot.start(ctx => {
    ctx.reply(`Привет, ${ctx.message.from.first_name}!`)
    log(ctx)
})

bot.on('message', (ctx) => {
    ctx.reply(ctx.message.text)
    log()
})

const start = async () => {
    try {
        await bot.launch()
        logger({message: `${botInfo.name}:${botInfo.version} successfully started`})
    } catch (e) {
        logger({message: `${e}`})
    }
}

start()

process.once('SIGINT', () => {
    logger({message: `${botInfo.name}:${botInfo.version} successfully stopped (SIGINT)`})
    bot.stop('SIGINT')
})
process.once('SIGTERM', () => {
    logger({message: `${botInfo.name}:${botInfo.version} successfully stopped (SIGTERM)`})
    bot.stop('SIGTERM')
})