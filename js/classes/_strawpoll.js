/**
 * @Class StrawPoll
 */
StrawPoll = function() {
    this.statut = false     // Statut du Poll
    this.duration = 0       // Durée du Poll
    this.question = null    // Question du poll
    this.options = []       // Options du poll
    this.commandes = []
    this.users = []
    this.pause = false
    this.vote = 0
    this.progressAR = []

    this.error_code = 0     // 0 = Pas d'erreur
                            // 1 = Erreur de parenthèse
                            // 2 = Erreur de texte

    /**
     * Rénitialise le StrawPoll
     */                          
    this.reset = function() {
        this.statut = false     // Statut du Poll
        this.duration = 0       // Durée du Poll
        this.question = null    // Question du poll
        this.options = []       // Options du poll
        this.commandes = []
        this.users = []
        this.pause = false
        this.vote = 0
        this.progressAR = []
    
        if (_configuration.audio.enable) {
            createSound('connect', '../audio/disconnect.mp3', _configuration.audio.volume, 3000)
        }
    
        this.updateHTML()
        $('.options').html('')
        this.hideProgressOV()
    }

    /**
     * Parse des commandes
     * @param {string} message
     * @return {string}
     */
    this.commandParser = function(message) {
        const prefixEscaped = prefix.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        const regex = new RegExp(`^${prefixEscaped}([a-zA-Z0-9_]+)\s?(.*)`)
        return regex.exec(message)
    }

    /**
     * L'utilisateur est un Subs ?
     * @param {} user
     * @return {}
     */
    this.isSubscriber = function(user) {
        return user.subscriber
    }

    /**
     * L'utilisateur est un Moderator ?
     * @param {} user
     * @return {}
     */
    this.isModerator = function(user) {
        return user.mod
    }

    /**
     * L'utilisateur est un Broadcaster ?
     * @param {} user
     * @return {}
     */
    this.isBroadcaster = function(user) {
        if (user.badges !== null)
            return user.badges.broadcaster == '1'
    }

    /**
     * Retourne la question
     * @return {string}
     */    
    this.getQuestion = function() {
        return this.question
    }

    /**
     * Retourne les options
     * @return {array}
     */      
    this.getOptions = function() {
        return this.options
    }

    /**
     * Retourne les erreurs
     * @return {number}
     */      
    this.getError = function() {
        return this.error_code
    }

    /**
     * Retourne les commandes
     * @return {array}
     */       
    this.getCommandes = function() {
        return this.commandes
    }

    /**
     * Poster le vote
     * @param {number} id
     */        
    this.postVote = function(id) {
        this.options[id].votes += 1
        this.progressAR[id].addVote(this.users.length, id, this.progressAR.length, this.options)
    }

    /**
     * Retourne le vote
     * @param {string} vote
     * @return {number}
     */      
    this.checkVote = function(vote) {
        return this.commandes.indexOf(vote)
    }

    /**
     * Ajouter un user
     * @param {string} user
     */       
    this.addUser = function(user) {
        this.users.push(user)
    }

    /**
     * Verifier l'user dans la liste des users
     * @param {string} user
     * @return {number}
     */         
    this.checkUser = function(user) {
        return this.users.indexOf(user)
    }

    /**
     * Retourne le tableau des progress
     * @return {array}
     */     
    this.viewProgressBar = function () {
        return this.progressAR
    }

    /**
     * Mise à jour du bloc HTML
     */
    this.updateHTML = function() {
        $('.question #question').text(this.question)
    }

    /**
     * Création du Poll
     * @param {string} question
     * @return {boolean}
     */    
    this.createPoll = function (question) {
        if (question !== '') {
            if (_configuration.audio.enable) {
                createSound('connect', '../audio/connect.mp3', _configuration.audio.volume, 3000)
            }
            this.question = question
            this.statut = true
            this.printProgressOV()
            this.updateHTML()
            return true
        }
        return false
    }

    /**
     * Ajouter l'option au poll
     * @param {string} tmp_option
     * @return {number}
     */
    this.addOption = function (tmp_option) {
        if (this.statut) {
            const i = this.options.length
        
            this.options.push({'option':tmp_option,'votes':0})
            this.commandes.push(`!${i}`)
        
            const option = this.options[i].option
            const commande = this.commandes[i]
        
        
            const query = `
            <div class="option" data-optionDATA="option${i}">
                <h5 id="commande">${commande}</h5>
                <div class="progressbar" id="container${i}">
                    <progress class='cnt' max="100" value="0"></progress>
                    <span>
                        <span id="progressbar_votes">0</span> vote(s) <span id="progressbar_pt_bloc"><span id="progressbar_pourcent">0</span>%</span>
                    </span>
                </div>
                <h5 id="option">${option}</h5>
            </div>`
        
            $('.options').append(query)
        
            const cl_progress = new BarProgress()
            this.progressAR.push(cl_progress.add(i))
            this.updateHTML()
            return i
        }
        return -1
    }

    /**
     * Cache le StrawPoll de la page HTML
     */    
    this.hideProgressOV = function () {
        $('section.section').css('display', 'none')
    }

    /**
     * Cache/Affiche le StrawPoll + mise en pause/play
     */      
    this.toggleOV = function () {
        $('section.section').fadeToggle( "slow", "linear" )
        this.pause = !this.pause
    }

    /**
     * Retourne le Statut du StrawPoll (pause/play)
     * @return {boolean}
     */     
    this.getPause = function () {
        return this.pause
    }

    /**
     * Affiche le StrawPoll sur la page HTML
     */        
    this.printProgressOV = function () {
        $('section.section').fadeIn('slow')
    }

    /**
     * Retourne le Statut du StrawPoll
     * @return {boolean}
     */        
    this.getStatut = function () {
        return this.statut
    }
}
