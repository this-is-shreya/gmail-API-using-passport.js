const { generateConfig } = require("../utils/config");
const { google } = require("googleapis");
const fetch = require("node-fetch");
const { Base64 } = require("js-base64");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports.getUser = async (req, res) => {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.user.email}/profile`;
    const { token } = await oAuth2Client.getAccessToken();

    let config = generateConfig("GET", token);

    fetch(url, config).then(async (body) => {
      const data = await body.json();
      res.send(data);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, " + error,
    });
  }
};
module.exports.readEmails = async (req, res) => {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.user.email}/threads?labelIds=UNREAD`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig("GET", token);

    fetch(url, config)
      .then(async (body) => {
        let val = await body.json();

        if (val.threads == undefined) {
          return res.send("no messages");
        }
        for (let i = 0; i < val.threads.length; i++) {
          const url2 = `https://gmail.googleapis.com/gmail/v1/users/${req.user.email}/messages/${val.threads[i].id}`;

          fetch(url2, config)
            .then(async (response) => {
              val = await response.json();
              let arr = {};
              arr.Subject = "";
              arr.Thread = val.id;

              if (!val.labelIds.includes("Label_6980808070016247919")) {
                for (let i = 0; i < val.payload.headers.length; i++) {
                  if (val.payload.headers[i].name == "Message-ID") {
                    arr.Message = val.payload.headers[i].value;
                  }
                  if (val.payload.headers[i].name == "Subject") {
                    arr.Subject = val.payload.headers[i].value;
                  }
                  if (val.payload.headers[i].name == "From") {
                    arr.From = val.payload.headers[i].value;
                  }
                }

                sendEmail(
                  arr.Subject,
                  arr.Message,
                  arr.From,
                  arr.Thread,
                  req,
                  res
                ).then((data) => {
                  console.log(data);
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }

        showSentEmails(req, res);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, " + error,
    });
  }
};

const sendEmail = async (subject, messageId, receiver, threadId, req, res) => {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.user.email}/messages/send`;

    const { token } = await oAuth2Client.getAccessToken();
    let config = generateConfig("POST", token);

    let encodedResponse = Base64.encode(
      'Content-Type: text/plain; charset="UTF-8"\n' +
        "MIME-Version: 1.0\n" +
        "Content-Transfer-Encoding: 7bit\n" +
        "Subject: " +
        subject +
        "\n" +
        "From: " +
        req.user.email +
        "\n" +
        "To: " +
        receiver +
        "\n" +
        "In-Reply-To: " +
        messageId +
        "\n" +
        "References: " +
        messageId +
        "\n\n" +
        "I'm on vacation"
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    config.body = JSON.stringify({
      id: threadId,
      threadId: threadId,

      raw: encodedResponse,
    });

    fetch(url, config)
      .then(async (body) => {
        const data = await body.json();
        let config2 = generateConfig("POST", token);

        config2.body = JSON.stringify({
          addLabelIds: ["Label_6980808070016247919"],
          removeLabelIds: ["UNREAD", "CATEGORY_PERSONAL", "INBOX", "IMPORTANT"],
        });

        const url3 = `https://gmail.googleapis.com/gmail/v1/users/${req.user.email}/threads/${threadId}/modify`;

        fetch(url3, config2).then(async (response) => {
          const data = await response.json();
          console.log(data);
        });

        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, " + error,
    });
  }
};

const showSentEmails = async (req, res) => {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.user.email}/threads?lableIds=['Label_6980808070016247919']`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig("GET", token);

    fetch(url, config).then(async (body) => {
      let val = await body.json();

      let array = new Array();
      var fetches = [];
      if (val.threads == undefined) {
        return res.send("no messages to show");
      }
      for (let i = 0; i < val.threads.length; i++) {
        const url2 = `https://gmail.googleapis.com/gmail/v1/users/${req.user.email}/messages/${val.threads[i].id}`;

        fetches.push(
          fetch(url2, config)
            .then(async (response) => {
              const data = await response.json();
              return { snippet: data.snippet, id: data.id };
            })

            .catch((err) => {
              return console.log(err);
            })
        );
      }

      Promise.all(fetches).then(() => {
        const a = new Promise((resolve, reject) => {
          fetches.forEach(async (item) => {
            await item.then((data) => {
              array.push(data);
            });
          });
          resolve(array);
        });
        a.then((data) => {
          res.render("dashboard", { arr: data });
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error," + error,
    });
  }
};
