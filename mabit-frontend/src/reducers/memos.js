// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣어준다.

const SAVE = 'MEMO/SAVE';
export const saveMemo = (newMemo) => ({ type: SAVE, newMemo });

const initialState = {
  memos: [],
};

const memos = (state = initialState, action) => {
  switch (action.type) {
    case SAVE:
      return { memos: [...state.memos, action.newMemo] };
    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나온다
    default:
      return state;
  }
};

export default memos;
