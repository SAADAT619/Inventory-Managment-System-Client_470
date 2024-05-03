// save user to database
const saveUserDB = (data) => {
  const userData = {
    username: data.name,
    email: data.email,
    role: "customer",
  };

  fetch("http://localhost:5000/api/v1/user", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default saveUserDB;
