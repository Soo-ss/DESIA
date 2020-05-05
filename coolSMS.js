const dotenv = require("dotenv");
dotenv.config();

const { config, Group } = require("coolsms-node-sdk");

// 인증을 위해 발급받은 본인의 API Key를 사용합니다.
const apiKey = process.env.COOL_API_KEY;
const apiSecret = process.env.COOL_API_SECRET;
config.init({
  apiKey,
  apiSecret,
});
async function send(params = {}) {
  try {
    const response = await Group.sendSimpleMessage(params);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

const params = {
  text: "[솔라피 테스트] 안녕", // 문자 내용
  type: "SMS", // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
  to: "010123456789101112345648", // 수신번호 (받는이)
  from: process.env.COOL_MY_PHONE, // 발신번호 (보내는이)
};
send(params);
