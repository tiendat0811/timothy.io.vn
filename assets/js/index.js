// const firebaseConfig = {
//     apiKey: "AIzaSyAzfOmJjxUzspggxKhbau091QKAg70RlDs",
//     authDomain: "anphat-fsl.firebaseapp.com",
//     projectId: "anphat-fsl",
//     storageBucket: "anphat-fsl.appspot.com",
//     messagingSenderId: "559509999634",
//     appId: "1:559509999634:web:17ac4eba262429e93fc8cb
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

async function verifyFirebase() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user
        })
        .catch((error) => {
            var errorCode = error.code
            var errorMessage = error.message
            console.log(errorCode, errorMessage)

        })
}

async function uploadImage(files, folder) {
    const ref = firebase.storage().ref();
    const file = files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
        contentType: file.type
    };

    try {
        const snapshot = await ref.child(folder).child(name).put(file, metadata);
        const url = await snapshot.ref.getDownloadURL();
        return url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function uploadMultipleImage(files, folder) {
    const ref = firebase.storage().ref();
    const metadata = {
        contentType: files[0].type
    };
    var url = []
    for (let i = 0;i < files.length;i++) {
        const file = files[i];
        const name = +new Date() + "-" + file.name;
        try {
            const snapshot = await ref.child(folder).child(name).put(file, metadata);
            url.push(await snapshot.ref.getDownloadURL())
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    return url
}

async function logout() {
    await firebase.auth().signOut();
    window.location.href = '/auth/logout';
}

function showChat() {
    // Truy cập vào phần tử iframe
    var iframe = document.querySelector('.widget-visible iframe[title="chat widget"]');


    // Kiểm tra xem iframe có tồn tại không
    if (iframe) {
        // Truy cập vào phần tử document của iframe
        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        // Truy cập vào phần tử button trong iframe
        var button = iframeDocument.querySelector('.tawk-button');

        // Kiểm tra xem phần tử button có tồn tại không
        if (button) {
            // Giả lập sự kiện click trên phần tử button
            var clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            button.dispatchEvent(clickEvent);
        } else {
            console.log('Không tìm thấy phần tử button trong iframe.');
        }
    } else {
        console.log('Không tìm thấy phần tử iframe.');
    }

}

function createPagination(paginationElement, currentPage, totalPages, getData) {
    paginationElement.innerHTML = ""

    // Thêm nút trang trước đó
    if (currentPage > 1) {
        const previousPage = currentPage - 1
        const previousButton = createPageButton(previousPage, "&laquo;")
        paginationElement.appendChild(previousButton)
    }

    // Thêm nút trang đầu tiên
    if (currentPage / 10 > 1) {
        const firstButton = createPageButton(1, "1")
        paginationElement.appendChild(firstButton)
    }

    // Thêm dấu chấm lùi nếu cần
    if (currentPage / 10 > 1) {
        const ellipsisStart = createEllipsisStart(currentPage)
        paginationElement.appendChild(ellipsisStart)
    }

    // Thêm nút trang chính
    let rangeStart = parseInt(currentPage / 10)
    if (currentPage % 10 != 0) {
        rangeStart = rangeStart * 10 + 1
    } else {
        rangeStart = rangeStart * 10 - 9
    }
    let rangeEnd = rangeStart + 9
    if (rangeEnd > totalPages) {
        rangeStart = totalPages - 9
        if (rangeStart < 1) {
            rangeStart = 1
        }
        rangeEnd = totalPages
    }
    for (let page = rangeStart;page <= rangeEnd;page++) {
        const pageButton = createPageButton(page, page.toString())

        if (page === currentPage) {
            const link = pageButton.querySelector("a");
            link.classList.add("active");
        }
        paginationElement.appendChild(pageButton)
    }

    // Thêm dấu chấm tiến nếu cần
    if (currentPage < totalPages) {
        const ellipsisEnd = createEllipsisEnd(currentPage)
        paginationElement.appendChild(ellipsisEnd)
    }

    // Thêm nút trang cuối cùng

    if (rangeEnd < totalPages) {
        const lastButton = createPageButton(totalPages, totalPages.toString())
        paginationElement.appendChild(lastButton)
    }

    // Thêm nút trang kế tiếp
    if (currentPage < totalPages) {
        const nextPage = currentPage + 1
        const nextButton = createPageButton(nextPage, "&raquo;")
        paginationElement.appendChild(nextButton)
    }

    function createPageButton(page, label) {
        const pageButton = document.createElement("li")
        pageButton.classList.add("page-item")
        const link = document.createElement("a")
        link.classList.add("page-link")
        link.addEventListener("click", function (event) {
            event.preventDefault()
            currentPage = page
            getData(currentPage)
        })
        link.innerHTML = label
        pageButton.appendChild(link)
        return pageButton
    }

    function createEllipsisStart(currentPage) {
        const ellipsisStart = document.createElement("li")
        ellipsisStart.classList.add("page-item")
        const link = document.createElement("a")
        link.classList.add("page-link")
        link.addEventListener("click", function () {
            // Xử lý sự kiện khi nhấp chuột vào dấu chấm lùi
            const startPage = parseInt(currentPage / 10) - 1
            createPagination(paginationElement, startPage * 10 + 1, totalPages, getData)
        })
        link.textContent = "..."
        ellipsisStart.appendChild(link)
        return ellipsisStart
    }

    function createEllipsisEnd(currentPage) {
        const ellipsisEnd = document.createElement("li")
        const link = document.createElement("a")
        ellipsisEnd.classList.add("page-item")
        link.classList.add("page-link")
        link.addEventListener("click", function () {
            // Xử lý sự kiện khi nhấp chuột vào dấu chấm tiến
            const endPage = parseInt(currentPage / 10) + 1
            createPagination(paginationElement, endPage * 10 + 1, totalPages, getData)
        })
        link.textContent = "..."
        ellipsisEnd.appendChild(link)
        return ellipsisEnd
    }
}

// Tạo giỏ hàng trong localStorage
if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
}





