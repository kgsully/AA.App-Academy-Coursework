import { useEffect, useState } from 'react';
import './styles/UserRegistration.css'

const UserRegistration = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [staff, setStaff] = useState('Student');
    const [bio, setBio] = useState('');
    const [signup, setSignup] = useState(true);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const onSubmit = (e) => {
        // Prevent Default Action on submit
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.values(validationErrors).length > 0) {
            return alert(`Cannot be submitted due to errors - Please check the form for details`)
        }

        if(phone === '') {
            setPhoneType('');
        }

        const newUser = {
            name,
            email,
            phone,
            phoneType: phone.length > 0 ? phoneType : '',
            staff,
            bio,
            signup,
            submittedOn: new Date()
        }

        console.log(newUser);

        setName('');
        setEmail('');
        setPhone('');
        setStaff('');
        setBio('');
        setSignup(true);
        setValidationErrors({});
        setHasSubmitted(false);
    };

    useEffect(() => {
        const errors = {
            name: [],
            email: [],
            phone: [],
            phoneType: [],
            bio: [],
        };

        if(name.length <= 0) errors.name.push('Please enter your name');
        // Basic regex that will check for @ and . with something after it - actual email validation needs to be via sending an email and the user receiving then validating it
        if(!(email.match(/^\S+@\S+\.\S+$/))) errors.email.push('Please enter a valid email address');
        // VERY basic regex to check the phone #
        if(phone.length > 0 && !(phone.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g))) errors.phone.push('Please enter a valid phone number');
        if(phone.length > 0 && phoneType === '') errors.phoneType.push('Please select a phone type');
        if(bio.length > 280) errors.bio.push('Bio has a 280 character limit');

        setValidationErrors(errors);
    }, [name, email, phone, phoneType, bio]);

    return (
        <div className='form-wrapper'>
            <h1>New User Registration</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='name' type='text'>Name: </label>
                    <input
                        id='name'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <span className='error'>
                        {hasSubmitted && validationErrors.name.length > 0 && `${validationErrors.name}`}
                    </span>
                </div>
                <div>
                    <label htmlFor='email' type='text'>Email: </label>
                    <input
                        id='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <span className='error'>
                        {hasSubmitted && validationErrors.email.length > 0 && `${validationErrors.email}`}
                    </span>
                </div>
                <div>
                    <label htmlFor='phone' type='text'>Phone: </label>
                    <input
                        id='phone'
                        onChange={e => setPhone(e.target.value)}
                        placeholder={'555-555-5555'}
                        value={phone}
                    />
                    <select
                        id='phonetype'
                        onChange={e => setPhoneType(e.target.value)}
                        value={phoneType}
                        disabled={phone.length === 0}
                    >
                        <option value='' disabled>Select a phone type...</option>
                        <option value='Home'>Home</option>
                        <option value='Work'>Work</option>
                        <option value='Mobile'>Mobile</option>
                    </select>
                    <span className='error'>
                        {hasSubmitted && validationErrors.phone.length > 0 && `${validationErrors.phone}`}
                    </span>
                    <span className='error'>
                        {hasSubmitted && validationErrors.phoneType.length > 0 && validationErrors.phone.length > 0 ? ` / ${validationErrors.phoneType}` : `${validationErrors.phoneType}`}
                    </span>
                </div>
                <div>
                    Staff:
                    <input
                        type='radio'
                        id='instructor'
                        name='staff'
                        value='Instructor'
                        onChange={e => setStaff('Instructor')}
                        checked={staff === 'Instructor'}
                    />
                        <label htmlFor='instructor'>Instructor</label>
                    <input
                        type='radio'
                        id='student'
                        name='staff'
                        value='Student'
                        onChange={e => setStaff('Student')}
                        checked={staff === 'Student'}
                    />
                        <label htmlFor='student'>Student</label>
                </div>
                <div>
                    <label htmlFor='bio'>Bio: </label>
                    <textarea
                        id='bio'
                        name='bio'
                        onChange={e => setBio(e.target.value)}
                        value={bio}
                    />
                    <span className='error'>
                        {hasSubmitted && validationErrors.bio.length > 0 && `${validationErrors.bio}`}
                    </span>
                </div>
                <div>
                    <input
                        type='checkbox'
                        id='email-signup'
                        name='email-signup'
                        onChange={e => setSignup(prevState => !prevState)}
                        checked={signup}
                    />
                    <label htmlFor='email-signup'>Sign up for email notifications</label>
                </div>
                <button>Submit</button>
            </form>

        </div>

    )
};

export default UserRegistration;
