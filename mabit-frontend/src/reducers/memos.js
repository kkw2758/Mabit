// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣어준다.

const SAVE = 'MEMO/SAVE';
const DELETE = 'MEMO/DELETE';
const INIT = 'MEMO/INIT';
const UPDATE = 'MEMO/UPDATE';

export const saveMemo = (newMemo) => ({ type: SAVE, newMemo });
export const initMemo = (initialState) => ({ type: INIT, initialState });
export const deleteMemo = (id) => ({ type: DELETE, id });
export const updateMemo = (newMemo) => ({
  type: UPDATE,
  newMemo,
});
const initialState = {
  memos: [],
};

const memos = (state = initialState, action) => {
  switch (action.type) {
    case SAVE:
      return { memos: [...state.memos, action.newMemo] };
    case INIT:
      return { memos: action.initialState };
    case DELETE:
      return { memos: state.memos.filter((memo) => memo.id !== action.id) };
    case UPDATE:
      return {
        memos: state.memos.map((memo) =>
          memo.id === action.newMemo.id ? action.newMemo : memo,
        ),
      };
    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나온다
    default:
      return state;
  }
};

export default memos;
