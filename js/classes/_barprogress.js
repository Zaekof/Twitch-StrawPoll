/**
 * BarProgress
 * Barre de progression (option du strawpoll)
 */
BarProgress = function () {
    this.id = null

    /**
     * Ajout d'un vote dans le StrawPoll
     * @param {number} vote
     * @param {number} cpt_progress
     * @param {oject} options
     */
    this.addVote = function (vote, id, cpt_progress, options) {
        let elem = $(`#container${id}`)
        elem[0].children[0].value += 1
    
        this.refreshBars(cpt_progress, vote, options)
    }

    /**
     * Actualise les options du StrawPoll
     * @param {number} cpt_progress
     * @param {number} vote
     * @param {oject} options
     */    
    this.refreshBars = function (cpt_progress, vote, options) {
        for (let i = 0; i < cpt_progress; i++) {
            let elem = $(`#container${i}`)
            elem[0].children[0].max = vote
    
            elem[0].children[1].children[0].innerText = parseInt(options[i].votes)
            elem[0].children[1].children[1].children[0].innerText = Math.round((elem[0].children[0].value / vote) * 100)
        }
    }

    /**
     * Ajouter
     * @param {number} id
     */
    this.add = function (id) {
        this.id = id
        return this
    }
}