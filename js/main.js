/* ============================================================
   个人作品集 — 共享脚本
   1. 顶部导航：滚动样式 / 移动端菜单
   2. 滚动淡入：IntersectionObserver
   3. 跨页锚点：从其他页面跳转到 #id 时正确定位
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 顶部导航 ---------- */
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav__toggle");
  const navLinks = document.querySelector(".nav__links");

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });

    // 点击菜单项后收起移动菜单
    if (navLinks) {
      navLinks.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          nav.classList.remove("is-open");
        }
      });
    }
  }

  /* ---------- Case Studies 下拉菜单 ---------- */
  const dropdownItems = document.querySelectorAll(".nav__item--dropdown");

  dropdownItems.forEach(function (item) {
    const toggle = item.querySelector(".nav__dropdown-toggle");

    // 桌面端与移动端均支持点击展开（桌面端另支持悬停）
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const isOpen = item.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // 选择项目后收起下拉
    item.querySelectorAll(".nav__dropdown a").forEach(function (link) {
      link.addEventListener("click", function () {
        item.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  });

  // 点击菜单外部时收起
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav__item--dropdown")) {
      dropdownItems.forEach(function (item) {
        item.classList.remove("is-open");
        const toggle = item.querySelector(".nav__dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });

  /* ---------- 滚动淡入 ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // 旧浏览器直接显示
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- 导航高亮（首页区块） ---------- */
  const sections = document.querySelectorAll("section[id]");
  const activeLinks = document.querySelectorAll(".nav__links a[data-section]");

  if (sections.length && activeLinks.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            activeLinks.forEach(function (link) {
              link.classList.toggle(
                "is-active",
                link.getAttribute("data-section") === id
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* ---------- My Journey 卡片展开 / 收起 ---------- */
  var journeyToggles = document.querySelectorAll(".journey__toggle");

  journeyToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("aria-controls");
      var target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;
      var willOpen = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      var label = btn.querySelector(".journey__toggle-text");
      if (label) {
        label.textContent = willOpen ? "Show less" : "Read more";
      }
      target.classList.toggle("is-open", willOpen);
    });
  });
})();
