const users = []

let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userWebsite = document.getElementById("website");
let userImage = document.getElementById("img");
let userGender = document.getElementsByName("gender");
let userJava = document.getElementById("java");
let userHtml = document.getElementById("html");
let userCss = document.getElementById("css");


document.getElementById("enroll").addEventListener("click", () => {


    const user = {
        name: userName.value,
        email: userEmail.value,
        website: userWebsite.value,
        img: userImage.value,
        gender: null,
        skills: []
    }

    if (userJava.checked) user.skills.push("Java")
    if (userHtml.checked) user.skills.push("HTML")
    if (userCss.checked) user.skills.push("CSS")
    if (userGender[0].checked) user.gender = "Male"
    if (userGender[1].checked) user.gender = "Female"


    if (validate(user)) {
        users.push(user);
        displayUser(user);
    }



})

document.getElementById("clear").addEventListener("click", () => {
    userName.value = ""
    userEmail.value = ""
    userWebsite.value = ""
    userImage.value = ""
    userGender[0].checked = false
    userGender[1].checked = false
    userJava.checked = false;
    userHtml.checked = false;
    userCss.checked = false;
})

function validate(user) {

    var valid = true

    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!user.name) {
      window.alert("Please enter your name.");
      valid = false;
    } else if (!nameRegex.test(user.name)) {
      window.alert("Please enter a valid name with only letters and spaces.");
      valid = false;
    } else if (user.name.trim().length < 3) {
      window.alert("Please enter a name with at least 3 characters.");
      valid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trustedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'aol.com', 'protonmail.com', 'apple.com', 'microsoft.com', 'amazon.com'];
    if (!user.email) {
      window.alert("Please enter your email address.");
      valid = false;
    } else if (!emailRegex.test(user.email)) {
      window.alert("Please enter a valid email address.");
      valid = false;
    } else {
      const domain = user.email.split('@')[1];
      if (!trustedDomains.includes(domain)) {
        window.alert("Please enter an email address with a trusted domain.");
        valid = false;
      }
    }
    
    if (!user.website || !user.website.match(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,11}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/)) {
        alert("Please try again and Enter a valid website URL in the format of - www.nagarro.com");
        valid = false;
    }
    

    try {
        new URL(user.img)
    } catch (ex) {
        window.alert("Please try again and Enter a valid Image link in the format of-https://tinyurl.com/2dsbkbxa")
        valid = false
    }

    if (user.gender == null) {
        window.alert("Please Select Gender")
        valid = false
    }

    if (user.skills.length == 0) {
        window.alert("Please Select Skills")
        valid = false
    }


    return valid;
}


let rowData = `                       
<tr>
    <td class="col-8">
        <div>--name--</div>
        <div>--gender--</div>
        <div>--email--</div>
        <div><a href="https://--link--" target="black">--link--<a> </div>
        <div>--skills--</div>
    </td>
    <td class="col-4">
        <img class="profile-img" src="--img--" alt="profile photo">
    </td>
</tr>
`


function displayUser(user) {
    let tbody = document.getElementById('tbody')

    let displayData = rowData
        .replace("--name--", user.name)
        .replace("--email--", user.email)
        .replaceAll("--link--", user.website)
        .replace("--gender--", user.gender)
        .replace("--skills--", user.skills.join(", "))
        .replace("--img--", user.img)

    tbody.innerHTML += displayData
}