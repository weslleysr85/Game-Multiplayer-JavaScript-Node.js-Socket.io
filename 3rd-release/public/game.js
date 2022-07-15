function createGame () 
{
    const current = undefined;

    const state = {
        size:40, //tamanho do jogador
        players: {}       
    }

    const observers = [];

    function subscribe (observerFunction)
    {
        observers.push(observerFunction);
    }

    function notifyAll (command)
    {
        for(const observerFunction of observers)
        {
            observerFunction(command);
        }
    }

    function start ()
    {
       
    }

    function setState (newState)
    {
        Object.assign(state, newState);
    }

    function addPlayer (command)
    {
        const { 
            id, 
            x = Math.floor(Math.random() * state.size), 
            y = Math.floor(Math.random() * state.size) 
        } = command;

        state.players[id] = { id, x, y, points:0 };
        
        notifyAll({
            type: 'add-player',
            id, x, y
        });
    }

    function removePlayer (command)
    {
        const { id } = command;
        delete state.players[id];

        notifyAll({
            type: 'remove-player',
            id
        });
    }

    function selectPlayer (command)
    {
        const { id } = command;
        state.current = id;
    }

    
    return {
        state,
        setState,
        subscribe,
        addPlayer,
        removePlayer,
        selectPlayer,
        current,
        start
    }
}

export default createGame;