#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv
import axios from 'axios'
import chalk from 'chalk'

if (argv.url && argv.username && argv.authkey) {
    const {
        username,
        authkey,
        url
    } = argv
    if (typeof username === 'string' && typeof authkey === 'string' && typeof url === 'string') {
        const config = {
            url: url + "/status/heartbeat/" + username + "?auth=" + authkey,
        }
        console.log(chalk.yellow("Sending heartbeat to " + config.url + "...\n"))

        function sendHeartbeat() {
            axios(config)
            .then(function (response) {
                if(response.data.updateUserStatus.username == username){
                    console.log(chalk.green("User Status Ping Successfully"))
                }
                else{
                    console.log(chalk.red("User Status Ping Failed"))
                }
            })
            .catch(function (error) {
                console.log(chalk.red(error.message))
            })
        }

        sendHeartbeat()

        setInterval(() => {
            sendHeartbeat()
        }, 60000)
    } else {
        
        console.log(chalk.red('Username')+', '+url+' and '+authkey+'must be strings')
    }
} else {
    console.log(`You need to provide a username, a url and an authkey`)
}