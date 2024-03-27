import './NewDriver.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

const NewDriver = () => {
    const [fullName, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [carType, setCarType] = useState('');
    const [carYear, setCarYear] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const calculateAge = (birthdate) => {
        if (!birthdate) return null;
    
        const today = new Date();
        const birth = new Date(birthdate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
          age--;
        }
    
        return age;
    };

      const handleDateChange = (date) => {
        setBirthDate(date);
        setAge(calculateAge(date));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const driver = {fullName, gender, age, carType, carYear};
        setIsPending(true);
        
        fetch('http://localhost:8000/drivers', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(driver)
        }).then(() => {
            console.log("New driver added!")
            setIsPending(false);
            navigate('/')
        })
    }
    
    return (
        <div className="NewDriver">
            <h2>Add a New Driver</h2>
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Gender:</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value={""}></option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                </select>
                <label>Date of birth:</label>
                <div className="datePickerContainer">
                    <DatePicker
                    selected={birthDate}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    />
                    <p className="ageParagraph">Age: {age}</p>
                </div>
                <label>Car Type:</label>
                <input
                    type="text"
                    required
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                />
                <label>Car Year:</label>
                <input
                    type="text"
                    required
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                />
                {!isPending && <button>Add New Driver</button>}
                {isPending && <button>Adding Driver...</button>}
            </form>
        </div>
    );
}
 
export default NewDriver;