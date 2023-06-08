import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { LocalLibraryTwoTone } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AUTH_LOGOUT_REDIRECT_URL, BACKEND_URL } from "../../data/constants";
import LoginWithAuth0Button from "../LoginWithAuth0";
import { UserInfoContext } from "../../contexts/UserInfoProvider";
import axios from "axios";

const pages = ["Feed", "Search", "Marketplace"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();

  const userInfoContext = React.useContext(UserInfoContext);

  React.useEffect(() => {
    const checkOrCreateUser = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      console.log(user.nickname);
      console.log(user.email);
      console.log(user.picture);

      try {
        const response = await axios.post(
          `${BACKEND_URL}/users`,
          {
            username: user.nickname,
            email: user.email,
            photoUrl: user.picture,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("user request went through");
        console.log(userInfoContext);

        userInfoContext.setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (isAuthenticated) {
      checkOrCreateUser();
    }
  }, [isAuthenticated]);

  const handleProfileClick = () => {
    navigate(`/user/${userInfoContext?.userInfo.id}`);
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalLibraryTwoTone
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Inter",
                fontWeight: 800,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              best book buddies.
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(`/${page.toLowerCase()}`);
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <LocalLibraryTwoTone
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Inter",
                fontWeight: 800,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              bbb.
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  disableRipple
                  disableTouchRipple
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(`/${page.toLowerCase()}`);
                  }}
                  sx={{ my: 2, mx: 1, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {!isAuthenticated ? (
                <LoginWithAuth0Button />
              ) : (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user.name} src={user.picture} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))} */}
                    <MenuItem onClick={handleProfileClick}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: AUTH_LOGOUT_REDIRECT_URL },
                        })
                      }
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default Navbar;
