# DESIA

## 소개 및 후기 사이트입니다.

무조건 예뻐야한다는 생각때문에 디자인 부분에서 시간을 많이 허비했던 것 같습니다.

## 개발환경

- OS: Windows10
- Editor: VSCODE

## 프론트엔드

- JQuery(JS), PUG, SCSS

## 백엔드

- Server: Node.js
- DB: MongoDB

========== 배운거 정리하기 ==========

### MVC 디자인 패턴

M: Model

- Model은 데이터입니다.
- Review.js (후기), User.js (유저) 로 구성 하였습니다.

V: View

- View는 데이터가 어떻게 생겼는지를 뜻합니다. 여기서 템플릿엔진으로는 pug를 사용 하였습니다.
- 20여개의 pug파일과 layouts, mixins, partials 폴더를 생성하여 구조를 분리 하였습니다.

C: Controller

- Controller는 데이터를 보여주는 함수입니다.
- reviewController.js (후기), userController.js (유저) 로 구성 하였습니다.

### Routing

HTTP Request를 생성하기 위해 routes를 작성하였습니다.

routers는 route의 복잡함을 해결하기 위해서 작성하였습니다.

router의 구조는 globalRouter.js, reviewRouter.js, userRouter.js로 분리하였습니다.

### Express

express 프레임워크를 활용한 서버 설계

### MongoDB

JS로 쓸 수 있는 NOSQL DB

### Webpack

webpack == module bundler

우리가 많은 파일들을 가져와서 webpack에게 넘겨주면,

webpack은 완전히 호환되는 static파일들로 변환해서 줍니다.

### 유저 인증

Passport.js를 활용한 local 로그인, 네이버 로그인 기능을 구현했습니다.

회원가입 후, 인증메일을 보내서 유저 인증 여부를 bool 타입으로 지정하여 메일 인증기능을 구현하려고 시도했습니다.

### 후기 쓰기, 수정, 삭제

후기 쓰기, 수정, 삭제기능과

내 프로필 페이지에서 비밀번호 변경과 프로필 사진 변경 기능을 넣었습니다.

그러나 내 프로필 기능은 현재는 쓸모없을 것 같아서 일단은 제외시킬 예정입니다.

### AJAX를 활용한 조회수

AJAX: 비동기 js, xml통신입니다.

Axios 라이브러리를 활용해서 HTTP Request (POST 방식)를 좀 더 깔끔하게 만들었습니다.

### AWS S3에 저장소 업로드

본인의 서버에 유저의 파일을 놔두는 것은 위험하므로 AWS S3에 파일을 업로드 했습니다.

### MongoDB Atlas에 DB호스팅

MongoDB Atlas에 DB호스팅을 하려고 시도했습니다.

### Node.js 호스팅

- 카페24
- Heroku

### 막혔었던 부분

HTTP 통신규격에 맞춰서 데이터를 파싱해야하므로

이미지 엑박부분을 `enctype="multipart/form-data; boundary=<somestring>"` 으로 해결했습니다.

### 문제점

- 이메일 인증기능

  이메일 인증기능은 잘 작동합니다.

  하지만 로그인 하는 순간에 req.user의 이메일 인증여부값을 체크해야하는데

  그 값을 못 얻어와서 일단은 중단했습니다.

- DB 호스팅

  ~~**MongoNetworkError: failed to connect to server**~~

  ~~mongoose를 썼기 때문에 계속 저 오류가 발생한다고 하는데~~

  ~~우선은 서버 호스팅이 실패해서 배포가 불가능하기 때문에 DB도 클라이언트(로컬)에 놔둬놓고 중단했습니다.~~

  2월16일 DB호스팅 성공했습니다.

- 서버 호스팅

  ~~카페24를 이용해서 호스팅을 시도했으나 실패했습니다.~~

  ~~그 후에 Heroku를 사용하여 배포하려고 시도했으나 계속 실패했습니다.~~

  ~~공통된 원인은 **Requires Babel "^7.0.0-0", but was loaded with "6.26.3"** 이것인데~~

  ~~버전이 안맞아서 생기는 문제인 것 같아서 버전도 맞춰보고 재설치도 해보고 별 걸 다 해봤지만 결국 배포는 실패했습니다.~~

  2월14일 일단은 배포 성공했습니다.
