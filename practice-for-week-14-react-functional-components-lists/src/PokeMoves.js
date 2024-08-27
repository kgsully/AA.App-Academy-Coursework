import { moves } from './data';
import PokeMoveCard from './PokeMoveCard';

const PokeMoves = () => {

    return (
        <div>
            <h1>PokeMoves</h1>
            <ul>
                {/* When mapping through an array, React expects a unique `key` for each item rendered */}
                {/* If the item you are mapping through has a unique ID, that is usually the best choice for the `key` prop for your returned element */}
                {/* Make sure you use the prop name of `key` for this */}
                {/* NOTE ALSO: ALL THE PROPS IN ITEM ARE PASSED BY A SINGLE ITEM USING THE SPREAD OPERATOR AND THE `item` VARIABLE NAME */}
                {moves.map(item => (
                    <PokeMoveCard key={item.id} {...item}/>
                ))
                }
            </ul>
        </div>
    )
}

export default PokeMoves;
