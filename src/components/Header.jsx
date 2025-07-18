import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiSearch, FiUser, FiShoppingCart, FiMoon, FiSun,
  FiHeart, FiMenu, FiX
} from 'react-icons/fi';

import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useUI } from '../context/UIContext.jsx';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const { favorites } = useFavorites();
  const { openModal } = useUI();

  const cartCount = items.reduce((s,i)=>s+i.qty,0);
  const favCount = favorites.length;

  /* ---- Search sync ---- */
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(()=>{
    return new URLSearchParams(location.search).get('search') || '';
  });

  useEffect(()=>{
    const p = new URLSearchParams(location.search).get('search') || '';
    setQuery(p);
  }, [location.search]);

  useEffect(()=>{
    const t = setTimeout(()=>{
      const current = new URLSearchParams(location.search).get('search') || '';
      if (current === query) return;
      const params = new URLSearchParams(location.search);
      if (query) params.set('search', query); else params.delete('search');
      const path = location.pathname.startsWith('/products') ? location.pathname : '/products';
      navigate(params.toString() ? `${path}?${params}` : path, { replace:true });
    }, 300);
    return ()=>clearTimeout(t);
  }, [query, location.pathname, location.search, navigate]);

  const submitSearch = e => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (query) params.set('search', query); else params.delete('search');
    const path = location.pathname.startsWith('/products') ? location.pathname : '/products';
    navigate(params.toString() ? `${path}?${params}` : path);
  };

  /* ---- Mobile menu ---- */
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMenu = () => setMobileOpen(o=>!o);

  // Close on route change
  useEffect(()=>{ if(mobileOpen) setMobileOpen(false); }, [location.pathname]);

  // ESC to close
  useEffect(()=>{
    const handler = e => { if(e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', handler);
    return ()=>window.removeEventListener('keydown', handler);
  }, []);

  // Prevent body scroll when panel open
  useEffect(()=>{
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const navClass = ({isActive}) => 'nav-link' + (isActive ? ' active':'');
  const ariaLabelTheme = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className="header">
      <div className="header__content">

        {/* Left: Logo only */}
        <div className="header__left">
          <Link to="/" className="header__logo" aria-label="ModernStore home">
            <span role="img" aria-hidden="true">🛍️</span>
            <span>ModernStore</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="header__nav desktop-nav" aria-label="Primary navigation">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/products" className={navClass}>Products</NavLink>
          <NavLink to="/categories" className={navClass}>Categories</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
        </nav>

        {/* Desktop Search */}
        <form className="search-bar desktop-search" role="search" onSubmit={submitSearch}>
          <FiSearch aria-hidden="true" />
          <input
            placeholder="Search products..."
            aria-label="Search products"
            value={query}
            onChange={e=>setQuery(e.target.value)}
          />
        </form>

        {/* Right cluster: actions + hamburger at FAR RIGHT */}
        <div className="header__actions">

          {/* DESKTOP ACTIONS */}
          <div className="desktop-actions">
            <button
              type="button"
              className="icon-btn"
              aria-label={ariaLabelTheme}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <FiSun/> : <FiMoon/>}
            </button>

            <button
              type="button"
              className="icon-btn"
              aria-label="Open wishlist"
              onClick={()=>openModal('wishlist')}
            >
              <FiHeart/>
              {favCount > 0 && <span className="badge">{favCount}</span>}
            </button>

            {user ? (
              <button
                type="button"
                className="icon-btn"
                aria-label="Sign out"
                onClick={signOut}
              >
                <FiUser/><span className="hide-sm">Sign Out</span>
              </button>
            ) : (
              <button
                type="button"
                className="icon-btn"
                aria-label="Sign in"
                onClick={()=>openModal('auth')}
              >
                <FiUser/><span className="hide-sm">Sign In</span>
              </button>
            )}

            <button
              type="button"
              className="icon-btn cart-icon-btn"
              aria-label="Open cart"
              onClick={()=>openModal('cart')}
            >
              <FiShoppingCart/>
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>

          {/* (Optional) ALWAYS-VISIBLE cart on mobile:
              If you *don't* want cart visible outside the menu on mobile,
              add 'mobile-hide' class below OR remove this duplicate button.
              For now we keep only the desktop cart above, so no duplication here.
              If you want a persistent cart separate from desktop wrapper:
              - Move the cart button out of .desktop-actions (above)
              - Uncomment below and remove it above.
          */}

          {/* Hamburger (rightmost) */}
          <button
            className="icon-btn hamburger-btn"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            {mobileOpen ? <FiX/> : <FiMenu/>}
          </button>
        </div>

        {/* Mobile Slide Panel */}
        <div
          id="mobile-menu"
          className={`mobile-panel ${mobileOpen ? 'open' : ''}`}
          aria-hidden={!mobileOpen}
        >
          <form className="search-bar mobile-search" role="search" onSubmit={submitSearch}>
            <FiSearch aria-hidden="true" />
            <input
              placeholder="Search products..."
              aria-label="Search products"
              value={query}
              onChange={e=>setQuery(e.target.value)}
            />
          </form>

          <nav className="mobile-nav" aria-label="Mobile navigation">
            <NavLink to="/" end className={navClass}>Home</NavLink>
            <NavLink to="/products" className={navClass}>Products</NavLink>
            <NavLink to="/categories" className={navClass}>Categories</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
          </nav>

          <div className="mobile-actions">
            <button
              type="button"
              className="icon-btn"
              aria-label={ariaLabelTheme}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <FiSun/> : <FiMoon/>}
            </button>

            <button
              type="button"
              className="icon-btn"
              aria-label="Open wishlist"
              onClick={()=>{ openModal('wishlist'); setMobileOpen(false); }}
            >
              <FiHeart/>{favCount>0 && <span className="badge">{favCount}</span>}
            </button>

            {user ? (
              <button
                type="button"
                className="icon-btn"
                aria-label="Sign out"
                onClick={()=>{ signOut(); setMobileOpen(false); }}
              >
                <FiUser/><span>Sign Out</span>
              </button>
            ) : (
              <button
                type="button"
                className="icon-btn"
                aria-label="Sign in"
                onClick={()=>{ openModal('auth'); setMobileOpen(false); }}
              >
                <FiUser/><span>Sign In</span>
              </button>
            )}

            <button
              type="button"
              className="icon-btn cart-icon-btn"
              aria-label="Open cart"
              onClick={()=>{ openModal('cart'); setMobileOpen(false); }}
            >
              <FiShoppingCart/>{cartCount>0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {mobileOpen && <div className="mobile-backdrop" onClick={()=>setMobileOpen(false)} />}
      </div>
    </header>
  );
}
