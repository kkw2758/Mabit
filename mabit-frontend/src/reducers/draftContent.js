// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣어준다.

const CHANGE_FIELD = 'CONTENT/CHANGE_FIELD';
export const changeField = (payload) => ({ type: CHANGE_FIELD, payload });

const initialState = {
  content: { key: '', value: '' },
};

const draftContent = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...state,
        content: { key: action.payload.key, value: action.payload.value },
      };
    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나온다
    default:
      return state;
  }
};

export default draftContent;
