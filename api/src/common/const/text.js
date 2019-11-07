/* eslint-disable max-len */
export const

cant_find_user = email => usernameOrEmail => (
  `I couldn't find any users with ${email ? `email` : `username`} ${usernameOrEmail}. 🙁`
),

incorrect_password = `That password doesn't seem to be correct. 🤨`,

email_taken = email => `We've met already! 😊 Go  ahead and log in with email ${email}.`,

username_taken = username => `Username ${username} is already taken. 😕`,

no_topic_or_prerequisite = `I need at least one topic or prerequisite..`,

no_local_account = `Looks like you've previously signed up like Github or Facebook, but not with password. Go ahead and sign up to create a password 🙂`,

wrong_username = `It seems we've already met, but you used a different username. Please use the same one now so I can keep track. 😉`,

authorized_endpoint = `Unfortunately this endpoint is currently only for admins!`