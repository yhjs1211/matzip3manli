const nodemailer = require('nodemailer');
const config = require('./mail.json');

const mailsender = {
  sendKakaoMail: function (toReceiver) {
    // transporter.verify((err,success)=>{
    //     if(err){
    //         console.error(err);
    //     }else{
    //         console.log("server ready!");
    //     }
    // })
    const transporter = nodemailer.createTransport({
      service: 'kakao',
      port: 465, // secure false 일경우 587 포트
      host: 'smtp.kakao.com',
      secure: true,
      requireTLS: true,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const verifyNum = Math.ceil(Math.random() * 1000000);

    transporter.sendMail({
      from: config.user,
      to: toReceiver,
      subject: '맛집 3만리 가입 인증 메일',
      text: `
            안녕하세요 !
            밋집 3만리를 찾아주신 고객님께 감사의 말씀 올립니다.
            가입을 위한 인증번호 👉 ${verifyNum} 을 입력해주세요.
            즐거운 맛집 탐방 시간 되세요!`,
    });

    return verifyNum;
  },
  sendGmail: function (toReceiver) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const verifyNum = Math.ceil(Math.random() * 1000000);

    transporter.sendMail({
      from: config.user,
      to: toReceiver,
      subject: '맛집 3만리 가입 인증 메일',
      text: `
            안녕하세요 !
            밋집 3만리를 찾아주신 고객님께 감사의 말씀 올립니다.
            가입을 위한 인증번호 👉 ${verifyNum} 을 입력해주세요.
            즐거운 맛집 탐방 시간 되세요!`,
    });

    return verifyNum;
  },
};

module.exports = mailsender;
