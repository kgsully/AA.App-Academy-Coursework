import { useState } from "react";
import { useDispatch } from "react-redux";
import { postNewTweet } from "./store/tweet";

const CreateTweet = () => {
    const dispatch = useDispatch();
    const [tweetText, setTweetText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tweetText.length === 0) {
            alert("Tweet Can't be Empty!");
        } else {
            dispatch(postNewTweet(tweetText));
        }
    }

    return (
        <div>
            <hr />
            <h1>Post Your Tweet</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-tweet">Message: </label>
                <input
                    type="text"
                    id="input-tweet"
                    name="input-tweet"
                    placeholder="Type a new Tweet..."
                    onChange={(e) => setTweetText(e.target.value)}
                />
                <button>Tweet It!</button>
            </form>
        </div>
    );
}

export default CreateTweet;
