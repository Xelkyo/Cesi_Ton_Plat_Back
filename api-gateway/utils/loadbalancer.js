const loadbalancer = {}

loadbalancer.ROUND_ROBIN = (service) => {
    //Incrémentation de l'index ou remise à 0
    const newIndex = ++service.index >= service.instances.length ?
        0 : service.index

    //Sauvegarde de la nouvelle valeur de index
    service.index = newIndex

    return newIndex
}

module.exports = loadbalancer