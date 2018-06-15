import userSaga from 'collections/user/saga'; 
import classesSaga from 'collections/classes/saga'; 
import decksSaga from 'collections/decks/saga'; 

const sagas = [
    userSaga,
    classesSaga,
    decksSaga
]; 

export {
    sagas
}