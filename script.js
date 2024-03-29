//_________________________________________________________________
// ********************navigation show / hide
const menu = document.querySelector(".header .menu");
let navi = document.querySelector(".nav");
navi.style.transition = "all 2s";

menu.addEventListener("click", () => {
  if (navi.classList.contains("show")) {
    navi.classList.remove("show");
    navi.classList.add("hide");
  } else {
    navi.classList.remove("hide");
    navi.classList.add("show");
  }
});

// ___________________________________________________________________
// ********************smooth scrolling

const linkz = document.querySelectorAll('a[href*="#"]');
let chkbox = document.querySelector(".checkbox");
// let navig = document.querySelector(".nav");

linkz.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    let classRemover = document.querySelector(".active");
    if (classRemover != null) {
      classRemover.classList.remove("active");
    }
    el.classList.add("active");

    // console.log("hash--".el.hash);

    //after click we move to target location
    let targetLocation = document.querySelector(el.hash);
    console.log("targetLocation--", targetLocation);

    //distance between top of the page and the clicked element check below line`
    let distanceOfTargetElementFromTop = targetLocation.offsetTop;
    let currentPageLoc = document.documentElement.scrollTop;
    console.log(distanceOfTargetElementFromTop);

    myMove(currentPageLoc, distanceOfTargetElementFromTop);

    if (navi.classList.contains("show")) {
      navi.classList.remove("show");
      navi.classList.add("hide");
      // chkbox.style.display = "block";
    }
    if (chkbox.checked == true) {
      chkbox.checked = false;
    }
  });
});

const myMove = (currentPageLoc, distanceOfTargetElementFromTop) => {
  const speed = 15;
  const pos = distanceOfTargetElementFromTop > currentPageLoc ? 1 : -1;
  let move = Math.floor(
    ((distanceOfTargetElementFromTop - currentPageLoc) * pos) / speed
  );

  const adder = pos * speed;

  let frame = () => {
    if (move < 0) {
      clearInterval(framez);
    } else {
      move--;
      currentPageLoc = currentPageLoc + adder;
      document.documentElement.scrollTop = currentPageLoc;
      // console.log(move);
    }
  };

  let framez = setInterval(frame, 1);
};

// // ___________________________________________________________________
// *************************spy scrolling

document.addEventListener("scroll", () => {
  spySCroll();
});

const spySCroll = () => {
  let currentPageLocation = 0;
  currentPageLocation = document.documentElement.scrollTop;
  removeClass();
  if (currentPageLocation < 520) {
    let _home = document.querySelector(".nav-home");
    _home.classList.add("active");
  }
  if (currentPageLocation >= 520 && currentPageLocation <= 1240) {
    let _skills = document.querySelector(".nav-skills");
    _skills.classList.add("active");
  }
  if (currentPageLocation >= 1240 && currentPageLocation <= 2330) {
    let _portfolio = document.querySelector(".nav-portfolio");
    _portfolio.classList.add("active");
  }
  if (currentPageLocation >= 2330 && currentPageLocation <= 2950) {
    let _about = document.querySelector(".nav-about");
    _about.classList.add("active");
  }
  if (currentPageLocation > 2950) {
    let _contact = document.querySelector(".nav-contact");
    _contact.classList.add("active");
  }
};

const removeClass = () => {
  const link_rem = document.querySelectorAll('a[href*="#"]');
  link_rem.forEach((element) => {
    element.classList.remove("active");
  });
};

// // ___________________________________________________________________
// *************************form validation

const formMain = document.querySelector(".my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");

formMain.addEventListener("submit", (e) => {
  validateForm();
  if (isFormValid()) {
    e.preventDefault();
    var data = new FormData(formMain);
    ajax(formMain.method, formMain.action, data, success, error);
  } else {
    e.preventDefault();
  }
});

const isFormValid = () => {
  const form = document.querySelector(".my-form");
  const inputContainers = form.querySelectorAll(".input-ctrl");
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("error")) {
      result = false;
    }
  });
  return result;
};

nameInput.addEventListener("focusout", (e) => {
  if (nameInput.value.trim() == "") {
    setError(nameInput, "Name cannot be empty.");
  } else if (
    nameInput.value.trim().length < 3 ||
    nameInput.value.trim().length > 15
  ) {
    setError(nameInput, "Name cannot be too small or too big.");
  } else {
    setSuccess(nameInput);
  }
});

emailInput.addEventListener("focusout", (e) => {
  if (emailInput.value.trim() == "") {
    setError(emailInput, "Email cannot be empty.");
  } else if (isEmailValid(emailInput.value)) {
    setSuccess(emailInput);
  } else {
    setError(emailInput, "Provide a valid email");
  }
});

subjectInput.addEventListener("focusout", (e) => {
  if (subjectInput.value.trim() == "") {
    setError(subjectInput, "Subject cannot be empty.");
  } else {
    setSuccess(subjectInput);
  }
});

messageInput.addEventListener("focusout", (e) => {
  if (messageInput.value.trim() == "") {
    setError(messageInput, "Message cannot be empty.");
  } else {
    setSuccess(messageInput);
  }
});

const validateForm = () => {
  //name
  if (nameInput.value.trim() == "") {
    setError(nameInput, "Name cannot be empty.");
  } else if (
    nameInput.value.trim().length < 3 ||
    nameInput.value.trim().length > 15
  ) {
    setError(nameInput, "Name cannot be too small or too big.");
  } else {
    setSuccess(nameInput);
  }

  //email
  if (emailInput.value.trim() == "") {
    setError(emailInput, "Email cannot be empty.");
  } else if (isEmailValid(emailInput.value)) {
    setSuccess(emailInput);
  } else {
    setError(emailInput, "Provide a valid email");
  }

  //subject
  if (subjectInput.value.trim() == "") {
    setError(subjectInput, "Subject cannot be empty.");
  } else {
    setSuccess(subjectInput);
  }
  //message
  if (messageInput.value.trim() == "") {
    setError(messageInput, "Message cannot be empty.");
  } else {
    setSuccess(messageInput);
  }
};

const setError = (element, errMsg) => {
  const parentElement = element.parentElement;
  parentElement.classList.add("error");
  parentElement.classList.remove("success");
  const paragraph = parentElement.querySelector(".err-msg");
  paragraph.textContent = errMsg;
};

const setSuccess = (element) => {
  const parentElement = element.parentElement;
  parentElement.classList.add("success");
  parentElement.classList.remove("error");
};

const isEmailValid = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      // success(xhr.response, xhr.responseType);

      alert(
        "your message has been recieved please give us 1 to 2 business days to reply your query"
      );
    } else {
      // error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

function success() {
  formMain.reset();
  status.classList.add("success");
  status.innerHTML = "Thanks!";
}

function error() {
  status.classList.add("error");
  status.innerHTML = "Oops! There was a problem.";
}
