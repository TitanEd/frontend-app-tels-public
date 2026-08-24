import { PageWrap } from '@edx/frontend-platform/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ComingSoonPage } from '../coming-soon';
import HomePage from '../pages/home/HomePage';
import AboutPage from '../pages/about/AboutPage';
import ContactPage from '../pages/contact/ContactPage';
import CoursesPage from '../pages/courses/CoursesPage';
import CourseDetailPage from '../pages/courses/CourseDetailPage';
import PrivacyPage from '../pages/legal/PrivacyPage';
import TermsPage from '../pages/legal/TermsPage';
import './AppRoutes.scss';
/**
 * Public site routes. Page bodies only — the shared TelsHeader / IndigoFooter
 * chrome mounts once around <AppRoutes /> in index.jsx via HeaderSlot/FooterSlot,
 * per docs/branding/header-footer-rules.md rule #10 ("Public MFE — page body only").
 */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PageWrap><HomePage /></PageWrap>} />
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="/courses" element={<PageWrap><CoursesPage /></PageWrap>} />
    <Route path="/courses/:courseId" element={<PageWrap><CourseDetailPage /></PageWrap>} />
    <Route path="/about" element={<PageWrap><AboutPage /></PageWrap>} />
    <Route path="/contact" element={<PageWrap><ContactPage /></PageWrap>} />
    <Route path="/privacy" element={<PageWrap><PrivacyPage /></PageWrap>} />
    <Route path="/terms" element={<PageWrap><TermsPage /></PageWrap>} />
    <Route path="*" element={<PageWrap><ComingSoonPage /></PageWrap>} />
  </Routes>
);
export default AppRoutes;
