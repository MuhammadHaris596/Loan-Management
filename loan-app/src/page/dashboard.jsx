import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';  
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import DescriptionIcon from '@mui/icons-material/Description';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router';
import { Outlet } from 'react-router';
import { useNavigate } from "react-router-dom"
import { supabase } from '../utils/config';
import { Session } from '../utils/retreiveSession';
const drawerWidth = 220;
const collapsedWidth = 80; 

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  width: collapsedWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));










export function Dashboard() {

   const pageNavigate = useNavigate()




     
  async function logout() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    
        setTimeout(()=>{
          pageNavigate('/login')
      },500)
      } catch (error) {
        console.log(error);
      }
    }
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const menu = [
    { text: 'Dashboard', icon: <DashboardIcon/> , path:"/dashboard " },
    { text: 'My Loan Request', icon: <DescriptionIcon/> ,path: "/dashboard/LoanView" },
    { text: 'New Loan', icon: <AddCircleOutlineIcon />,path:"/dashboard/LoanApplication" },
    { text: 'Profile', icon: <PermIdentitySharpIcon />,path:"/dashboard/profile" },
  ];

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color='success'>
        <Toolbar>
          <IconButton onClick={() => setOpen(!open)} edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography className='w-100 text-center' variant="h6" noWrap component="div">
            DASHBOARD
          </Typography>
         <Button onClick={logout} className='me-5' variant="contained">Logout</Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to={item.path} 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

    {/* Content Container start */}

    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Toolbar /> */}
        <Outlet /> 
      </Box>
     
     

    </Box>
    <Session/>
    </>
  );
}
