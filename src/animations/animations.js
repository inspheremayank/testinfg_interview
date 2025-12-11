// animations/animations.js - GSAP-ready skeleton
// Exports init functions and respects prefers-reduced-motion
import { gsap } from 'gsap';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initSplash(selector = '.splash') {
  if (prefersReduced) return { kill: ()=>{} };
  const el = document.querySelector(selector);
  if (!el) return { kill: ()=>{} };
  const tl = gsap.timeline();
  // example: logo pulse + slide up
  tl.fromTo(el, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  return {
    tl,
    kill() { tl.kill(); }
  };
}

export function initHero(selector = '.hero') {
  if (prefersReduced) return { kill: ()=>{} };
  const el = document.querySelector(selector);
  if (!el) return { kill: ()=>{} };
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }});
  // stagger example
  tl.from(selector + ' .title', { y: 18, autoAlpha: 0, duration: 0.6 });
  return { tl, kill(){ tl.kill(); } };
}

// add more init functions: initServices, initTestimonials, initMarquee
