import produceData from '../mockData/produce.json';

const POPULATE = 'produce/POPULATE'

export function populateProduce() {
    return {
        type: POPULATE,
        produce: produceData
    }
}

function produceReducer(state = {}, action) {
    switch(action.type) {
        case POPULATE:
            const newState = {};
            action.produce.forEach(produce => {
                newState[produce.id] = produce
            });
            return newState;
            // IN THIS INSTANCE - could use the code: return {...action.produce};
            // HOWEVER, if the intent is to use the produce ID as the object keys, it won't work as the spread operator will
            // start the object id / index key at 0 - giving an off-by-one if the produce id's start at 1 and increment by 1 (1, 2, 3, etc)
            // or being completely off if the produce id's are just numbers that don't follow any start / incrementing convention.
            // use the .forEach method to properly normalize the data such that the object id keys match the produce id's.
        default:
            return state;
    }
}

export default produceReducer;
