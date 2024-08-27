import Bulbasaur from "./images/bulbasaur.jpg"
import './Showcase.css' // part of the exercise requiring moving inline css into a dedicated css file

function Showcase() {
    let favPokemon = 'Bulbasaur';
    let pokeCharacteristics = {
        type: 'Grass',
        move: 'Vine Whip'
    };

    return (
        <div className="showcase-container">
            <h1>{favPokemon}'s Showcase Component</h1>
            <img
                style={{
                    height:"400px",
                    width:"400px",
                    borderRadius:"50%",
                    marginTop:"1em",
                    marginBottom:"1em"
                }}
                src={Bulbasaur}
                alt={favPokemon}
            />
            <h2>
                {favPokemon}'s type is {" "}
                {/* <span style={{backgroundColor:"green",color:"#ffffff"}}>{pokeCharacteristics.type}</span> */}
                <span className="type">{pokeCharacteristics.type}</span>
                {" "} and one of their moves is {" "}
                {/* <span style={{backgroundColor:"white", color:"green"}}>{pokeCharacteristics.move}</span> */}
                <span className="moves">{pokeCharacteristics.move}</span>
            </h2>
        </div>
    );
}

export default Showcase;
