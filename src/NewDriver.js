import './NewDriver.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const NewDriver = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [carType, setCarType] = useState('');
    const [carYear, setCarYear] = useState('');

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

    return (
        <div className="NewDriver">
            <h2>Add a New Driver</h2>
            <form>
                <label>Full Name:</label>
                <input
                    type="text"
                    required
                    value={name}
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
                <button>Add New Driver</button>
            </form>
        </div>
    );
}
 
export default NewDriver;