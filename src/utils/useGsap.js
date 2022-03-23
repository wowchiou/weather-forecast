import gsap from 'gsap';

export default function useGsap() {
  const tl = gsap.timeline();

  function setWeekListAnimate() {
    tl.from('.week-list', {
      duration: 0.3,
      opacity: 0,
      y: 10,
      ease: 'power1',
      stagger: 0.1,
    }).from(
      '.bar',
      {
        duration: 1,
        x: 0,
        width: 0,
        ease: 'ease-in',
        stagger: 0.1,
      },
      '<0.3'
    );
  }

  return { setWeekListAnimate };
}
