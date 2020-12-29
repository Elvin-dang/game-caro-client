import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { Paper, Button, Avatar, Box, CssBaseline, Grid, Typography, Container, TextField } from '@material-ui/core';
import userApi from '../api/userApi';
import AvatarEdit from 'react-avatar-edit';
import InfomationBox from './InfomationBox';
import swal from 'sweetalert';
const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		padding: theme.spacing(1),
	},
	infomation: {
		display: 'flex',
		padding: theme.spacing(2),
	},
	marginTop: {
		marginTop: '20px',
	  },
}));
export default function Profile() { 
	const classes = useStyles(); 
	const [user, setUser] = useState({ name: "", password: ""});
	const [curUser, setCurUser] = useState(JSON.parse(localStorage.getItem('curUser')));
	const [imageSource, setImageSource] = useState(null);
	const [avatar, setAvatar] = useState(null);
    const handleChangeName = async () =>{
    	if(user.name!=="")
    	{
    		const response = await userApi.updateUser({ email: curUser.email, name: user.name });
	    	await setCurUser({ ...curUser, name: user.name});
	    	localStorage.setItem('curUser', JSON.stringify(curUser));
    	}
    }
    const handleChangePassword = async () =>{
    	if(user.password!==""){
    		const response = await userApi.updateUser({ email: curUser.email, password: user.password });
    	}
    }
    const handleUploadAvatar = async ()=>{
    	await setCurUser({ ...curUser, avatar: avatar});
    	await localStorage.setItem('curUser', JSON.stringify(curUser));
		const response = await userApi.updateUser({ email: curUser.email, avatar: avatar });
    	setAvatar(null);
    	setImageSource(null);
    }
    const onClose = () => {
		setAvatar(null);
	}

	const onCrop = (event) => {
		setAvatar(event);
	}

	const onBeforeFileLoad = (elem) => {
		if(elem.target.files[0].size > 71680){
			swal("Lỗi", "Kích thước ảnh lớn!", "error");
			elem.target.value = "";
		};
	}

	return (<div>{ !curUser && (<Redirect to='/signin' />) }
		<CssBaseline />
    	<main>
        {/* Hero unit */}
	        <div>
	          <Container maxWidth="sm">
	            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
	              Profile
	            </Typography>
	          </Container>
	        </div>
	        <div>
	        	<Container >
	        		<Grid container spacing={1} >
	        			<Grid item xs={3} >
							<InfomationBox user={curUser}/>
	        			</Grid>
	        			<Grid item xs={9}>
	        				<Box bgcolor="#e0e0e0" height={750}>
	        					<Box display="flex" justifyContent="left" p={3} >
									<Typography component="h5" variant="h5" align="left" color="textPrimary" gutterBottom>
										Edit your profile
									</Typography>
								</Box>
	        					<Box display="flex" justifyContent="left" px={5} >
	        						<Grid  container spacing={3} >
										<Grid item xs={12}>
											<Grid  container spacing={3} >
												<Grid item xs={8}>
													<TextField variant="outlined" margin="normal" required fullWidth id="name" label="New name" name="name" 
														onChange={e => setUser({ ...user, name: e.target.value})} />
												</Grid>
												<Grid item xs={4}>
													<Button className={classes.marginTop}  onClick={handleChangeName} fullWidth variant="contained" color="primary" >Change name</Button>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<Grid  container spacing={3} >
												<Grid item xs={8}>
													<TextField variant="outlined" margin="normal" required fullWidth name="password" label="New password" type="password" id="password"
														onChange={e => setUser({ ...user, password: e.target.value})} />
												</Grid>
												<Grid item xs={4}>
													<Button className={classes.marginTop} onCLick={handleChangePassword} fullWidth variant="contained" color="primary" >Change Password</Button>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={6}>
											<AvatarEdit
											width={390}
											height={295}
											onCrop={onCrop}
											onClose={onClose}
											onBeforeFileLoad={onBeforeFileLoad}
											src={imageSource}
											/>
										</Grid>
										<Grid item xs={6}>	
											<img src={avatar} alt="Preview" />
										</Grid>
										<form method="form" onSubmit={handleUploadAvatar}>
											<Box display="flex" justifyContent="left" m={1} p={1} >
												<Button type="submit" fullWidth variant="contained" color="primary" >Apply</Button>
											</Box>
										</form>
									</Grid>
								</Box>
	        				</Box>
	        			</Grid>
	        		</Grid>
	        	</Container>
	        </div>
        </main>
	</div>);
}