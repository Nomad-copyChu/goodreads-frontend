module.exports = {
  extends: ['airbnb-typescript', 'prettier'],
  rules: {
    quotes: ['error', 'single'], // 더블 쿼터 사용
    'no-unused-vars': 0, // 사용안한 변수 경고 중복
    'import/no-unresolved': [2, { caseSensitive: false }], // forder name between lowercase and uppercase sensitive false
    '@typescript-eslint/no-unused-vars': 'warn', //사용안한 변수는 경고
    'implicit-arrow-linebreak': 0, // arrow 함수 => 라인 브레이크 가능
    'function-paren-newline': 0, // 새줄에 ) 만 허용
    'comma-dangle': 0, // 매개변수 마지막에 , 없이사용할거임
    'react/no-unescaped-entities': 0, //jsx내에서 '' 허용
    'jsx-a11y/anchor-is-valid': 0, // next js에서는 a에 href없이 사용
    'react/prop-types': 0, //proptype 구문 사용 X
    'spaced-comment': 0, // 주석만 있는 라인 가능
    'object-curly-newline': 0, // 다음은 항상 enter off
    'no-nested-ternary': 0, // 이중 삼항연산자 금지
    'no-param-reassign': 0, // 파라미터 재할당 금지
    'import/prefer-default-export': 0, // export default를 우선적으로 적용한다,
    '@typescript-eslint/indent': 0, // prettier 와 작동이 안되는 버그 있음,
    'no-console': 0, // console 사용가능
    'prefer-const': 0, // let 금지 허용
    'func-names': 0, // generator 문법 사용시 익명함수 금지
    'jsx-a11y/click-events-have-key-events': 0, // onclick 이벤트시 장애 유저를 위해 onKeyUp, onKeyDown, onKeyPress중 하나를 동반해야함.
    'jsx-a11y/interactive-supports-focus': 0, // div button 사용시 tabIndex="0" 등을 요구함.
    'react/jsx-one-expression-per-line': 0, // <br/>뒤에 붙는글자가 prettier로인해 에러가생김
    'react/no-array-index-key': 0, // map 고차 함수 인덱스를 컴포넌트 key로 쓰는 것을 허용
    'no-extra-boolean-cast': 0, // 더블! 사용 허용
    'jsx-a11y/label-has-for': 0, //label 에 htmlfor필수
    'jsx-a11y/label-has-associated-control': 0, ////label 에 htmlfor필수,
    'no-new': 0, // new 선언 허용
    'react/no-danger': 0, // dagerous 허용
    'import/no-cycle': 0, // 파일간 import cycle 허용
    'react/jsx-curly-newline': 0, // bracket을 새로운 라인에
    '@typescript-eslint/camelcase': 0, //camelcase 쓰세요
    '@typescript-eslint/brace-style': 0, //고장난 lint
    'react/jsx-props-no-spreading': 0, // jsx 에서 spread 허용
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  env: {
    browser: true,
  }, //for window
};
