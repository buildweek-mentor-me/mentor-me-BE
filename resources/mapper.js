module.exports = {
  userToBody,
  questionToBody
};

// Use these if you need true/false in db
// function intToBoolean(int) {
//   return int === 1 ? true : false;
// }

// function booleanToint(bool) {
//   return bool === true ? 1 : 0;
// }

function userToBody(user) {
  const result = {
    ...user
  };

  if (user.questions) {
    result.questions = user.questions.map(question => ({
      ...question
    }));
  }

  return result;
}

function questionToBody(action) {
  return {
    ...action
  };
}
