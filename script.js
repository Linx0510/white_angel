$(document).ready(function () {
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const targetId = $(this).attr("href");
    const $targetSection = $(targetId);

    if ($targetSection.length) {
      $("html, body").animate(
        {
          scrollTop: $targetSection.offset().top,
        },
        800,
        "swing"
      );
    }
  });

  const $menuButton = $(".menu-button");
  const $mobileMenuOverlay = $(".mobile-menu-overlay");
  const $mobileMenuClose = $(".mobile-menu-close");
  const $mobileMenuDropdowns = $(".mobile-menu-dropdown");
  const $mobileSubmenuDropdowns = $(".mobile-submenu-dropdown");

  $menuButton.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $mobileMenuOverlay.addClass("active");
    $("body").css("overflow", "hidden"); 
  });

  function closeMobileMenu() {
    $mobileMenuOverlay.removeClass("active");
    $("body").css("overflow", ""); 

    $mobileMenuDropdowns.removeClass("active");
    $mobileSubmenuDropdowns.removeClass("active");
  }

  $mobileMenuClose.on("click", function (e) {
    e.preventDefault();
    closeMobileMenu();
  });

  $mobileMenuOverlay.on("click", function (e) {
    if (e.target === this) {
      closeMobileMenu();
    }
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $mobileMenuOverlay.hasClass("active")) {
      closeMobileMenu();
    }
  });

  $mobileMenuDropdowns.each(function () {
    const $dropdown = $(this);
    const $toggle = $dropdown.find(".mobile-menu-toggle");

    $toggle.on("click", function (e) {
      e.preventDefault();

      $mobileMenuDropdowns.not($dropdown).removeClass("active");

      $mobileSubmenuDropdowns.removeClass("active");

      $dropdown.toggleClass("active");
    });
  });

  $mobileSubmenuDropdowns.each(function () {
    const $dropdown = $(this);
    const $toggle = $dropdown.find(".mobile-submenu-toggle");

    $toggle.on("click", function (e) {
      e.preventDefault();

      const $parent = $dropdown.closest(".mobile-submenu");
      if ($parent.length) {
        $parent.find(".mobile-submenu-dropdown").not($dropdown).removeClass("active");
      }

      $dropdown.toggleClass("active");
    });
  });

  $(".mobile-menu-link, .mobile-sub-link").on("click", function () {
    setTimeout(() => {
      closeMobileMenu();
    }, 100);
  });


  $(".service-item").on("click", function () {
    $(".service-item").removeClass("active");
    $(this).addClass("active");
  });

  function initFadeInAnimations() {
    $("section").each(function () {
      $(this).css({
        opacity: "0",
        transform: "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      });
    });

    $(window).on("scroll", function () {
      $("section").each(function () {
        const $section = $(this);
        const elementTop = $section.offset().top;
        const elementBottom = elementTop + $section.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        if (elementBottom > viewportTop && elementTop < viewportBottom - 50) {
          $section.css({
            opacity: "1",
            transform: "translateY(0)",
          });
        }
      });
    });
  }

  initFadeInAnimations();

  $('[class*="cta-button"], .service-cta').on("click", function (e) {
    e.preventDefault();

    if (
      confirm(
        "Хотите записаться на услугу? Мы перенаправим вас на страницу записи."
      )
    ) {
      alert(
        "Функция записи будет доступна в ближайшее время. Позвоните нам: +7 (962) 559-28-89"
      );
    }
  });

  $('a[href^="tel:"]').on("click", function (e) {
    console.log("Phone call initiated:", $(this).attr("href"));
  });

  $('a[href^="mailto:"]').on("click", function (e) {
    console.log("Email opened:", $(this).attr("href"));
  });

  $(".social-links a, .contact-social a, .footer-social a").on("click", function (e) {
    e.preventDefault();
    console.log("Social media link clicked:", $(this).attr("aria-label"));

    alert(
      "Следите за нами в социальных сетях для получения актуальной информации об акциях и новостях салона!"
    );
  });

  const $header = $(".header");
  let lastScrollY = $(window).scrollTop();

  $header.css("transition", "transform 0.3s ease");

  $(window).on("scroll", function () {
    const currentScrollY = $(window).scrollTop();

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      $header.css("transform", "translateY(-100%)");
    } else {
      $header.css("transform", "translateY(0)");
    }

    lastScrollY = currentScrollY;
  });

  $(".portfolio-gallery-left img, .portfolio-gallery-right img, .portfolio-main").on("click", function () {
    const imgSrc = $(this).attr("src");
    
    const $modal = $('<div>').css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      cursor: "pointer",
    });

    const $modalImg = $('<img>').attr("src", imgSrc).css({
      maxWidth: "90%",
      maxHeight: "90%",
      objectFit: "contain",
      borderRadius: "16px",
    });

    $modal.append($modalImg);
    $("body").append($modal);

    $modal.on("click", function () {
      $(this).remove();
    });

    $(document).on("keydown.modal", function (e) {
      if (e.key === "Escape") {
        $modal.remove();
        $(document).off("keydown.modal");
      }
    });
  });

  function addLoadingState($button) {
    const originalText = $button.text();
    $button.text("Загрузка...").prop("disabled", true);

    setTimeout(() => {
      $button.text(originalText).prop("disabled", false);
    }, 2000);
  }

  function animateCounter($element) {
    const target = $element.text();
    const isNumeric = /^\d+/.test(target);

    if (isNumeric) {
      const finalNumber = parseInt(target.replace(/\D/g, ""));
      const duration = 2000;
      const increment = finalNumber / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
          current = finalNumber;
          clearInterval(timer);
        }

        if (target.includes("000")) {
          $element.text(Math.floor(current / 1000) + " 000");
        } else {
          $element.text(Math.floor(current));
        }
      }, 16);
    }
  }



  $(window).on("scroll", function () {
    $("img").each(function () {
      const $img = $(this);
      if ($img.css("opacity") === "0") {
        const elementTop = $img.offset().top;
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        if (elementTop < viewportBottom) {
          $img.css("opacity", "1");
        }
      }
    });
  });

  let resizeTimeout;
  $(window).on("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      const width = $(window).width();

      if (width <= 768) {
        $(".service-card").css("height", "200px");
      } else {
        $(".service-card").css("height", "236px");
      }
    }, 250);
  });

 
  $(".service-showcase").hide();
  $("#hair").show();

  $(".container-tab").on("click", function () {
    $(".container-tab").removeClass("active");
    $(this).addClass("active");

    var targetId = $(this).data("target");

    $(".service-showcase").hide();
    $("#" + targetId).fadeIn(300);
  });

  $(window).trigger("scroll");

  console.log("Белый Ангел website loaded successfully!");
});

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}



  $(document).ready(function() {
    $.getScript('https://api-maps.yandex.ru/2.1/?apikey=ваш_api_ключ&lang=ru_RU', function() {
      ymaps.ready(initMap);
    });
    
    function initMap() {
      var myMap = new ymaps.Map("map", {
        center: [55.796127, 49.106414], 
        zoom: 16,
        controls: ['zoomControl'] 
      });
      
      var myIcon = new ymaps.Placemark([55.796127, 49.106414], {
        hintContent: 'Г. КАЗАНЬ, УЛ. ЗИНИНА Д. 9/23',
        balloonContent: 'Работаем ежедневно 8:00-21:00<br><b>Телефон:</b> +7 (962) 559-28-89'
      }, {
        preset: 'islands#redDotIconWithCaption',
        iconColor: '#2C2C2C'
      });
      
      myMap.geoObjects.add(myIcon);
      
      myMap.behaviors.disable(['scrollZoom', 'drag']);
      
      $(window).on('resize', function() {
        myMap.container.fitToViewport();
      });
      
      $('.address h3').on('click', function() {
        myIcon.balloon.open();
      });
    }
  });