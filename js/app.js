const prefix = '!'
const options = {
    options: {
        debug: false
    },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: _configuration.identity_username,
        password: _configuration.identity_password
    },
    channels: [ _configuration.channel_twitch ]
}

const poll = new StrawPoll()
const client = new tmi.client(options)

client.connect()

client.on('chat', (channel, user, message, isSelf) => {
    if (isSelf) return
    
    const fullCommand = poll.commandParser(message)
    
    if (fullCommand) {
        const statutStraw = poll.getStatut()
        const statutPause = poll.getPause()

        if (statutStraw && !statutPause) {
            const check_vote = poll.checkVote(fullCommand[0])
            if (check_vote !== -1) {
                const check_user = poll.checkUser(user.username)
                if (check_user === -1) {
                    poll.addUser(user.username)
                    poll.postVote(check_vote)
                }
            }
        }
        if (poll.isBroadcaster(user) || poll.isModerator(user)) {
            let command_trim = fullCommand[2].trim()

            if (fullCommand[1] === 'poll') {
                if (command_trim === 'stop') {
                    poll.reset()
                }
                else if (command_trim === 'hide') {
                    poll.toggleOV()
                }
                else if (command_trim.substr(0, 3) === 'add') {
                    let option = command_trim.substr(3, command_trim.length)
                    option = option.trim()
                    const optionsI = poll.addOption(option)
                    if (optionsI >= 0)
                        client.say(channel, `imGlitch - Pour voter (${option}), tapez : !${optionsI} `)
                    if (optionsI === -1)
                        client.say(channel, "imGlitch - Il n'y a aucun StrawPoll en cours.")
                }
                else {
                    if (poll.createPoll(command_trim))
                        client.say(channel, `imGlitch Nouveau StrawPoll! (${command_trim})`)
                    else
                        client.say(channel, 'imGlitch - Erreur dans la formulation du StrawPoll.')
                }
            }
            else if (fullCommand[1] === 'pollcmd') {
                client.say(channel, "imGlitch - Les commandes : !poll (nom du strawPoll) - !poll add (option) - !poll stop - !poll hide")
            }
            else if (fullCommand[1] === 'updatehtml') {
                poll.updateHTML()
            }
        }
    }
})
