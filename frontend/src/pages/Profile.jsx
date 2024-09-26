import React, { useState } from 'react';
import Button from '../components/Button';
import InputBox from '../components/InputBox';

const Profile = () => {
    const [fullName, setFullName] = useState('John Vikas Doe');
    const [username, setUsername] = useState('JohnDoe');
    const [department, setDepartment] = useState('CSE');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        e.preventDefault();
        // Add logic to handle password change here
        console.log('Password changed');
    };

    return (
        <div className="main-container profile">
            <h1>Profile</h1>
            <img src="images/profile.png" alt="Profile" />

            <p>Name: <span id="fullname">{fullName}</span></p>
            <p>Username: <span id="username">{username}</span></p>
            <p>Department: <span id="department">{department}</span></p>
            < Button text="Edit Profile" />

            <hr />

            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
                <label htmlFor="current-password">Current Password:</label>
                <InputBox type="password" placeholder="password" />
                <br />

                <label htmlFor="new-password">New Password:</label>
                <InputBox type="password" placeholder="new password" /><br />
                <label htmlFor="confirm-password">Confirm Password:</label>
                <InputBox type="password" placeholder="confirm password" />
                <br />
                <Button text="Change Password" />
            </form>
        </div>
    );
};

export default Profile;
