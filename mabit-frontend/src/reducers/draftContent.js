// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣어준다.

const CHANGE_FIELD = 'CONTENT/CHANGE_FIELD';
const INIT_FIELD = 'CONTENT/INIT_FIELD';

export const changeField = (payload) => ({ type: CHANGE_FIELD, payload });
export const initField = () => ({ type: INIT_FIELD });

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
    case INIT_FIELD:
      return {
        content: { key: '', value: '' },
      };
    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나온다
    default:
      return state;
  }
};

export default draftContent;
