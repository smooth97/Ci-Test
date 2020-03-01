language: node_js
node_js:
  - "10.14"
before_install:
  - npm install -g yarn
branches:
  only:
    - master
before_deploy: # 배포하기전 하는 작업들
  - rm -rf node_modules # travis가 설치한 node_moduels를 삭제
  - zip -r node-koa-server * # node-koa-server 라는 이름으로 zip 파일 생성
  - mkdir -p deploy # deploy 라는 디렉터리를 만듬
  - mv node-koa-server.zip deploy/node-koa-server.zip # deploy 디렉터리로 node-koa-server.zip 파일을 이동
deploy: # 배포
  - provider: s3 # AWS S3를 의미
    access_key_id: $AWS_ACCESS_KEY # Travis repo settings에 설정된 값
    secret_access_key: $AWS_SECRET_KEY # Travis repo settings에 설정된 값
    bucket: jeffchoi-ci-cd-tutorial # S3에 생성한 버킷
    region: ap-northeast-2
    skip_cleanup: true
    local_dir: deploy # deploy 디렉터리에 있는 파일을 s3로 업로드 하겠다는 의미
    wait-until-deployed: true
    on:
      repo: jeffchoi72/node-koa-server #Github 주소
      branch: master
  - provider: codedeploy # AWS CodeDeploy를 의미
    access_key_id: $AWS_ACCESS_KEY # Travis repo settings에 설정된 값
    secret_access_key: $AWS_SECRET_KEY # Travis repo settings에 설정된 값
    bucket: jeffchoi-ci-cd-tutorial # AWS CodeDeploy가 다운로드 받은 버킷
    key: node-koa-server.zip # 해당 버킷에 저장되어 있는 파일 이름
    bundle_type: zip # 버킷에 저장되어 있는 파일의 확장자
    application: ci-cd-tutorial-code-deploy-service # AWS 배포 애플리케이션
    deployment_group: ci-cd-deploy-grop # AWS 배포 애플리케이션에 만들어져 있는 배포 그룹
    region: ap-northeast-2
    wait-until-deployed: true
    on:
      repo: jeffchoi72/node-koa-server #Github 주소
      branch: master
notifications:
  email:
    recipients:
      - bak0506@ddive.co.kr
