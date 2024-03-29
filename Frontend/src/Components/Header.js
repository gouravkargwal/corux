import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "../Assets/CSS/Header.css"
import logo from "../Assets/Images/logo.png"
import { Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export default function Header() {

    // const [mobileOpen, setMobileOpen] = React.useState(false);

    // const handleDrawerToggle = () => {
    //     setMobileOpen((prevState) => !prevState);
    // };

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box className='drawer'
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Toolbar className='jst_e'>
                <IconButton>
                    <CloseIcon className='gray' />
                </IconButton>
            </Toolbar>
            <Box className='header_menu_mobile cap'>

                <Link to="/#home" onClick={() => scrollToElement('home')}>
                    <Button disableRipple className='col1 header_btn'>Home</Button>
                </Link>

                <Link to="/#about" onClick={() => scrollToElement('about')}>
                    <Button disableRipple className='col1 header_btn'>About</Button>
                </Link>

                <Link to="/#how-reta-works" onClick={() => scrollToElement('how-reta-works')}>
                    <Button disableRipple className='col1 header_btn'>How Reta Works</Button>
                </Link>

                <Link to="/#team" onClick={() => scrollToElement('team')}>
                    <Button disableRipple className='col1 header_btn'>Team</Button>
                </Link>

                <Link to="/#contact" onClick={() => scrollToElement('contact')}>
                    <Button disableRipple className='col1 header_btn'>Contact</Button>
                </Link>

            </Box>
        </Box>
    );


    // const scrollToElement = (id) => {
    //     const element = document.getElementById(id);
    //     if (element) {
    //         const stickyItemsHeight = 40;
    //         const offset = element.getBoundingClientRect().top - stickyItemsHeight;


    //         setTimeout(() => {
    //             window.scrollBy({ top: offset, behavior: 'smooth' });
    //         }, 50);
    //     }
    // };

    const scrollToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const stickyItemsHeight = 40;
            const offset = element.getBoundingClientRect().top - stickyItemsHeight;


            setTimeout(() => {
                window.scrollBy({ top: offset, behavior: 'smooth' });
            }, 50);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" >
                <Toolbar id='header'>
                    <Link to='/' onClick={() => { window.location.href = "/" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            {/* <img src={logo} className='logo' alt='Logo' /> */}
                        </Box>
                    </Link>
                    <Box className='header_menu'>
                        <Link to="/#home" onClick={() => scrollToElement('home')}>
                            <Button disableRipple className='col1 header_btn'>Home</Button>
                        </Link>

                        <Link to="/#about" onClick={() => scrollToElement('about')}>
                            <Button disableRipple className='col1 header_btn'>About</Button>
                        </Link>

                        <Link to="/#how-reta-works" onClick={() => scrollToElement('how-reta-works')}>
                            <Button disableRipple className='col1 header_btn'>How Reta Works</Button>
                        </Link>

                        <Link to="/#team" onClick={() => scrollToElement('team')}>
                            <Button disableRipple className='col1 header_btn'>Team</Button>
                        </Link>

                        <Link to="/#contact" onClick={() => scrollToElement('contact')}>
                            <Button disableRipple className='col1 header_btn'>Contact</Button>
                        </Link>

                        <IconButton disableRipple className='col1'>
                            <Typography className='col1 cap avatar_name'><span className='gray'>Welcome...</span>
                                <Link to='/profile_setting'>Diane Webb</Link>
                            </Typography>
                        </IconButton>

                        <Link to='/#home' onClick={() => scrollToElement('home')}>
                            <IconButton className='col1 logout' >
                                <LogoutIcon />
                            </IconButton>
                        </Link>


                        {['right'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <IconButton onClick={toggleDrawer(anchor, true)} className='mobile_drawer' disableRipple>
                                    <MenuIcon className='col1' />
                                </IconButton>
                                <Drawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                >
                                    {list(anchor)}
                                </Drawer>
                            </React.Fragment>
                        ))}
                    </Box>

                </Toolbar>
            </AppBar>

        </Box>
    );
}