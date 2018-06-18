import userSaga from 'collections/user/saga'; 
import classesSaga from 'collections/classes/saga'; 
import decksSaga from 'collections/decks/saga'; 
import cardsSaga from 'collections/cards/saga'; 

const sagas = [
    userSaga,
    classesSaga,
    decksSaga, 
    cardsSaga, 
]; 

export {
    sagas
}