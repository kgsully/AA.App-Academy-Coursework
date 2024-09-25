import produceData from '../mockData/produce.json';

const POPULATE = 'produce/POPULATE';
const LIKE = 'produce/LIKE';

export const getAllProduce = (state) => Object.values(state.produce);

export function populateProduce() {
    return {
        type: POPULATE,
        produce: produceData
    }
}

export function likeProduce(produceId) {
    return {
        type: LIKE,
        produceId
    }
}

function produceReducer(state = {}, action) {
    const newState = {...state};
    switch(action.type) {
        case POPULATE:
            // const newState = {}; // moved this outside of the case
            action.produce.forEach(produce => {
                newState[produce.id] = produce
            });
            return newState;
            // IN THIS INSTANCE - could use the code: return {...action.produce};
            // HOWEVER, if the intent is to use the produce ID as the object keys, it won't work as the spread operator will
            // start the object id / index key at 0 - giving an off-by-one if the produce id's start at 1 and increment by 1 (1, 2, 3, etc)
            // or being completely off if the produce id's are just numbers that don't follow any start / incrementing convention.
            // use the .forEach method to properly normalize the data such that the object id keys match the produce id's.
        case LIKE:
            newState[action.produceId].liked = !newState[action.produceId].liked;
            return newState;
        default:
            return state;
    }
}

export default produceReducer;
