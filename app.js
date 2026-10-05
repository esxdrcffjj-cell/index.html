/* =========================
   بيانات تجريبية
========================= */

let designs = [

    {
        name: "تصميم احترافي",
        image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80",
        likes: 0
    },

    {
        name: "تصميم إبداعي",
        image:
        "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=900&q=80",
        likes: 0
    }

];


/* =========================
   حسابات تجريبية
========================= */

let users =
    JSON.parse(
        localStorage.getItem("users") || "[]"
    );


let currentUser =
    localStorage.getItem("currentUser");


/* =========================
   تسجيل الدخول
========================= */

function login() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const user =
        users.find(
            u =>
            u.email === email &&
            u.password === password
        );


    if (!user) {

        document.getElementById(
            "loginMessage"
        ).textContent =
        "الإيميل أو كلمة المرور غير صحيحة";

        return;
    }


    localStorage.setItem(
        "currentUser",
        email
    );

    currentUser = email;

    openSite();
}


/* =========================
   إنشاء حساب
========================= */

function register() {

    const email =
        document.getElementById(
            "registerEmail"
        ).value;

    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    if (!email || !password) {

        document.getElementById(
            "registerMessage"
        ).textContent =
        "اكتب الإيميل وكلمة المرور";

        return;
    }


    if (users.some(u => u.email === email)) {

        document.getElementById(
            "registerMessage"
        ).textContent =
        "الحساب موجود بالفعل";

        return;
    }


    users.push({
        email,
        password
    });


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    showLogin();

    alert("تم إنشاء الحساب بنجاح");
}


/* =========================
   Google
========================= */

function loginGoogle() {

    alert(
        "سنربط تسجيل Google الحقيقي بـ Firebase في الخطوة التالية."
    );

}


/* =========================
   فتح الموقع
========================= */

function openSite() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("registerPage")
        .classList.add("hidden");

    document
        .getElementById("website")
        .classList.remove("hidden");


    document.getElementById(
        "userEmail"
    ).textContent =
        currentUser;


    document.getElementById(
        "accountEmail"
    ).textContent =
        currentUser;


    renderDesigns(designs);

}


/* =========================
   تسجيل الخروج
========================= */

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    currentUser = null;

    document
        .getElementById("website")
        .classList.add("hidden");

    showLogin();

}


/* =========================
   الصفحات
========================= */

function showLogin() {

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

    document
        .getElementById("registerPage")
        .classList.add("hidden");

}


function showRegister() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("registerPage")
        .classList.remove("hidden");

}


/* =========================
   الأقسام
========================= */

function showSection(id) {

    const sections =
        document.querySelectorAll(
            ".section"
        );


    sections.forEach(
        section =>
        section.classList.add("hidden")
    );


    document
        .getElementById(id)
        .classList.remove("hidden");

}


/* =========================
   إضافة تصميم
========================= */

function addDesign() {

    const name =
        prompt(
            "اكتب اسم التصميم:"
        );


    if (!name) return;


    const image =
        prompt(
            "ضع رابط صورة التصميم:"
        );


    if (!image) return;


    designs.unshift({

        name: name,

        image: image,

        likes: 0

    });


    renderDesigns(designs);

}


/* =========================
   عرض التصاميم
========================= */

function renderDesigns(list) {

    const container =
        document.getElementById(
            "designGrid"
        );


    container.innerHTML = "";


    list.forEach(
        (design,index) => {

            container.innerHTML += `

                <div class="card">

                    <img
                        src="${design.image}"
                        alt="${design.name}">

                    <div class="card-content">

                        <h3>
                            ${design.name}
                        </h3>

                        <p>
                            ❤️
                            ${design.likes}
                        </p>

                        <button
                            onclick="likeDesign(${index})">

                            ❤️ إعجاب

                        </button>

                    </div>

                </div>

            `;

        }
    );


    document.getElementById(
        "designCount"
    ).textContent =
        designs.length;

}


/* =========================
   إعجاب
========================= */

function likeDesign(index) {

    designs[index].likes++;

    renderDesigns(designs);

}


/* =========================
   البحث
========================= */

function searchDesigns() {

    const value =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    const result =
        designs.filter(
            design =>
            design.name
            .toLowerCase()
            .includes(value)
        );


    renderDesigns(result);

}


/* =========================
   رفع صورة مؤقتًا
========================= */

function previewPhoto(event) {

    const file =
        event.target.files[0];

    if (!file) return;


    const url =
        URL.createObjectURL(file);


    document.getElementById(
        "photoPreview"
    ).innerHTML = `

        <div class="card">

            <img src="${url}">

            <div class="card-content">

                <h3>
                    ${file.name}
                </h3>

            </div>

        </div>

    `;

}


/* =========================
   رفع فيديو مؤقتًا
========================= */

function previewVideo(event) {

    const file =
        event.target.files[0];

    if (!file) return;


    const url =
        URL.createObjectURL(file);


    document.getElementById(
        "videoPreview"
    ).innerHTML = `

        <video
            controls
            src="${url}">
        </video>

    `;

}


/* =========================
   الوضع الليلي
========================= */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark"
    );

}


/* =========================
   تشغيل
========================= */

if (currentUser) {

    openSite();

} else {

    showLogin();

}