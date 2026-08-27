import { PageWrap } from '@edx/frontend-platform/react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ComingSoonPage } from '../coming-soon';
import HomePage from '../pages/home/HomePage';
import CatalogPage from '../pages/courses/CatalogPage';
import SubjectPage from '../pages/courses/SubjectPage';
import SchoolPage from '../pages/courses/SchoolPage';
import CourseDetailPage from '../pages/courses/CourseDetailPage';
import AboutPage from '../pages/about/AboutPage';
import ContactPage from '../pages/contact/ContactPage';
import AccessibilityPage from '../pages/legal/AccessibilityPage';
import PrivacyPage from '../pages/legal/PrivacyPage';
import TermsPage from '../pages/legal/TermsPage';
import EeaPrivacyPage from '../pages/legal/EeaPrivacyPage';

/**
 * Public site routes. Page bodies only — the shared TelsHeader / IndigoFooter
 * chrome mounts once around <AppRoutes /> in index.jsx via HeaderSlot/FooterSlot,
 * per docs/branding/header-footer-rules.md rule #10 ("Public MFE — page body only").
 */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PageWrap><HomePage /></PageWrap>} />
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="/catalog" element={<PageWrap><CatalogPage title="Courses" /></PageWrap>} />
    <Route path="/courses" element={<Navigate to="/catalog" replace />} />
    <Route path="/subject/:slug" element={<PageWrap><SubjectPage /></PageWrap>} />
    <Route path="/school/:slug" element={<PageWrap><SchoolPage /></PageWrap>} />
    <Route path="/course/:slug" element={<PageWrap><CourseDetailPage /></PageWrap>} />
    <Route path="/about" element={<PageWrap><AboutPage /></PageWrap>} />
    <Route path="/contact" element={<PageWrap><ContactPage /></PageWrap>} />
    <Route path="/accessibility" element={<PageWrap><AccessibilityPage /></PageWrap>} />
    <Route path="/privacy" element={<PageWrap><PrivacyPage /></PageWrap>} />
    <Route path="/terms" element={<PageWrap><TermsPage /></PageWrap>} />
    <Route path="/eea-privacy-disclosures" element={<PageWrap><EeaPrivacyPage /></PageWrap>} />
    <Route path="*" element={<PageWrap><ComingSoonPage /></PageWrap>} />
  </Routes>
);

export default AppRoutes;
