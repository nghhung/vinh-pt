import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home, About, Services, Pricing, Gallery, Contact, NotFound } from './pages';
import { siteConfig } from './data';

function AppContent() {
  const location = useLocation();

  // Mark current nav item as active based on location
  const navItemsWithActive = siteConfig.navItems.map((item) => ({
    ...item,
    isActive: location.pathname === item.href,
  }));

  const headerProps = {
    logo: siteConfig.logo,
    logoText: siteConfig.siteName,
    navItems: navItemsWithActive,
  };

  const footerProps = {
    logo: siteConfig.logo,
    logoText: siteConfig.siteName,
    description: siteConfig.tagline,
    quickLinks: siteConfig.navItems,
    contactInfo: siteConfig.contact,
    socialLinks: siteConfig.socialLinks,
  };

  return (
    <Layout headerProps={headerProps} footerProps={footerProps}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
