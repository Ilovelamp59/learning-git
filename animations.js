(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveal = () => {
    const cards = document.querySelectorAll(".concept");
    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => {
        card.classList.add("is-visible");
        play(card);
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          play(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    );

    cards.forEach((card) => io.observe(card));
  };

  const play = (card) => {
    if (reduceMotion || typeof gsap === "undefined") return;
    const kind = card.dataset.anim;
    const fn = animations[kind];
    if (fn) fn(card);
  };

  const run = (build) => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      repeat: -1,
      repeatDelay: 1.2,
    });
    build(tl);
    return tl;
  };

  const animations = {
    repo(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set(q(".repo-file"), { y: 24, opacity: 0 })
          .set(q(".repo-dot"), { scale: 0, transformOrigin: "50% 50%" })
          .fromTo(q(".repo-folder"), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, transformOrigin: "50% 50%" })
          .fromTo(q(".repo-tab"), { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, "-=0.2")
          .to(q(".repo-file"), { y: 0, opacity: 1, stagger: 0.12, duration: 0.4 }, "-=0.1")
          .to(q(".repo-dot"), { scale: 1, duration: 0.45, ease: "back.out(1.8)" })
          .to(q(".repo-dot"), { scale: 1.08, yoyo: true, repeat: 1, duration: 0.3 });
      });
    },

    clone(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set(q(".clone-packet"), { opacity: 0, y: 0 })
          .fromTo(q(".clone-cloud"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 })
          .fromTo(q(".clone-laptop"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.15")
          .to(q(".clone-packet"), { opacity: 1, duration: 0.15 })
          .to(q(".clone-packet"), { y: 55, duration: 0.7, ease: "power1.inOut" })
          .to(q(".clone-packet"), { opacity: 0, duration: 0.2 })
          .fromTo(q(".clone-arrow, .clone-head"), { opacity: 1 }, { opacity: 0.35, yoyo: true, repeat: 1, duration: 0.3 });
      });
    },

    branch(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set(q(".branch-fork"), { strokeDasharray: 140, strokeDashoffset: 140 })
          .set(q(".branch-side"), { strokeDasharray: 120, strokeDashoffset: 120 })
          .set([q(".branch-tip"), q(".branch-tip2"), q(".branch-label")], {
            opacity: 0,
            scale: 0.6,
            transformOrigin: "50% 50%",
          })
          .to(q(".branch-fork"), { strokeDashoffset: 0, duration: 0.55 })
          .to(q(".branch-side"), { strokeDashoffset: 0, duration: 0.45 }, "-=0.1")
          .to(q(".branch-tip"), { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" })
          .to(q(".branch-tip2"), { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.1")
          .to(q(".branch-label"), { opacity: 1, scale: 1, duration: 0.35 });
      });
    },

    commit(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set(q(".commit-node"), { opacity: 0, scale: 0, transformOrigin: "50% 50%" })
          .set(q(".commit-bubble"), { opacity: 0, y: 12 })
          .to(q(".commit-node"), { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" })
          .to(q(".commit-bubble"), { opacity: 1, y: 0, duration: 0.4 })
          .to(q(".commit-node"), { scale: 1.12, yoyo: true, repeat: 1, duration: 0.28 });
      });
    },

    pushpull(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set([q(".pp-push-dot"), q(".pp-pull-dot")], { x: 0, y: 0 })
          .set([q(".pp-up"), q(".pp-down")], { strokeDashoffset: 0 })
          .to(q(".pp-push-dot"), {
            duration: 1.35,
            ease: "none",
            keyframes: [
              { x: 0, y: 0 },
              { x: 45, y: -35 },
              { x: 90, y: -55 },
            ],
          })
          .to(
            q(".pp-pull-dot"),
            {
              duration: 1.35,
              ease: "none",
              keyframes: [
                { x: 0, y: 0 },
                { x: -40, y: 30 },
                { x: -95, y: 55 },
              ],
            },
            0
          )
          .to(q(".pp-up"), { strokeDashoffset: -28, duration: 1.35, ease: "none" }, 0)
          .to(q(".pp-down"), { strokeDashoffset: -28, duration: 1.35, ease: "none" }, 0);
      });
    },

    diff(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set([q(".diff-del"), q(".diff-add")], { scaleX: 0, opacity: 1, transformOrigin: "left center" })
          .to(q(".diff-del"), { scaleX: 1, duration: 0.45 })
          .to(q(".diff-add"), { scaleX: 1, duration: 0.45 }, "-=0.15")
          .to(q(".diff-del"), { opacity: 0.55, yoyo: true, repeat: 1, duration: 0.35 })
          .to(q(".diff-add"), { opacity: 0.55, yoyo: true, repeat: 1, duration: 0.35 }, "<");
      });
    },

    merge(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set(q(".merge-join"), { strokeDasharray: 160, strokeDashoffset: 160 })
          .set(q(".merge-node"), { opacity: 0, scale: 0, transformOrigin: "50% 50%" })
          .to(q(".merge-join"), { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" })
          .to(q(".merge-node"), { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" })
          .to(q(".merge-node"), { scale: 1.15, yoyo: true, repeat: 1, duration: 0.3 });
      });
    },

    rebase(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set([q(".rebase-c1"), q(".rebase-c2")], { x: 0, y: 0, scale: 1, transformOrigin: "50% 50%" })
          .set(q(".rebase-old, .rebase-old2"), { opacity: 0.35 })
          .to(q(".rebase-old, .rebase-old2"), { opacity: 0.1, duration: 0.3 })
          .to(q(".rebase-c1"), { x: 80, y: 80, duration: 0.65, ease: "power2.inOut" }, 0.2)
          .to(q(".rebase-c2"), { x: 80, y: 80, duration: 0.65, ease: "power2.inOut" }, 0.45)
          .to(q(".rebase-c1, .rebase-c2"), { scale: 1.1, yoyo: true, repeat: 1, duration: 0.25 });
      });
    },

    conflict(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set([q(".cf-left"), q(".cf-right")], { x: 0 })
          .set(q(".cf-vs"), { opacity: 0, scale: 0.5 })
          .set(q(".cf-choice"), { opacity: 0, y: 8 })
          .set(q(".cf-flash"), { opacity: 0 })
          .to(q(".cf-left"), { x: 18, duration: 0.45, ease: "power2.inOut" })
          .to(q(".cf-right"), { x: -18, duration: 0.45, ease: "power2.inOut" }, "<")
          .to(q(".cf-flash"), { opacity: 0.12, duration: 0.2 })
          .to(q(".cf-vs"), { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" })
          .to(q(".cf-flash"), { opacity: 0, duration: 0.3 })
          .to(q(".cf-choice"), { opacity: 1, y: 0, duration: 0.35 })
          .to(q(".cf-left"), { x: 0, duration: 0.4 }, "+=0.35")
          .to(q(".cf-right"), { x: 0, duration: 0.4 }, "<");
      });
    },

    pr(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set(q(".pr-card"), { opacity: 0, y: 16, scale: 0.9, transformOrigin: "50% 50%" })
          .set(q(".pr-check"), { scale: 0, transformOrigin: "50% 50%" })
          .set(q(".pr-arrow"), { opacity: 0.4 })
          .to(q(".pr-card"), { opacity: 1, y: 0, scale: 1, duration: 0.5 })
          .to(q(".pr-check"), { scale: 1, duration: 0.35, ease: "back.out(2)" })
          .to(q(".pr-arrow"), { opacity: 1, duration: 0.4 });
      });
    },

    issue(card) {
      const q = gsap.utils.selector(card);
      run((tl) => {
        tl.set(q(".issue-ticket"), { y: 30, opacity: 0, rotate: -4, transformOrigin: "50% 50%" })
          .set([q(".issue-bug"), q(".issue-feat")], { scale: 0, transformOrigin: "50% 50%" })
          .to(q(".issue-ticket"), { y: 0, opacity: 1, rotate: 0, duration: 0.55, ease: "back.out(1.4)" })
          .to(q(".issue-bug"), { scale: 1, duration: 0.3, ease: "back.out(2)" })
          .to(q(".issue-feat"), { scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.1")
          .to(q(".issue-ticket"), { y: -4, yoyo: true, repeat: 1, duration: 0.35 });
      });
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", reveal);
  } else {
    reveal();
  }
})();
