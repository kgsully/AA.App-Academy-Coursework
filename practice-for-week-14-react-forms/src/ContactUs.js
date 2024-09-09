import { useState } from 'react';

const ContactUs = () => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');

    const onSubmit = (e) => {
        // Prevent the default form behavior so the page doesn't reload
        e.preventDefault();

        // Create a new object for the contact us information
        const contactUsInformation = {
            name,
            email,
            phone,
            submittedOn: new Date()
        };

        // Ideally this info would be persisted to a database using a RESTful API
        // For now, just log to the console
        console.log(contactUsInformation);

        // Reset the form state
        setName('');
        setEmail('');
        setPhone('');
    }

    return (
        <div>
            <h2>Contact Us</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input
                        id='name'
                        type='text'
                        onChange={(e) => setName(e.target.value)}   // e is the event getting passed, the target is the element the event for, and value is the property of the event changing
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        id='email'
                        type='text'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div>
                    <label htmlFor='phone'>Phone:</label>
                    <input
                        id='phone'
                        type='text'
                        onChange={e => setPhone(e.target.value)}
                        value={phone}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ContactUs;
