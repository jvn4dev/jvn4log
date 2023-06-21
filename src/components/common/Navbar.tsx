import WavingHandIcon from '@mui/icons-material/WavingHand';
import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '@/themes';

export const Navbar = () => {
  return (
    <NavContainer>
      <NavWrapper>
        <MainIconWrapper>
          <Link href="/">
            <WavingIcon />
            <Label>Hi there!</Label>
          </Link>
        </MainIconWrapper>
        <MenuWrapper>
          <Link href="/">
            <Menu>Blog</Menu>
          </Link>
          <Link href="/">
            <Menu>About</Menu>
          </Link>
        </MenuWrapper>
      </NavWrapper>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const NavWrapper = styled.div`
  width: 90%;
  max-width: 1140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 70px;

  @media ${theme.device.tablet} {
    padding-left: 0;
  }
`;

const MainIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const WavingIcon = styled(WavingHandIcon)`
  font-size: 3rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 300;
  color: ${theme.colors.textDark};
  margin-left: 10px;
  cursor: pointer;

  @media ${theme.device.tablet} {
    display: none;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
  padding-right: 70px;
  width: 300px;

  @media ${theme.device.tablet} {
    padding-right: 0;
  }
`;

const Menu = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  color: ${theme.colors.textDark};
`;
