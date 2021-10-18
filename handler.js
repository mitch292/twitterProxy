const twitter = require('twitter-api-client');
const twitterClient = new twitter.TwitterClient({
  apiKey: process.env.TWITTER_CONSUMER_API_KEY,
	apiSecret: process.env.TWITTER_CONSUMER_API_SECRET,
	accessToken: process.env.TWITTER_ACCESS_TOKEN,
	accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports.tweet = async (event, context) => {

  if (event.headers["Authorization"] !== process.env.API_TOKEN) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'Not Authorized!',
      })
    }
  }

  if (event.body) {
    try {
      await twitterClient.tweets.statusesUpdate(JSON.parse(event.body));
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: error.message
        })
      }
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'ok',
      input: event,
    }),
  };
};
