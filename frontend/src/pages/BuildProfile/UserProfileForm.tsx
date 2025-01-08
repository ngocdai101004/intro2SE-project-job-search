// UserProfileForm.tsx
import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import PersonalInfo from './InfoCards/PersonalInfo';
import ContactInfo from './InfoCards/ContactInfo';
import AddressInfo from './InfoCards/AddressInfo';
import AvatarUpload from './InfoCards/AvatarUpload';
import { IAddress, IUser} from '../../interfaces/user';
import axios from "axios";
import axiosInstance from "../../common/axiosInstance";
import {toast} from "react-toastify";
import {MyToastContainer} from "../../components/MyToastContainer.tsx";
import MyHeader from "../../components/MyHeader.tsx";
import { useNavigate } from 'react-router-dom';

type FormStep = 'personal' | 'contact' | 'address' | 'avatar';

interface Props {
    isFirstTime?: boolean;
}
const UserProfileForm: React.FC<Props> = ({isFirstTime}) => {
    const isFirstTimeUser = isFirstTime || false;
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<FormStep>('personal');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<IAddress>({
        district: '',
        city_state: '',
        zip_code: '',
        country: ''
    });
    const [avatar, setAvatar] = useState<string>('');
    const [shortBio, setShortBio] = useState<string>('');    
    const [gender, setGender] = useState<'male'| "female">('male');
    const [date_of_birth, setDateOfBirth] = useState<Date>(new Date());
    const [formData, setFormData] = useState<IUser>({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        address: address,
        avatar: avatar,
        short_bio: shortBio,
        gender: gender,
        date_of_birth: date_of_birth
    });

    useEffect(() => {
        setFormData({
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            address: address,
            avatar: avatar,
            short_bio: shortBio
        });
    }, [firstName, lastName, phone, address, avatar, shortBio]);


    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/user/profile');
                const userData = response.data.data.user;
                console.log("User data", userData);
                setFirstName(userData.first_name || '');
                setLastName(userData.last_name || '');
                setPhone(userData.phone || '');
                setAddress(userData.address || {
                    district: '',
                    city_state: '',
                    zip_code: '',
                    country: ''
                });
                setAvatar(userData.avatar || '');
                setShortBio(userData.short_bio || '');
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response) {
                    console.log(error.response.data?.message || 'An error occurred.');
                } else {
                    console.log('An error occurred:', error);
                }
            }
        }
        fetchUserData();
    }
    , []);

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("Formatdata", formData);
        e.preventDefault();
        const toastId = toast.loading('Updating...');
        try {
            
            const response = await axiosInstance.patch('/user/profile', formData);
            if (isFirstTimeUser===true) {
                console.log(response.data);
                toast.update(toastId, {
                    render: 'Profile updated successfully',
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000,
                    onClose: () => navigate('/user/build-job-search-cv')
                });
            }
            else {
                console.log(response.data);
                toast.update(toastId, {
                    render: 'Profile created successfully',
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.update(toastId, {
                    render: error.response.data?.message || 'An error occurred.',
                    type: 'error',
                    isLoading: false, 
                    autoClose: 2000,
                });
            } else {
                toast.update(toastId, {
                    render: 'Update failed. Please try again.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                });
                console.log('Update failed:', error);
            }
            
        }
    };


    const nextStep = () => {
        switch (currentStep) {
            case 'personal':
                setCurrentStep('contact');
                break;
            case 'contact':
                setCurrentStep('address');
                break;
            case 'address':
                setCurrentStep('avatar');
                break;
        }
    };

    const previousStep = () => {
        switch (currentStep) {
            case 'contact':
                setCurrentStep('personal');
                break;
            case 'address':
                setCurrentStep('contact');
                break;
            case 'avatar':
                setCurrentStep('address');
                break;
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 'personal':
                return (
                    <PersonalInfo
                        firstName={formData.first_name}
                        lastName={formData.last_name}
                        gender={formData.gender}
                        dateOfBirth={formData.date_of_birth}
                        shortBio={formData.short_bio}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setGender={setGender}
                        setDateOfBirth={setDateOfBirth}
                        setShortBio={setShortBio}
                    />
                );
            case 'contact':
                return (
                    <ContactInfo
                        phone={formData.phone}
                        setPhone={setPhone}
                    />
                );
            case 'address':
                return (
                    <AddressInfo
                        address={formData.address}
                        setAddress={setAddress}
                    />
                );
            case 'avatar':
                return (
                    <AvatarUpload
                        avatar={formData.avatar}
                        setAvatar={setAvatar}
                    />
                );
        }
    };

    const renderProgressBar = () => {
        const steps = ['personal', 'contact', 'address', 'avatar'];
        const currentIndex = steps.indexOf(currentStep);
        const progress = ((currentIndex + 1) / steps.length) * 100;

        return (
            <div className="mb-4">
                <div className="progress">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <span className={currentStep === 'personal' ? 'fw-bold' : ''}>Personal</span>
                    <span className={currentStep === 'contact' ? 'fw-bold' : ''}>Contact</span>
                    <span className={currentStep === 'address' ? 'fw-bold' : ''}>Address</span>
                    <span className={currentStep === 'avatar' ? 'fw-bold' : ''}>Avatar</span>
                </div>
            </div>
        );
    };

    return (
        <div>
          <div className="d-flex flex-column min-vh-80">
            <MyHeader mydefaultActiveKey="/home" className="fixed-top" />
            <Container className="center" style={{ paddingTop: '10px', width: '70%', height: '70%' }}>
                <h2 className="text-center mb-4">Your Profile</h2>
                {renderProgressBar()}
                <Form>
                    <div className="min-vh-50">
                        {renderStepContent()}
                    </div>
                    
                    <div className="d-flex justify-content-between mt-4 fixed-bottom-buttons" style={{ marginBottom: '10%' }}>
                        {currentStep !== 'personal' && (
                            <Button 
                                variant="secondary" 
                                onClick={previousStep}
                            >
                                Previous
                            </Button>
                        )}
                        {currentStep !== 'avatar' ? (
                            <Button 
                                variant="primary" 
                                onClick={nextStep}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button 
                                variant="success" 
                                type="button"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        )}
                    </div>
                </Form>
                <MyToastContainer />
            </Container>
        </div>
    </div>
    );
};

export default UserProfileForm;