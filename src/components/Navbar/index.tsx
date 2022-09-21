import React from 'react';
import Link from 'next/link';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Menu,
  IconButton,
  Stack,
  MenuItem,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const pages = [
  {
    page: 'HOME',
    href: '/',
    id: '1',
  },
  {
    page: 'STORE',
    href: '/store',
    id: '2',
  },
  {
    page: 'BLOG',
    href: '/blog',
    id: '3',
  },
];

const ResponsiveAppBar = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SHOPPING CART
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page['id']} onClick={handleCloseNavMenu}>
                  <Link key={page['id']} href={page['href']}>
                    {page['page']}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SHOPPING CART
          </Typography>
          <Stack direction='row' spacing={2}></Stack>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page['id']} href={page['href']}>
                {page['page']}
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {cartQuantity > 0 && (
              <Button
                onClick={openCart}
                variant='outlined'
                style={{
                  position: 'relative',
                  height: '2.5rem',
                  color: '#fff',
                  border: '1px solid #fff',
                }}
              >
                <span
                  className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
                  style={{
                    position: 'absolute',
                    color: '#fff',
                    width: '1.3rem',
                    height: '1.3rem',
                    bottom: '-.5rem',
                    right: '-0.5rem',
                  }}
                >
                  {cartQuantity}
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 576 512'
                  fill='currentColor'
                  width={22}
                >
                  <path d='M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z' />
                </svg>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
