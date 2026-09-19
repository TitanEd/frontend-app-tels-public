/**
 * Open edX "no course image" placeholder — same asset Template A resolves via
 * `/theming/asset/images/no_course_image.png`, bundled locally so cards never
 * depend on LMS theming URLs or third-party placeholders.
 */
import noCourseImage from '!!file-loader!../assets/courses/no_course_image.webp';

export const getNoCourseImageUrl = () => noCourseImage;

export default noCourseImage;
