// ==========================================
// MEMORIES ❤️
// JavaScript
// ==========================================

// الرقم السري
const PASSWORD = "67255";

let entered = "";


// ==========================================
// الشاشات
// ==========================================

const screens = {
  welcome: document.getElementById("welcome"),
  lock: document.getElementById("lock"),
  memories: document.getElementById("memories"),
  letter: document.getElementById("letter")
};


// ==========================================
// تغيير الشاشة
// ==========================================

function show(screenName) {

  Object.values(screens).forEach(screen => {
    screen.classList.remove("active");
  });

  screens[screenName].classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


// ==========================================
// عرض نقاط الرقم السري
// ==========================================

function renderPin() {

  const pinDisplay = document.getElementById("pinDisplay");

  pinDisplay.innerHTML = "";

  for (let i = 0; i < 5; i++) {

    const dot = document.createElement("i");

    if (i < entered.length) {
      dot.className = "filled";
    }

    pinDisplay.appendChild(dot);
  }
}


// ==========================================
// الرقم غلط
// ==========================================

function wrongPassword() {

  const error = document.getElementById("error");

  error.textContent = "الرقم مش صح… جربي تاني ❤️";

  const card = document.querySelector(".lock-card");

  // حركة اهتزاز للخزنة
  card.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(-5px)" },
      { transform: "translateX(5px)" },
      { transform: "translateX(0)" }
    ],
    {
      duration: 350
    }
  );

  entered = "";

  renderPin();
}


// ==========================================
// فتح الخزنة
// ==========================================

function unlockMemories() {

  const error = document.getElementById("error");

  error.textContent = "";

  const lockScreen = screens.lock;

  // تأثير فتح الخزنة
  lockScreen.classList.add("unlocking");

  setTimeout(() => {

    lockScreen.classList.remove("unlocking");

    show("memories");

  }, 850);
}


// ==========================================
// الضغط على القلب
// ==========================================

document
  .getElementById("heartButton")
  .addEventListener("click", () => {

    entered = "";

    renderPin();

    show("lock");

  });


// ==========================================
// أزرار لوحة الأرقام
// ==========================================

document
  .querySelectorAll("[data-key]")
  .forEach(button => {

    button.addEventListener("click", () => {

      const key = button.dataset.key;


      // زر المسح
      if (key === "clear") {

        entered = "";

        renderPin();

        document.getElementById("error").textContent = "";

        return;
      }


      // زر الرجوع
      if (key === "back") {

        entered = entered.slice(0, -1);

        renderPin();

        document.getElementById("error").textContent = "";

        return;
      }


      // منع إدخال أكثر من 5 أرقام
      if (entered.length >= 5) {
        return;
      }


      // إضافة الرقم
      entered += key;

      renderPin();


      // بمجرد اكتمال 5 أرقام
      if (entered.length === 5) {

        setTimeout(() => {

          if (entered === PASSWORD) {

            unlockMemories();

          } else {

            wrongPassword();

          }

        }, 160);

      }

    });

  });


// ==========================================
// الدبدوب 🧸
// ==========================================

document
  .getElementById("teddy")
  .addEventListener("click", () => {

    show("letter");

  });


// ==========================================
// قلوب متحركة في الخلفية ❤️
// ==========================================

function createFloatingHeart() {

  const heart = document.createElement("span");

  heart.className = "float-heart";

  // شكل القلب
  heart.textContent =
    Math.random() > 0.5
      ? "♥"
      : "♡";


  // مكان عشوائي
  heart.style.left =
    Math.random() * 100 + "%";


  // حجم عشوائي
  heart.style.fontSize =
    10 + Math.random() * 16 + "px";


  // سرعة عشوائية
  heart.style.animationDuration =
    5 + Math.random() * 6 + "s";


  // إضافة القلب للصفحة
  document
    .querySelector(".hearts")
    .appendChild(heart);


  // حذف القلب بعد انتهاء الحركة
  setTimeout(() => {

    heart.remove();

  }, 12000);

}


// إنشاء قلب كل فترة
setInterval(createFloatingHeart, 900);


// ==========================================
// قلوب إضافية عند فتح الموقع
// ==========================================

for (let i = 0; i < 5; i++) {

  setTimeout(() => {

    createFloatingHeart();

  }, i * 500);

}
