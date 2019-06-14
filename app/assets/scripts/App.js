import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StyckyHeader from './modules/StyckyHeader';
import Modal from './modules/Modal';

import $ from 'jquery';

// Create  Objects
var mobileMenu = new MobileMenu();
new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");

var stickyHeader = new StyckyHeader();
var modal = new Modal();