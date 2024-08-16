import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { login, setauthentificate, setEmailError, setIncorrectFullname, setRemplirChamp } from '../../Redux/features/user';
import InputComponent from './Input'; // Assurez-vous que le chemin vers InputComponent est correct
import type { AppDispatch, RootState } from '../../Redux/Store';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import Input from '@mui/material/Input';
import { styled } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import avatar1 from '../../assets/avatar/avatar1.jpg';
import avatar2 from '../../assets/avatar/avatar2.jpg';
import avatar3 from '../../assets/avatar/avatar3.jpg';
import avatar4 from '../../assets/avatar/avatar4.jpg';
import avatar5 from '../../assets/avatar/avatar5.jpg';
import avatar6 from '../../assets/avatar/avatar6.jpg';

function AuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const emailError = useSelector((state: RootState) => state.user.emailError);
  const incorrectFullname = useSelector((state: RootState) => state.user.incorrectFullname);
  const remplirChamp = useSelector((state: RootState) => state.user.remplirChamp);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const suggestedAvatars = [avatar1, avatar2, avatar6, avatar3, avatar5, avatar4];
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState('');

  const StyledInput = styled(Input)({
    display: 'none', // Par exemple, pour masquer le bouton de fichier par défaut
  });

  const CustomFileInput = styled('label')({
    display: 'inline-block',
    color: '#2D8CFF',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '400'
  });

  const [postImage, setPostImage] = useState({ myFile: "", email: "", fullname: "" });

  const createPost = async (newImage: any) => {
    try {
      const response= await axios.post('http://localhost:5000/api/users/authent/authenticate', newImage);
      const data = await response.data;

      if (data.message === 'Incorrect Full name !') {
        dispatch(setIncorrectFullname(true));
      }

      if (response.status === 200) {
        console.log('200');
        dispatch(login({ id: data.user, fullname: fullname, email: email }));
        dispatch(setauthentificate(true));
        navigate('/ConfirmationCode');
       
      } else {
        console.error("Erreur d'authentification");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileUpload = async (file: File , email : string , fullName:string) => {
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage({ ...postImage, myFile: base64 , email:email , fullname:fullName });
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setAvatar(file);
      setFilename(file.name);
      setSelectedAvatar(null); // Clear selected avatar when uploading a new image
    }
  };

  const handleAvatarSelection = (avatarUrl: string) => {
    console.log(avatarUrl);
    setSelectedAvatar(avatarUrl);
    setAvatar(null); // Clear uploaded avatar when selecting a suggested one
    setOpen(false);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(setEmailError('Email should be example@gmail.com'));
    } else {
      dispatch(setEmailError(''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (fullname && email) {

      try {

        if(file) {
          console.log('file');
          handleFileUpload(file ,email , fullname );
        }
        if(selectedAvatar){
          console.log('selected avatar');
          setPostImage({ ...postImage, myFile: selectedAvatar , email:email , fullname });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(setRemplirChamp('All fields must be filled!'));
    }
  };

  useEffect(()=>{
    createPost(postImage) ;

  } , [postImage])

  const avatarSrc = avatar ? URL.createObjectURL(avatar) : selectedAvatar || '/broken-image.jpg';

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <div className='submitdatacontainer'>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: '10px' }}>
            <Avatar src={avatarSrc} sx={{ width: 60, height: 60 }} />
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '16px' }}>
              <CustomFileInput>
                Select File
                <StyledInput type="file" onChange={handleUpload} />
              </CustomFileInput>
              {open ? <ExpandLess onClick={handleClick} style={{ cursor: 'pointer' }} /> : <ExpandMore onClick={handleClick} style={{ cursor: 'pointer' }} />}
            </Grid>
            <Grid container>
              {open && <Grid container spacing={2} style={{ marginTop: '5px', zIndex: '999', position: 'absolute', backgroundColor: '#17202E', paddingBottom: '16px', border: '2px solid  #26303f', width: '90%' }}>
                {suggestedAvatars.map((avatarUrl, index) => (
                  <Grid item xs={4} key={index} onClick={() => handleAvatarSelection(avatarUrl)}>
                    <Avatar src={avatarUrl} sx={{ width: 60, height: 60, cursor: 'pointer' }} />
                  </Grid>
                ))}
              </Grid>}
            </Grid>
          </div>
          <InputComponent
            title='Full name'
            inputtype='text'
            value={fullname}
            changevalue={(e: React.ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)}
          />
          <InputComponent
            title='Email'
            inputtype='email'
            value={email}
            changevalue={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          />
        </div>
        <div className='incorrectfullnamecontainer'>
          {emailError && <p className='error'>{emailError}</p>}
          {incorrectFullname && <p className='error'>Incorrect Full name!</p>}
          {remplirChamp && <p className='error'>{remplirChamp}</p>}
        </div>
        <div className='submitcontainer submitcontainerAuth'>
          <button type='submit' className='submitbutton'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

function convertToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export default AuthForm;
